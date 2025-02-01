import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
// import Menu from "./components/Menu";
import Footer from "./components/Footer";
// import Dishes from "./components/Dishes";
// import Reviews from "./components/Review";
// import Review from "./components/Review";
import Signup from "./components/signup";
import Login from "./components/login";
// import FAQ from "./components/FAQ";
import Challenge from "./components/Challenge";
import Cuisines from "./components/Cuisines";
import { ChallengeSubmissionPage } from "./components/dashboard/ChallengeSubmissionPage";
import SavedContent from "./components/SavedContent";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cuisines" element={<Cuisines />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route
            path="/dashboard/challenge-submission"
            element={<ChallengeSubmissionPage />}
          />
          <Route path="/saved-content" element={<SavedContent />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
