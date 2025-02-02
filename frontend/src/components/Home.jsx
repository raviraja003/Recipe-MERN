import Button from "../layouts/Button";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/img/feature-1.jpg";
import img2 from "../assets/img/feature-2.jpg";
import img3 from "../assets/img/feature-3.png";
import imgTestimonial1 from "../assets/img/pic1.jpg";
import imgTestimonial2 from "../assets/img/pic2.jpg";
import imgTestimonial3 from "../assets/img/pic3.jpg";
import logo from "../assets/form_icon.jpeg";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Comment participer aux défis hebdomadaires IA?",
      answer:
        "C'est simple ! Après vous être inscrit, rendez-vous dans la section Défi Hebdomadaire IA de votre tableau de bord. Chaque semaine, vous y trouverez un nouveau défi avec une recette détaillée et des instructions pas à pas. Suivez la recette, préparez votre plat, et téléchargez une photo ou une vidéo de votre création pour la partager avec la communauté.",
    },
    {
      question: "Puis-je retenter un défi si je ne l'ai pas terminé?",
      answer:
        "Absolument ! Vous pouvez retenter le même défi autant de fois que vous le souhaitez au cours de la semaine. Accédez simplement à la page du défi, où vous retrouverez la recette et les instructions.",
    },
    {
      question: "Quelles cuisines sont mises en avant sur la plateforme?",
      answer:
        "Notre plateforme célèbre la diversité culinaire mondiale ! Des cuisines italienne et mexicaine aux plats indiens et japonais, nos défis et notre section découverte mettent en lumière des plats variés. Chaque recette est accompagnée de contextes culturels enrichissants.",
    },
    {
      question:
        "Dois-je être un cuisinier expérimenté pour utiliser cette plateforme?",
      answer:
        "Pas du tout! Toques en Duel est conçu pour les passionnés de cuisine, quel que soit leur niveau. Nos recettes détaillées et notre communauté bienveillante vous accompagneront à chaque étape.",
    },
    {
      question: "Comment partager mes créations culinaires?",
      answer:
        "Une fois un défi terminé, vous pouvez télécharger votre plat depuis votre tableau de bord. Ajoutez une photo ou une vidéo, ainsi qu'une courte description ou histoire autour de votre création. Votre soumission apparaîtra dans la Galerie des Défis, où les autres utilisateurs pourront la voir, l'aimer et la commenter.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 py-10 bg-[url('./assets/img/hero.jpg')] bg-cover bg-no-repeat">
        <div className="w-full lg:w-2/3 space-y-5 text-center lg:text-left pt-[110px]">
          <h1 className="text-backgroundColor font-semibold text-4xl lg:text-6xl">
            Découvrez, Cuisinez et Célébrez les Cultures Culinaires Ensemble !
          </h1>
          <p className="text-backgroundColor text-sm lg:text-base">
            Rejoignez notre communauté pour explorer des cuisines variées,
            participer à des défis hebdomadaires générés par IA et partager vos
            créations culinaires.
          </p>
          <div className="home-book-btn flex flex-col lg:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/Cuisines"
              className="table-btn text-[#FF6F00] border-2 border-[#FF6F00] px-4 py-2 rounded-md hover:text-[#ffffff] hover:border-[#FF6F00] hover:bg-[#FF6F00]"
            >
              <Button title="Découvrez les Cuisines" />
            </a>
            <a
              href="/challenge"
              className="table-btn text-[#56d15c] border-2 border-[#56d15c] px-4 py-2 rounded-md hover:text-[#ffffff] hover:border-[#56d15c] hover:bg-[#56d15c]"
            >
              <Button title="Lancez le Défi Hebdomadaire IA" />
            </a>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5">
        <img src={logo} alt="img" />

        <div className=" space-y-4 lg:pt-14">
          <h1 className=" font-semibold text-4xl text-center ">
            Propos de Nous
          </h1>
          <p>
            Chez Toques en Duel, nous croyons que la cuisine est bien plus qu'un
            simple besoin—c'est un langage universel qui connecte les gens,
            transcende les frontières et favorise la compréhension culturelle.
            Notre mission est de célébrer la richesse des cuisines du monde en
            réunissant des passionnés de cuisine de tous horizons.
          </p>
          <p>
            Chaque semaine, notre plateforme propose un défi culinaire généré
            par IA, mettant en lumière des plats traditionnels du monde entier.
            Ces défis incluent des recettes détaillées, des explications
            culturelles enrichissantes, et une opportunité unique d'améliorer
            vos compétences culinaires.
          </p>
          <p>
            Mais cela ne s'arrête pas là ! Partagez vos créations en
            téléchargeant des photos et des vidéos, racontez votre histoire
            culinaire et interagissez avec une communauté dynamique et
            passionnée par la cuisine.
          </p>
          <p>
            Que vous soyez un chef expérimenté ou que vous débutiez en cuisine,
            Toques en Duel est là pour éveiller votre créativité, élargir votre
            palette et vous connecter au monde—un plat à la fois.
          </p>
        </div>
      </div>

      {/* Our Feature  */}
      <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 bg-gray-50">
        <h1 className="text-4xl font-semibold text-center pt-24 pb-10">
          Points Forts
        </h1>

        <div className="flex flex-wrap gap-16 justify-center">
          <div className="w-full lg:w-[350px] p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            <img
              className="rounded-xl w-full h-48 object-cover"
              src={img1}
              alt="img"
            />
            <div className="space-y-4 flex flex-col h-[calc(100%-192px)]">
              <h3 className="font-semibold text-center text-xl pt-6">
                Découvrez les Cuisines du Monde
              </h3>
              <p className="text-center flex-grow">
                Explorez des cuisines variées grâce à des articles et vidéos
                sélectionnés. Découvrez les traditions et histoires derrière des
                plats emblématiques du monde entier.
              </p>
              <div className="flex justify-center pt-4">
                <a
                  href="/Cuisines"
                  className="w-full text-center text-[#FF6F00] border-2 border-[#FF6F00] hover:text-[#ffffff] hover:border-[#FF6F00] hover:bg-[#FF6F00] px-6 py-2 rounded-full transition-colors"
                >
                  Découvrez les Cuisines
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[350px] p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            <img
              className="rounded-xl w-full h-48 object-cover"
              src={img2}
              alt="img"
            />
            <div className="space-y-4 flex flex-col h-[calc(100%-192px)]">
              <h3 className="font-semibold text-center text-xl pt-6">
                Défis Hebdomadaires Générés par IA
              </h3>
              <p className="text-center flex-grow">
                Relevez des défis culinaires passionnants, créés par IA, avec
                des recettes traditionnelles et des informations culturelles.
                Parfait pour tester vos compétences et découvrir de nouvelles
                saveurs.
              </p>
              <div className="flex justify-center pt-4">
                <a
                  href="/login"
                  className="w-full text-center text-[#56d15c] border-2 border-[#56d15c] hover:text-[#ffffff] hover:border-[#56d15c] hover:bg-[#56d15c] px-6 py-2 rounded-full transition-colors"
                >
                  Relevez le Défi
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[350px] p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
            <img
              className="rounded-xl w-full h-48 object-cover"
              src={img3}
              alt="img"
            />
            <div className="space-y-4 flex flex-col h-[calc(100%-192px)]">
              <h3 className="font-semibold text-center text-xl pt-6">
                Partagez Vos Créations
              </h3>
              <p className="text-center flex-grow">
                Exprimez votre passion pour la cuisine! Téléchargez des photos,
                vidéos et recettes de vos plats, et connectez-vous avec une
                communauté dynamique de passionnés de cuisine.
              </p>
              <div className="flex justify-center pt-4">
                <a
                  href="/login"
                  className="w-full text-center text-[#56d15c] border-2 border-[#56d15c] hover:text-[#ffffff] hover:border-[#56d15c] hover:bg-[#56d15c] px-6 py-2 rounded-full transition-colors"
                >
                  Partagez Vos Créations
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Out Testimonial */}
      <div className=" min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
        <h1 className=" text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
          Témoignages
        </h1>
        {/* <p>What Our Members Say</p> */}
        <div className=" flex flex-col md:flex-row gap-5 mt-5">
          <div className=" w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div>
              <p className=" text-lightText">
                "J'ai toujours aimé découvrir de nouvelles cuisines, mais cette
                plateforme a porté mon expérience à un niveau supérieur. Les
                défis IA sont si créatifs, et apprendre les histoires
                culturelles derrière chaque plat a été une magnifique
                découverte!"
              </p>
            </div>

            <div className=" flex flex-row justify-center items-center mt-4 gap-4">
              <img
                className=" rounded-full w-1/4"
                src={imgTestimonial1}
                alt="img"
              />
              <h3 className=" font-semibold ">
                Émilie R., Passionnée de Cuisine
              </h3>
            </div>
          </div>
          <div className=" w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div>
              <p className=" text-lightText">
                "Moi qui ai tendance à cuisiner toujours les mêmes recettes,
                Toques en Duel m'a aidé à sortir de ma zone de confort. J'ai
                essayé des plats que je n'aurais jamais imaginé faire, et j'ai
                partagé mes créations avec une communauté bienveillante!"
              </p>
            </div>

            <div className=" flex flex-row justify-center items-center mt-4 gap-4">
              <img
                className=" rounded-full w-1/4"
                src={imgTestimonial2}
                alt="img"
              />
              <h3 className=" font-semibold ">Carlos M., Cuisinier Amateur</h3>
            </div>
          </div>
          <div className=" w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div>
              <p className=" text-lightText">
                "J'ai rejoint Toques en Duel pour améliorer mes compétences
                culinaires, mais je suis restée pour les histoires. Découvrir la
                signification culturelle de chaque plat tout en me lançant des
                défis culinaires est une expérience incroyable."
              </p>
            </div>

            <div className=" flex flex-row justify-center items-center mt-4 gap-4">
              <img
                className=" rounded-full w-1/4"
                src={imgTestimonial3}
                alt="img"
              />
              <h3 className=" font-semibold ">
                Fatima H., Amoureuse des Cultures
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Questions Fréquemment Posées
            </h2>
            {/* <p className="text-lg text-gray-600">
              Find answers to common questions about Urban Roots
            </p> */}
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg bg-white overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {activeIndex === index ? (
                      <motion.span
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 180 }}
                        className="text-green-600"
                      >
                        ▼
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ rotate: 180 }}
                        animate={{ rotate: 0 }}
                        className="text-gray-400"
                      >
                        ▼
                      </motion.span>
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
