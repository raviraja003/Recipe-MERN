const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    signup,
    login,
    googleAuthSuccess,
    googleAuthFailure,
    logout,
    getMe,
} = require("../controllers/authController");
// const auth = require("../middleware/auth");

// Regular auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// router.get("/me", auth, getMe);

// Google OAuth routes
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "consent",
        accessType: "offline",
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/api/auth/google/failure",
        session: false,
    }),
    googleAuthSuccess
);

router.get("/google/failure", googleAuthFailure);

module.exports = router;