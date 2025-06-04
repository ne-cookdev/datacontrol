import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    if (access && refresh) {
      navigate("/products");
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);

  return null;
};

export { Homepage };
