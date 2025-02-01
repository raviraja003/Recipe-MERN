import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import logo from "../assets/form_icon.jpeg";
import googleLogo from "../assets/google-icon.svg";

export function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, error, isLoading, clearError } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Show message if redirected from saving content
    if (location.state?.message) {
      // You can show this message using a toast notification
      // or your preferred notification system
      console.log(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      handleLoginSuccess();
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
  };

  const handleLoginSuccess = () => {
    // Redirect back to the previous page after login
    navigate(location.state?.from || "/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9f6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm">
        {/* Logo and Title */}
        <div className="flex flex-col items-center">
          <img src={logo} alt="Urban Roots" className="h-24 w-auto" />
          <h2 className="mt-4 text-3xl font-bold text-[#1e4c3c]">Connexion</h2>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-[#B4E4D4] hover:bg-[#a3d6c4] text-gray-700 font-medium py-4 px-4 rounded-full transition-colors"
        >
          <img src={googleLogo} alt="Google" className="w-5 h-5" />
          Connectez-vous avec Google
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Ou</span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Adresse email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#2d6a4f] hover:bg-[#255c42] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Connexion"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          Vous n&apos;avez pas de compte ?{" "}
          <Link
            to="/signup"
            className="font-medium text-[#2d6a4f] hover:text-[#255c42]"
          >
            Inscription
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
