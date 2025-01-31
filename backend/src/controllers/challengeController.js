const Challenge = require("../models/Challenge");
const Recipe = require("../models/Recipe");

// Get current active challenge
exports.getCurrentChallenge = async(req, res) => {
    try {
        const challenge = await Challenge.findOne({ isActive: true }).populate(
            "submissions.userId",
            "name"
        );

        if (!challenge) {
            return res.status(404).json({ message: "No active challenge found" });
        }

        res.json(challenge);
    } catch (error) {
        console.error("Error fetching current challenge:", error);
        res.status(500).json({ message: "Error fetching current challenge" });
    }
};

// Get user's challenge history
exports.getChallengeHistory = async(req, res) => {
    try {
        const challenges = await Challenge.find({
                "submissions.userId": req.user.userId,
            })
            .sort({ endDate: -1 })
            .populate("submissions.userId", "name");

        res.json(challenges);
    } catch (error) {
        console.error("Error fetching challenge history:", error);
        res.status(500).json({ message: "Error fetching challenge history" });
    }
};

// Submit to challenge
exports.submitChallenge = async(req, res) => {
    try {
        const { title, file, description } = req.body;
        const challenge = await Challenge.findOne({ isActive: true });

        if (!challenge) {
            return res.status(404).json({ message: "No active challenge found" });
        }

        challenge.submissions.push({
            userId: req.user.userId,
            title,
            file,
            description,
        });

        await challenge.save();
        res.status(201).json(challenge);
    } catch (error) {
        console.error("Error submitting to challenge:", error);
        res.status(500).json({ message: "Error submitting to challenge" });
    }
};

// Get challenge gallery
exports.getGallery = async(req, res) => {
    try {
        const challenge = await Challenge.findOne({ isActive: true })
            .populate("submissions.userId", "name")
            .populate("submissions.likes", "name")
            .populate("submissions.comments.userId", "name");

        if (!challenge) {
            return res.status(404).json({ message: "No active challenge found" });
        }

        res.json(challenge.submissions);
    } catch (error) {
        console.error("Error fetching gallery:", error);
        res.status(500).json({ message: "Error fetching gallery" });
    }
};

// Like a submission
exports.likeSubmission = async(req, res) => {
    try {
        const challenge = await Challenge.findOne({ isActive: true });
        if (!challenge) {
            return res.status(404).json({ message: "No active challenge found" });
        }

        const submission = challenge.submissions.id(req.params.submissionId);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        const likeIndex = submission.likes.indexOf(req.user.userId);
        if (likeIndex > -1) {
            submission.likes.splice(likeIndex, 1); // Unlike
        } else {
            submission.likes.push(req.user.userId); // Like
        }

        await challenge.save();
        res.json(submission);
    } catch (error) {
        console.error("Error liking submission:", error);
        res.status(500).json({ message: "Error liking submission" });
    }
};

// Comment on a submission
exports.commentOnSubmission = async(req, res) => {
    try {
        const { text } = req.body;
        const challenge = await Challenge.findOne({ isActive: true });

        if (!challenge) {
            return res.status(404).json({ message: "No active challenge found" });
        }

        const submission = challenge.submissions.id(req.params.submissionId);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        submission.comments.push({
            userId: req.user.userId,
            text,
        });

        await challenge.save();
        res.status(201).json(submission);
    } catch (error) {
        console.error("Error commenting on submission:", error);
        res.status(500).json({ message: "Error commenting on submission" });
    }
};

// Start a new challenge
exports.startChallenge = async(req, res) => {
    try {
        const { recipeId } = req.query;

        // Find the recipe
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Create a new challenge
        const challenge = new Challenge({
            title: `Weekly Challenge: ${recipe.title}`,
            description: `Create your version of ${recipe.title}`,
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            recipe: recipeId,
            isActive: true,
            participants: [req.user.userId], // Add current user as first participant
        });

        await challenge.save();

        // Return the challenge with populated recipe data
        const populatedChallenge = await Challenge.findById(challenge._id)
            .populate("recipe")
            .populate("participants", "name");

        res.status(201).json(populatedChallenge);
    } catch (error) {
        console.error("Error starting challenge:", error);
        res.status(500).json({ message: "Error starting challenge" });
    }
};

// Get active challenge
exports.getActiveChallenge = async(req, res) => {
    try {
        const activeChallenge = await Challenge.findOne({ isActive: true })
            .populate("recipe")
            .populate("participants", "name");

        if (!activeChallenge) {
            return res.status(404).json({ message: "No active challenge found" });
        }

        res.json(activeChallenge);
    } catch (error) {
        console.error("Error fetching active challenge:", error);
        res.status(500).json({ message: "Error fetching active challenge" });
    }
};

// Add this function to get all submissions
exports.getAllSubmissions = async(req, res) => {
    try {
        const challenges = await Challenge.find({
                "submissions.0": { $exists: true }, // Only get challenges with submissions
            })
            .populate("submissions.userId", "name")
            .populate("recipe")
            .sort({ "submissions.submittedAt": -1 });

        // Flatten and format submissions
        const submissions = challenges.flatMap((challenge) =>
            challenge.submissions.map((submission) => ({
                ...submission.toObject(),
                challengeTitle: challenge.title,
                recipeName: challenge.recipe && challenge.title,
                submittedAt: submission.submittedAt,
            }))
        );

        res.json(submissions);
    } catch (error) {
        console.error("Error fetching submissions:", error);
        res.status(500).json({ message: "Error fetching submissions" });
    }
};