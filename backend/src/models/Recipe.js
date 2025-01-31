const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dietaryType: { type: String, enum: ["veg", "non-veg"], required: true },
    ingredients: [{ type: String, required: true }],
    steps: [{ type: String, required: true }],
    culturalSignificance: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recipe", recipeSchema);