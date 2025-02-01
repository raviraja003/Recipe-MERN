import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../store/authStore";

export function RecipeSection() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/api/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
          <span
            className={`px-2 py-1 rounded text-sm ${
              recipe.dietaryType === "veg"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {recipe.dietaryType}
          </span>
          <div className="mt-4">
            <h4 className="font-semibold">Ingredients:</h4>
            <ul className="list-disc pl-5 mt-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Steps:</h4>
            <ol className="list-decimal pl-5 mt-2">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          {recipe.culturalSignificance && (
            <div className="mt-4 bg-gray-50 p-4 rounded">
              <h4 className="font-semibold">Cultural Significance:</h4>
              <p className="mt-2 text-gray-600">
                {recipe.culturalSignificance}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
