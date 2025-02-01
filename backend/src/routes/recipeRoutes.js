const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    getRecipes,
    createRecipe,
    getRecipeById,
    generateRecipe,
} = require("../controllers/recipeController");

router.get("/", auth, getRecipes);
router.post("/", auth, createRecipe);
router.get("/:id", auth, getRecipeById);
router.post("/generate", auth, generateRecipe);

module.exports = router;