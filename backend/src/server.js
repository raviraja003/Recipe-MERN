const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const passport = require("./config/passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load env vars before importing other modules that might use them
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
app.use(
    cors({
        origin: "http://kisan251.com:8800", // Your frontend URL
        // origin: "http://localhost:5173", // Your frontend URL
        // origin: "https://recipe-mern-frontend-three.vercel.app", // Your frontend Live URL
        methods: ["GET", "HEAD"],
        credentials: true,
    })
);

app.use(cookieParser());

// Body parser
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/recipes", require("./routes/recipeRoutes"));
app.use("/api/challenges", require("./routes/challengeRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});