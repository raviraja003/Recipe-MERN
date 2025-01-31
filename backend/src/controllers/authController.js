const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
exports.signup = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide all required fields" });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save user
        await user.save();

        // Create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        res.status(201).json({
            Token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Login user
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide email and password" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if user is registered through Google
        if (user.googleId) {
            return res.status(400).json({ message: "Please login with Google" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        res.json({
            Token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Google Auth Success
exports.googleAuthSuccess = async(req, res) => {
    try {
        const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({
            token,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                picture: req.user.picture,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Google Auth Failure
exports.googleAuthFailure = (req, res) => {
    res.status(401).json({ message: "Google authentication failed" });
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};

exports.getMe = async(req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};