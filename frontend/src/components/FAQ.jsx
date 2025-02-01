import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is Urban Roots?",
      answer:
        "Urban Roots is a community-driven platform that connects food enthusiasts to share recipes, cooking tips, and cultural food traditions. We aim to bring people together through the love of cooking and sharing meals.",
    },
    {
      question: "How do I participate in weekly cooking challenges?",
      answer:
        "Simply sign up for an account, visit our 'Weekly Challenges' section, and join the current challenge. You can submit photos of your dishes, share recipes, and interact with other participants.",
    },
    {
      question: "Can I share my own recipes?",
      answer:
        "Yes! Once you're registered, you can share your recipes, cooking stories, and food traditions. You can also add photos, cooking tips, and cultural context to your submissions.",
    },
    {
      question: "How do I connect with other cooks?",
      answer:
        "You can follow other users, comment on their recipes, join cooking groups, and participate in community discussions. We also host virtual cooking events and meetups.",
    },
    {
      question: "Is Urban Roots available worldwide?",
      answer:
        "Yes, Urban Roots is available globally. We celebrate diverse cuisines and cooking traditions from all around the world. Our community includes members from various countries and cultures.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about Urban Roots
          </p>
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
                    <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
