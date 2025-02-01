import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { FaRegBookmark, FaBookmark, FaChevronDown } from "react-icons/fa";

// import Button from "../layouts/Button";
import italianHistory from "../assets/img/article-1.png";
import italianTradition from "../assets/img/article-2.png";
import japaneseArt from "../assets/img/article-3.png";
import japaneseArt2 from "../assets/img/article-4.png";
import japanThumbnail from "../assets/img/japan.png";
import indianArticle1 from "../assets/img/article-5.png";
import indianArticle2 from "../assets/img/article-6.jpg";
// import articleImage from "../assets/img/menu1.jpg";

// Add dropdown options
const cuisineOptions = [
  { value: "all", label: "Toutes les Cuisines" },
  { value: "italian", label: "Italienne" },
  { value: "japanese", label: "Japonaise" },
  { value: "indian", label: "Indienne" },
  { value: "french", label: "Française" },
  { value: "mexican", label: "Mexicaine" },
];

const formatOptions = [
  { value: "all", label: "Tout le Contenu" },
  { value: "video", label: "Vidéos" },
  { value: "article", label: "Articles" },
];

function Cuisines() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [savedContent, setSavedContent] = useState(new Set());

  // Add state for dropdowns
  const [isCuisineOpen, setIsCuisineOpen] = useState(false);
  const [isFormatOpen, setIsFormatOpen] = useState(false);

  // Mock data for cuisines content
  const cuisinesData = [
    {
      id: 1,
      title: "Cuisine Italienne Authentique avec Cristina",
      description:
        "Cette vidéo met en avant des recettes italiennes traditionnelles, notamment des pâtes faites maison et du Branzino à la sicilienne.",
      thumbnail: "https://img.youtube.com/vi/ob52pLHGFgM/maxresdefault.jpg",
      cuisine: "italian",
      type: "video",
      dietaryType: "non-veg",
      link: "https://www.youtube.com/watch?v=ob52pLHGFgM",
    },
    {
      id: 2,
      title:
        "Maîtriser les Spaghettis Carbonara : Recette Authentique Sans Crème",
      description:
        "Apprenez à préparer des spaghettis carbonara classiques de manière authentique.",
      thumbnail: "https://img.youtube.com/vi/3AAdKl1UYZs/maxresdefault.jpg",
      cuisine: "italian",
      type: "video",
      dietaryType: "non-veg",
      link: "https://www.youtube.com/watch?v=3AAdKl1UYZs",
    },
    {
      id: 3,
      title: "L'Histoire de la Cuisine Italienne I",
      description:
        "Un aperçu approfondi de l'évolution de la cuisine italienne depuis l'Antiquité jusqu'au Moyen Âge.",
      thumbnail: italianHistory,
      cuisine: "italian",
      type: "article",
      dietaryType: "both",
      link: "https://lifeinitaly.com/the-history-of-italian-cuisine-i/",
    },
    {
      id: 4,
      title:
        "Caractéristiques de la Cuisine Italienne : De la Tradition à la Durabilité",
      description:
        "Explore les aspects uniques de la culture culinaire italienne et son adaptation au fil du temps.",
      thumbnail: italianTradition,
      cuisine: "italian",
      type: "article",
      dietaryType: "both",
      link: "https://www.savoringitaly.com/characteristics-of-italian-cuisine/",
    },
    {
      id: 5,
      title: "Comment Faire des Sushis à la Maison",
      description:
        "Un guide pas à pas pour préparer des sushis authentiques dans votre propre cuisine.",
      thumbnail: "https://img.youtube.com/vi/I1UDS2kgqY8/maxresdefault.jpg",
      cuisine: "japanese",
      type: "video",
      dietaryType: "non-veg",
      link: "https://www.youtube.com/watch?v=I1UDS2kgqY8",
    },
    {
      id: 6,
      title: "Cuisine Japonaise Végétarienne : Recettes à Base de Tofu",
      description:
        "Apprenez à créer de délicieux plats japonais à base de tofu adaptés aux végétariens.",
      thumbnail: japanThumbnail,
      cuisine: "japanese",
      type: "video",
      dietaryType: "veg",
      link: "https://www.youtube.com/watch?v=2VwK220z8Tc&t=45s&ab_channel=TheKoreanVegan",
    },
    {
      id: 7,
      title: "L'Art de la Cuisine Japonaise",
      description:
        "Une exploration des principes et de l'esthétique qui définissent la cuisine japonaise.",
      thumbnail: japaneseArt,
      cuisine: "japanese",
      type: "article",
      dietaryType: "both",
      link: "https://www.japanesecuisine.com/art-of-cooking",
    },
    {
      id: 8,
      title: "Recette Authentique de Butter Chicken",
      description:
        "Un tutoriel détaillé sur la préparation du Butter Chicken indien traditionnel.",
      thumbnail: "https://i3.ytimg.com/vi/D_fYk8mBaF4/maxresdefault.jpg",
      cuisine: "indian",
      type: "video",
      dietaryType: "non-veg",
      link: "https://www.youtube.com/watch?v=QmWmYROrU7Q",
    },
    {
      id: 9,
      title: "Plats Indiens Végétariens Simples et Délicieux",
      description:
        "Découvrez comment cuisiner des plats indiens végétariens savoureux et faciles à préparer.",
      thumbnail: "https://i3.ytimg.com/vi/nRdRs_enmFg/maxresdefault.jpg",
      cuisine: "indian",
      type: "video",
      dietaryType: "veg",
      link: "https://www.youtube.com/watch?v=nRdRs_enmFg&ab_channel=HomeCookingShow",
    },
    {
      id: 10,
      title: "Recette de Soupe à l'Oignon à la Julia Child",
      description:
        "Un tutoriel classique pour préparer une soupe à l'oignon française traditionnelle avec des oignons caramélisés et un bouillon de bœuf.",
      thumbnail: "https://i3.ytimg.com/vi/gwUAvhwdYIA/maxresdefault.jpg",
      cuisine: "french",
      type: "video",
      dietaryType: "non-veg",
      link: "https://www.youtube.com/watch?v=dw0Ij1Fxgq4",
    },
    {
      id: 11,
      title: "Comment Faire du Ratatouille",
      description:
        "Guide pas à pas pour réaliser le plat traditionnel provençal de légumes mijotés, Ratatouille.",
      thumbnail: "https://img.youtube.com/vi/iCMGPRiDXQg/maxresdefault.jpg",
      cuisine: "french",
      type: "video",
      dietaryType: "veg",
      link: "https://www.youtube.com/watch?v=iCMGPRiDXQg",
    },
    {
      id: 12,
      title: "Recette Authentique de Tacos Mexicains",
      description:
        "Apprenez à préparer des tacos mexicains traditionnels avec des garnitures savoureuses et des tortillas maison.",
      thumbnail: "https://img.youtube.com/vi/1xw1g3Krkfs/maxresdefault.jpg",
      cuisine: "mexican",
      type: "video",
      dietaryType: "non-veg",
      link: "https://www.youtube.com/watch?v=1xw1g3Krkfs",
    },
    {
      id: 13,
      title: "Recettes Mexicaines Végétariennes",
      description:
        "Une compilation de plats mexicains végétariens délicieux et faciles à réaliser.",
      thumbnail: "https://img.youtube.com/vi/2xD4P4sJ3nE/maxresdefault.jpg",
      cuisine: "mexican",
      type: "video",
      dietaryType: "veg",
      link: "https://www.youtube.com/watch?v=2xD4P4sJ3nE",
    },
    {
      id: 14,
      title: "Traditional Japanese Vegetarian Dishes",
      description:
        "Discusses various traditional Japanese dishes that are inherently vegetarian",
      thumbnail: japaneseArt2,
      cuisine: "japanese",
      type: "article",
      dietaryType: "veg",
      link: "https://www.bbcgoodfood.com/howto/guide/10-vegetarian-japanese-inspired-recipes",
    },
    {
      id: 15,
      title: "La diversité des épices indiennes",
      description:
        "Un article détaillant les différentes épices essentielles à la cuisine indienne et leurs utilisations.",
      thumbnail: indianArticle1,
      cuisine: "indian",
      type: "article",
      dietaryType: "both",
      link: "https://rimaindustries.co.in/rich-diversity-of-indian-spices/",
    },
    {
      id: 16,
      title: "Cuisines régionales de l'Inde",
      description:
        "Explore les différentes traditions culinaires des différents États indiens",
      thumbnail: indianArticle2,
      cuisine: "indian",
      type: "article",
      dietaryType: "both",
      link: "https://www.railrecipe.com/blog/signature-cuisines-of-indian-states/",
    },
    {
      id: 17,
      title: "Recette de Soupe à l'Oignon à la Julia Child",
      description:
        "Un tutoriel classique pour préparer une soupe à l'oignon française traditionnelle avec des oignons caramélisés et un bouillon de bœuf.",
      thumbnail:
        "https://www.marthastewart.com/thmb/otnAS1Uf0JMJRfcGUiESU_3B3DM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/french-onion-soup-c26257c4-0221_hz_0-ocms-2000-74b6b2a568d2497eb34aa6e978fcbdb2.jpg",
      cuisine: "french",
      type: "article",
      dietaryType: "both",
      link: "https://www.thespruceeats.com/introduction-to-french-food-and-cooking-1375348",
    },
    {
      id: 18,
      title: "Recette de Soupe à l'Oignon à la Julia Child",
      description:
        "Un tutoriel classique pour préparer une soupe à l'oignon française traditionnelle avec des oignons caramélisés et un bouillon de bœuf.",
      thumbnail:
        "https://www.thespruceeats.com/thmb/gQOnlntfcY-10nopE3wzGhzDLnI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/croissants-GettyImages-553199395-57b598813df78cd39c5f71c4.jpg",
      cuisine: "french",
      type: "article",
      dietaryType: "both",
      link: "https://www.marthastewart.com/french-recipes-8585044",
    },
  ];

  const cuisineTypes = [
    { value: "all", label: "Toutes les Cuisines" },
    { value: "french", label: "Française" },
    { value: "italian", label: "Italienne" },
    { value: "japanese", label: "Japonaise" },
    { value: "indian", label: "Indienne" },
    { value: "mexican", label: "Mexicaine" },
    { value: "thai", label: "Thaïlandaise" },
  ];

  const contentTypes = [
    { value: "all", label: "Tout le Contenu" },
    { value: "video", label: "Vidéos" },
    { value: "article", label: "Articles" },
  ];

  // Filter content based on selected filters
  const filteredContent = cuisinesData.filter((item) => {
    const cuisineMatch =
      selectedCuisine === "all" || item.cuisine === selectedCuisine;
    const typeMatch = selectedType === "all" || item.type === selectedType;
    return cuisineMatch && typeMatch;
  });

  // Update the dietary type labels
  const getDietaryTypeLabel = (type) => {
    switch (type) {
      case "veg":
        return "Végétarien";
      case "non-veg":
        return "Non Végétarien";
      case "both":
        return "Vég & Non-Vég";
      default:
        return "";
    }
  };

  const handleSaveContent = (e, itemId) => {
    e.preventDefault(); // Prevent opening the link
    e.stopPropagation(); // Prevent event bubbling

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: "/cuisines",
          message: "Connectez-vous pour sauvegarder du contenu",
        },
      });
      return;
    }

    setSavedContent((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(itemId)) {
        newSaved.delete(itemId);
      } else {
        newSaved.add(itemId);
      }
      return newSaved;
    });
  };

  // Add this function to handle saved content view
  const handleViewSaved = () => {
    // You can navigate to a new route for saved content
    navigate("/saved-content");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setIsCuisineOpen(false);
        setIsFormatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header/Banner Section */}
      <div className="bg-gradient-to-r bg-orange-600 pt-20">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Découvrez les Cuisines
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Explorez le monde à travers la cuisine! Découvrez des recettes
              authentiques, apprenez des techniques culinaires et plongez dans
              les histoires derrière les plats emblématiques du monde entier.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Filters Section */}
      <div className="sticky top-[72px] bg-white shadow-sm z-20">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Cuisine Dropdown */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => {
                    setIsCuisineOpen(!isCuisineOpen);
                    setIsFormatOpen(false);
                  }}
                  className="w-full md:w-auto flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#FF6F00] text-[#FF6F00] hover:bg-[#FFF3E0] transition-colors"
                >
                  <span>
                    {
                      cuisineOptions.find(
                        (option) => option.value === selectedCuisine
                      )?.label
                    }
                  </span>
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isCuisineOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCuisineOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-30">
                    {cuisineOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedCuisine(option.value);
                          setIsCuisineOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-[#FFF3E0] transition-colors ${
                          selectedCuisine === option.value
                            ? "text-[#FF6F00] font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Format Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsFormatOpen(!isFormatOpen);
                    setIsCuisineOpen(false);
                  }}
                  className="w-full md:w-auto flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#FF6F00] text-[#FF6F00] hover:bg-[#FFF3E0] transition-colors"
                >
                  <span>
                    {
                      formatOptions.find(
                        (option) => option.value === selectedType
                      )?.label
                    }
                  </span>
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isFormatOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isFormatOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-30">
                    {formatOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedType(option.value);
                          setIsFormatOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-[#FFF3E0] transition-colors ${
                          selectedType === option.value
                            ? "text-[#FF6F00] font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Saved button */}
            {isAuthenticated && (
              <button
                onClick={handleViewSaved}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-colors text-[#FF6F00] border-2 border-[#FF6F00] hover:bg-[#FF6F00] hover:text-white"
              >
                <FaBookmark className="w-4 h-4" />
                <span>Sauvegardés</span>
                {savedContent.size > 0 && (
                  <span className="ml-1 bg-white text-[#FF6F00] text-xs px-2 py-1 rounded-full">
                    {savedContent.size}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section with padding for sticky header */}
      <div className="container mx-auto px-4 py-8">
        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredContent.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative"
            >
              {/* Save Button */}
              <button
                onClick={(e) => handleSaveContent(e, item.id)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                {savedContent.has(item.id) ? (
                  <FaBookmark className="text-[#FF6F00] w-5 h-5" />
                ) : (
                  <FaRegBookmark className="text-[#FF6F00] w-5 h-5" />
                )}
              </button>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 text-[#FF6F00] px-4 py-2 rounded-full">
                        Regarder la vidéo
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#FF6F00]">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-sm bg-[#FFF3E0] text-[#FF6F00]">
                      {
                        cuisineTypes.find((type) => type.value === item.cuisine)
                          ?.label
                      }
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-[#FFF3E0] text-[#FF6F00]">
                      {
                        contentTypes.find((type) => type.value === item.type)
                          ?.label
                      }
                    </span>
                    {item.dietaryType && (
                      <span className="px-3 py-1 rounded-full text-sm bg-[#FFF3E0] text-[#FF6F00]">
                        {getDietaryTypeLabel(item.dietaryType)}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-[#FFF3E0] py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-[#FF6F00] mb-4">
            Enregistrez votre contenu préféré en vous inscrivant !
          </h2>
          <Link to="/login">
            <button className="w-full md:w-auto px-8 py-3 bg-[#FF6F00] text-white rounded-full font-semibold hover:bg-[#F57C00] transition-colors">
              S&apos;inscrire Maintenant
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Cuisines;
