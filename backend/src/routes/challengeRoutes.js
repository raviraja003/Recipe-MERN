const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    getCurrentChallenge,
    getChallengeHistory,
    submitChallenge,
    getGallery,
    likeSubmission,
    commentOnSubmission,
    startChallenge,
    getActiveChallenge,
    getAllSubmissions,
} = require("../controllers/challengeController");

router.get("/current", auth, getCurrentChallenge);
router.get("/history", auth, getChallengeHistory);
router.post("/submit", auth, submitChallenge);
router.get("/gallery", auth, getGallery);
router.post("/like/:submissionId", auth, likeSubmission);
router.post("/comment/:submissionId", auth, commentOnSubmission);
router.post("/start", auth, startChallenge);
router.get("/active", auth, getActiveChallenge);
router.get("/submissions", getAllSubmissions);

module.exports = router;