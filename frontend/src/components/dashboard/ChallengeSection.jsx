import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../store/authStore";

export function ChallengeSection() {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        const [challengeRes, submissionsRes] = await Promise.all([
          axios.get("/api/challenges/current"),
          axios.get("/api/challenges/gallery"),
        ]);
        setCurrentChallenge(challengeRes.data);
        setSubmissions(submissionsRes.data);
      } catch (error) {
        console.error("Error fetching challenge data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallengeData();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await axios.post("/api/challenges/submit", formData);
      // Refresh submissions after new submission
      const { data } = await axios.get("/api/challenges/gallery");
      setSubmissions(data);
    } catch (error) {
      console.error("Error submitting challenge:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Current Challenge */}
      {currentChallenge && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">{currentChallenge.title}</h2>
          <p className="text-gray-600 mb-4">{currentChallenge.description}</p>
          {/* Challenge submission form */}
        </div>
      )}

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((submission) => (
          <div
            key={submission._id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <img
              src={submission.content}
              alt="Challenge submission"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center mb-4">
              <span className="font-semibold">{submission.userId.name}</span>
              <span className="text-gray-500 text-sm ml-auto">
                {new Date(submission.submittedAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{submission.description}</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <span>Like ({submission.likes.length})</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <span>Comment ({submission.comments.length})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
