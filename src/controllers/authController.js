const User = require("../models/User");

// User registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

// User login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: "Invalid login credentials" });
    }
};

// User logout
const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            (token) => token.token !== req.token
        );
        await req.user.save();
        res.send({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};
