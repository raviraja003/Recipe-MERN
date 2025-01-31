import { useState } from "react";
import axios from "axios";

export function SubmissionCard({ submission, onUpdate }) {
  const [comment, setComment] = useState("");

  const handleLike = async () => {
    try {
      await axios.post(`/api/challenges/like/${submission._id}`);
      onUpdate(); // Refresh submissions
    } catch (error) {
      console.error("Error liking submission:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/challenges/comment/${submission._id}`, {
        text: comment,
      });
      setComment("");
      onUpdate(); // Refresh submissions
    } catch (error) {
      console.error("Error commenting:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <span>Like ({submission.likes.length})</span>
        </button>
      </div>

      <form onSubmit={handleComment} className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Comment
        </button>
      </form>
    </div>
  );
}
