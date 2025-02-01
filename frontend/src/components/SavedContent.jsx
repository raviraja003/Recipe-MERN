import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import useAuthStore from "../store/authStore";

export function SavedContent() {
  const { isAuthenticated } = useAuthStore();
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    // Here you would fetch the user's saved content from your backend
    // For now, we'll use mock data
    setSavedItems([
      // ... your saved items
    ]);
  }, []);

  const handleUnsave = (itemId) => {
    setSavedItems(savedItems.filter((item) => item.id !== itemId));
    // Here you would also update the backend
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Connectez-vous pour voir votre contenu sauvegardé
          </h2>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-[#FF6F00] text-white rounded-full hover:bg-[#F57C00] transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#FF6F00] mb-8">
          Contenu Sauvegardé
        </h1>

        {savedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              Vous n'avez pas encore sauvegardé de contenu
            </p>
            <Link
              to="/cuisines"
              className="inline-block px-6 py-3 bg-[#FF6F00] text-white rounded-full hover:bg-[#F57C00] transition-colors"
            >
              Découvrir du Contenu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative"
              >
                {/* Similar card layout as in Cuisines component */}
                {/* ... */}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedContent;
