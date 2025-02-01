import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaUpload, FaHeart, FaComment } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Challenge() {
  const navigate = useNavigate();
  const [activeChallenge, setActiveChallenge] = useState(
    "Week 1: Italian Pasta"
  );
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { isAuthenticated, user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadData, setUploadData] = useState({
    content: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [weeklyRecipe, setWeeklyRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [challengeHistory, setChallengeHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isSubmissionsLoading, setIsSubmissionsLoading] = useState(true);
  const [submissionsError, setSubmissionsError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for challenge history
  const challengeHistoryMock = [
    {
      id: 1,
      title: "Week 1: Italian Pasta",
      thumbnail: "/images/pasta.jpg",
      date: "2024-03-15",
      isVeg: true,
    },
    // Add more challenge history items
  ];

  // Mock data for community submissions
  const communitySubmissions = [
    {
      id: 1,
      userName: "John Doe",
      thumbnail: "/images/submission1.jpg",
      likes: 24,
      comments: 8,
      challenge: "Week 1: Italian Pasta",
    },
    // Add more submissions
  ];

  // Fetch weekly recipe
  useEffect(() => {
    const fetchWeeklyRecipe = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/recipes");
        // Get the most recent recipe
        const latestRecipe = response.data[0];
        setWeeklyRecipe(latestRecipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setWeeklyRecipe();
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchWeeklyRecipe();
    }
  }, [isAuthenticated]);

  // Fetch challenge history
  useEffect(() => {
    const fetchChallengeHistory = async () => {
      try {
        setIsHistoryLoading(true);
        const response = await axios.get("/api/challenges/history");
        setChallengeHistory(response.data);
      } catch (error) {
        console.error("Error fetching challenge history:", error);
        setHistoryError("Failed to load challenge history");
      } finally {
        setIsHistoryLoading(false);
      }
    };
    console.log("Fetching challenge history ==>", fetchChallengeHistory());

    if (isAuthenticated) {
      fetchChallengeHistory();
    }
  }, [isAuthenticated]);

  // Fetch submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setIsSubmissionsLoading(true);
        const response = await axios.get("/api/challenges/submissions");
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setSubmissionsError("Failed to load submissions");
      } finally {
        setIsSubmissionsLoading(false);
      }
    };
    console.log("Submissions ==>", fetchSubmissions());

    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated, selectedFilter]);

  // Default recipe as fallback
  // const defaultRecipe = {
  //   title: "Traditional Pad Thai",
  //   dietaryType: "non-veg",
  //   ingredients: [
  //     "200g rice noodles",
  //     "200g shrimp",
  //     "2 eggs",
  //     "100g tofu",
  //     "Bean sprouts",
  //     "Green onions",
  //     "Crushed peanuts",
  //     "Lime wedges",
  //     "3 tbsp fish sauce",
  //     "2 tbsp palm sugar",
  //     "2 tbsp tamarind paste",
  //   ],
  //   steps: [
  //     "Soak rice noodles in warm water for 30 minutes",
  //     "Heat oil in a wok and stir-fry shrimp until pink",
  //     "Add tofu and cook until golden",
  //     "Push ingredients aside and scramble eggs in the wok",
  //     "Add drained noodles and sauce mixture",
  //     "Toss with bean sprouts and green onions",
  //     "Serve with crushed peanuts and lime wedges",
  //   ],
  //   culturalSignificance:
  //     "Pad Thai is Thailand's national dish, created in the 1930s as part of a campaign to promote Thai nationalism and reduce rice consumption during World War II.",
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await axios.post("/api/challenges/submit", uploadData);
      // Reset form after successful submission
      setUploadData({ content: "", description: "" });
      // You could add a success message or redirect here
    } catch (error) {
      setError(error.response?.data?.message || "Error submitting challenge");
      console.error("Error submitting challenge:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUploadData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleCreateRecipe = async () => {
  //   try {
  //     const response = await axios.post("/api/recipes", weeklyRecipe);
  //     console.log("Recipe created:", response.data);
  //   } catch (error) {
  //     console.error("Error creating recipe:", error);
  //   }
  // };

  const handleUploadClick = () => {
    navigate("/dashboard/challenge-submission");
  };

  const handleStartChallenge = async () => {
    try {
      if (!weeklyRecipe?._id) {
        console.error("No recipe available");
        return;
      }
      console.log("weeklyRecipe ==>", weeklyRecipe);

      const response = await axios.post("/api/challenges/start", {
        recipeId: weeklyRecipe._id,
      });

      console.log("Challenge started:", response.data);
      // You could add a success message or redirect
    } catch (error) {
      console.error("Error starting challenge:", error);
      setError(error.response?.data?.message || "Error starting challenge");
    }
  };

  const handleLike = async (submissionId) => {
    try {
      await axios.post(`/api/challenges/like/${submissionId}`);
      // Refresh submissions
      const response = await axios.get("/api/challenges/submissions");
      setSubmissions(response.data);
    } catch (error) {
      console.error("Error liking submission:", error);
    }
  };

  const handleComment = (submissionId) => {
    // Navigate to submission detail page or open comment modal
    navigate(`/submission/${submissionId}`);
  };

  const generateRecipe = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      const response = await axios.post("/api/recipes/generate");
      setWeeklyRecipe(response.data);
    } catch (error) {
      console.error("Error generating recipe:", error);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Banner Section */}
      <section className="relative h-[500px] bg-gradient-to-r bg-[#56d15c] text-white">
        <div className="container mx-auto px-4 py-16 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            {isAuthenticated ? (
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Bienvenue, {user.name}
              </h1>
            ) : (
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Please login to start the challenge
              </h1>
            )}

            <div className="flex items-center justify-center gap-2 mb-6">
              <FaLeaf className="text-green-300" />
              <span className="text-lg">
                Relevez le défi culinaire généré par l&apos;IA de cette semaine!
                Découvrez une recette traditionnelle du monde entier, suivez les
                instructions étape par étape et laissez libre cours à votre
                créativité en cuisine. Une fois votre plat réalisé, téléchargez
                votre création pour la partager avec la communauté et célébrer
                ensemble la joie de cuisiner!
              </span>
            </div>
            <button
              onClick={handleStartChallenge}
              className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:text-[#ffffff] hover:bg-[#2E7D32] transition-colors"
            >
              Commencer le défi
            </button>
          </motion.div>
        </div>
      </section>

      {/* AI-Generated Recipe Section */}
      {isAuthenticated && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Recette de la semaine</h2>
                <button
                  onClick={generateRecipe}
                  disabled={isGenerating}
                  className="bg-[#FF6F00] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#F57C00] transition-colors disabled:opacity-50"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Génératrice...
                    </div>
                  ) : (
                    "Générer une nouvelle recette"
                  )}
                </button>
              </div>

              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F00]"></div>
                  <p className="mt-4 text-gray-600">Générer votre recette...</p>
                </div>
              ) : error ? (
                <div className="text-red-600 text-center py-8">{error}</div>
              ) : weeklyRecipe ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <FaLeaf className="text-green-600" />
                    <span className="text-gray-600">
                      {weeklyRecipe.dietaryType === "veg"
                        ? "Végétarienne"
                        : "Non-végétarien"}
                    </span>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        {weeklyRecipe.title}
                      </h3>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Ingrédients
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {weeklyRecipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-gray-600">
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Étapes de préparation
                      </h3>
                      <ol className="list-decimal pl-5 space-y-4">
                        {weeklyRecipe.steps.map((step, index) => (
                          <li key={index} className="text-gray-600">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Importance culturelle
                      </h3>
                      <p className="text-gray-600">
                        {weeklyRecipe.culturalSignificance}
                      </p>
                    </div>

                    <button
                      onClick={handleUploadClick}
                      className="w-full md:w-auto bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                    >
                      Téléchargez votre plat
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  Click &quot;Generate New Recipe&quot; to get started
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Challenge History */}
      {isAuthenticated && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              L'historique de vos défis
            </h2>

            {isHistoryLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : historyError ? (
              <div className="text-red-600 text-center py-8">
                {historyError}
              </div>
            ) : challengeHistory.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challengeHistory.map((challenge) => (
                  <div
                    key={challenge._id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    {challenge.submissions[0]?.file && (
                      <img
                        src={challenge.submissions[0].file}
                        alt={challenge.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="font-semibold mb-2">{challenge.title}</h3>
                      <p className="text-gray-600 mb-2">
                        {new Date(challenge.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 mb-4">
                        Status:{" "}
                        {new Date(challenge.endDate) > new Date()
                          ? "Active"
                          : "Completed"}
                      </p>
                      {challenge.submissions.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Your Submission:</h4>
                          <p className="text-gray-600">
                            {challenge.submissions[0].title}
                          </p>
                          <div className="flex items-center gap-4 text-gray-600">
                            <span className="flex items-center gap-1">
                              <FaHeart />
                              {challenge.submissions[0].likes.length}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaComment />
                              {challenge.submissions[0].comments.length}
                            </span>
                          </div>
                        </div>
                      )}
                      {/* <button
                        className="mt-4 text-green-600 font-medium hover:text-green-700 transition-colors"
                        onClick={() => navigate(`/challenge/${challenge._id}`)}
                      >
                        View Details
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">
                Vous n'avez pas encore participé à des défis.
                {weeklyRecipe && (
                  <div className="mt-4">
                    <button
                      onClick={handleStartChallenge}
                      className="text-green-600 font-medium hover:text-green-700"
                    >
                      Commencez votre premier défi maintenant !
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Community Gallery */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-center">
              Soumissions de la communauté
            </h2>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Challenges</option>
              <option value="latest">Latest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {isSubmissionsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : submissionsError ? (
            <div className="text-red-600 text-center py-8">
              {submissionsError}
            </div>
          ) : submissions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.map((submission) => (
                <div
                  key={submission._id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  {submission.file && (
                    <img
                      src={submission.file}
                      alt={submission.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-medium text-gray-900">
                        {submission.userId.name}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-semibold mb-2">{submission.title}</h3>
                    <p className="text-gray-600 mb-2 text-sm">
                      Challenge: {submission.challengeTitle}
                    </p>
                    {submission.description && (
                      <p className="text-gray-600 mb-4">
                        {submission.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-gray-600">
                        <button
                          className="flex items-center gap-1 hover:text-red-600 transition-colors"
                          onClick={() => handleLike(submission._id)}
                        >
                          <FaHeart
                            className={
                              submission.likes.includes(user?._id)
                                ? "text-red-600"
                                : ""
                            }
                          />
                          {submission.likes.length}
                        </button>
                        <button
                          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                          onClick={() => handleComment(submission._id)}
                        >
                          <FaComment />
                          {submission.comments.length}
                        </button>
                      </div>
                      {/* <button
                        className="text-green-600 font-medium hover:text-green-700 transition-colors"
                        onClick={() =>
                          navigate(`/submission/${submission._id}`)
                        }
                      >
                        View Details
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              No submissions available.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Challenge;
