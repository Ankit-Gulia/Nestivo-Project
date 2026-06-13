import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children }) {

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:8080/user/auth/check", { withCredentials: true })
      .then(res => {
        setIsAuth(res.data.isAuthenticated);
        setLoading(false);
      })
      .catch(() => {
        setIsAuth(false);
        setLoading(false);
      });
  }, []);

  if (loading || isAuth === null) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3 text-gray-600">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium">Checking authentication...</p>
      </div>
    </div>
  }

  if (!isAuth) {
    toast.error("Login before moving forward.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
