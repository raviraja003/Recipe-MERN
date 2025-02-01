const jwt = require("jsonwebtoken");

const auth = async(req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res
                .status(401)
                .json({ message: "No token, authorization denied" });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add user from payload
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "Token is not valid" });
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = auth;