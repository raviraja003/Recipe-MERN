import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ChallengeSubmissionPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    file: "",
    description: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await axios.post("/api/challenges/submit", uploadData);
      // Redirect to dashboard after successful submission
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Error submitting challenge");
      console.error("Error submitting challenge:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUploadData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 my-8">
          <h2 className="text-3xl font-bold mb-8">
            Submit Your Challenge Entry
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={uploadData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-4"
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Image URL</label>
              <input
                type="file"
                name="file"
                value={uploadData.file}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-4"
                placeholder="Enter image URL"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Recipe & Description
              </label>
              <textarea
                name="description"
                value={uploadData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-4 h-32"
                placeholder="Share your recipe and tell us about your dish..."
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Challenge"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChallengeSubmissionPage;
