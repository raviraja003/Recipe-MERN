const Recipe = require("../models/Recipe");
// const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name");

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, dietaryType, ingredients, steps, culturalSignificance } =
      req.body;

    const recipe = new Recipe({
      title,
      dietaryType,
      ingredients,
      steps,
      culturalSignificance,
      createdBy: req.user.userId,
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Error creating recipe" });
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

// Add this function to generate recipe using Gemini AI
exports.generateRecipe = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Updated prompt to be more explicit about format
    const prompt = `Generate a traditional recipe and return it in JSON format. Do not include any markdown syntax, code blocks, or additional text. Only return the JSON object in this exact format:
{
  "title": "Recipe name in French",
  "dietaryType": "veg or non-veg",
  "ingredients": ["list of ingredients with quantities in French"],
  "steps": ["detailed cooking steps in French"],
  "culturalSignificance": "brief cultural context and history in French"
}`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean the response text
    text = text.replace(/```json\n?|\n?```/g, ""); // Remove markdown code blocks
    text = text.trim(); // Remove extra whitespace

    // console.log("Cleaned text ==>", text);

    try {
      // Parse the recipe from response
      const recipe = JSON.parse(text);

      // Validate required fields
      if (!recipe.title || !recipe.ingredients || !recipe.steps) {
        throw new Error("Missing required recipe fields");
      }

      // Save the generated recipe to database
      const newRecipe = new Recipe({
        title: recipe.title,
        dietaryType: recipe.dietaryType || "both",
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        culturalSignificance: recipe.culturalSignificance || "",
      });

      await newRecipe.save();
      res.json(newRecipe);
    } catch (parseError) {
      console.error("Error parsing recipe:", parseError);
      res.status(500).json({
        message: "Error parsing generated recipe",
        error: parseError.message,
        rawText: text,
      });
    }
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({
      message: "Error generating recipe",
      error: error.message,
    });
  }
};
