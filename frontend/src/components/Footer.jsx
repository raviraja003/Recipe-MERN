import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsPinterest } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="bg-black text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className="w-full md:w-1/4">
          <h1 className="font-semibold text-xl pb-4">Toques en Duel</h1>
          <p className="text-sm">
            Découvrez, Cuisinez et Célébrez les Cultures Culinaires Ensemble!
          </p>
        </div>
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Liens</h1>
          <nav className="flex flex-col gap-2">
            <Link
              to="/challenge"
              className="hover:text-green-400 transition-colors cursor-pointer"
            >
              Découvrez les Cuisines
            </Link>
            <Link
              to="/cuisines"
              className="hover:text-green-400 transition-colors cursor-pointer"
            >
              Défi Hebdomadaire IA
            </Link>
          </nav>
        </div>
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">
            Nous contacter
          </h1>
          <nav className="flex flex-col gap-2">
            <a
              className="hover:text-green-400 transition-colors cursor-pointer"
              href="mailto:icoderaj@gmail.com"
            >
              example@gmail.com
            </a>
            <a
              className="hover:text-green-400 transition-colors cursor-pointer"
              href="#"
            >
              +91 99999 99999
            </a>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                className="hover:text-green-400 transition-colors cursor-pointer"
              >
                <BsFacebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-green-400 transition-colors cursor-pointer"
              >
                <RiTwitterXFill size={20} />
              </a>
              <a
                href="#"
                className="hover:text-green-400 transition-colors cursor-pointer"
              >
                <BsInstagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-green-400 transition-colors cursor-pointer"
              >
                <BsPinterest size={20} />
              </a>
            </div>
          </nav>
        </div>
      </div>
      {/* <div>
        <p className="text-center py-4">
          @copyright developed by
          <span className="text-green-500"> King programmers</span> | All rights
          reserved
        </p>
      </div> */}
    </div>
  );
};

export default Footer;
