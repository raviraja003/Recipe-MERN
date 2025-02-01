import { Link, useNavigate } from "react-router-dom";
import { BiRestaurant } from "react-icons/bi";
import Button from "../layouts/Button";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import logo from "../assets/form_icon.jpeg";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const { isAuthenticated, logout, user } = useAuthStore();

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleRedirect = () => {
    if (isAuthenticated) {
      navigate("/challenge"); // Redirect to the AI Challenge page
    } else {
      navigate("/login", {
        state: { from: "/challenge" }, // Store the intended destination
      });
    }
  };

  return (
    <div className="fixed w-full">
      <div>
        <div className="flex flex-row justify-between p-5 pl-32 px-5 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-row items-center cursor-pointer">
            <Link to="/">
              <span className="text-green-600">
                <img src={logo} alt="Toques en Duel" className="h-12 w-auto" />
                {/* <BiRestaurant size={32} /> */}
              </span>
            </Link>
            <Link to="/">
              {/* <img src={logo} alt="Toques en Duel" className="h-12 w-auto" /> */}
              <h1 className="text-xl font-semibold transition-colors">
                Toques en Duel
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="/cuisines"
              className="hover:text-[#FF6F00] transition-colors cursor-pointer"
            >
              Découvrez les Cuisines
            </Link>

            <button
              onClick={handleRedirect}
              className="hover:text-[#2E7D32] transition-colors cursor-pointer"
            >
              Défi Hebdomadaire IA
            </button>

            <div className="book-btn">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="table-btn">
                    <Button title="Connexion" />
                  </Link>
                  <Link to="/signup" className="table-btn">
                    <Button title="Inscription" />
                  </Link>
                </>
              ) : (
                <div className="flex items-center table-btn">
                  <span className="text-gray-700 mr-4">
                    Bienvenue, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-[#56d15c] border-2 border-[#56d15c] hover:text-[#ffffff] hover:border-[#56d15c] hover:bg-[#56d15c] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose
                size={25}
                onClick={handleChange}
                className="text-green-600"
              />
            ) : (
              <AiOutlineMenuUnfold
                size={25}
                onClick={handleChange}
                className="text-green-600"
              />
            )}
          </div>
        </div>
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="/cuisines"
            className="hover:text-green-400 transition-colors cursor-pointer"
            onClick={closeMenu}
          >
            Découvrez les Cuisines
          </Link>
          <Link
            to="/challenge"
            className="hover:text-green-400 transition-colors cursor-pointer"
            onClick={closeMenu}
          >
            Défi Hebdomadaire IA
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={closeMenu}>
                <Button title="Connexion" />
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                <Button title="Inscription" />
              </Link>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <span className="text-white">Welcome, {user?.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-md text-base font-medium"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
