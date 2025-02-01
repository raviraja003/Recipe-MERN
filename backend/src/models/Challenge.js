const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
    title: { type: String },
    file: { type: String },
    description: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    submissions: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: { type: String },
        description: String,
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            text: String,
            createdAt: { type: Date, default: Date.now },
        }, ],
        submittedAt: { type: Date, default: Date.now },
    }, ],
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Challenge", challengeSchema);