import React from "react";
import { useNavigate } from "react-router-dom";

import { useLogoutUserMutation } from "../../features/api/accountsApi";

import { LogoutIcon } from "../Icons/LogoutIcon";

import "./Header.css";

export const Header = () => {
  // нужно для редиректа
  const navigate = useNavigate();

  // запрос на выход
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      const returned = await logoutUser({ refresh_token: refreshToken }).unwrap();
      localStorage.clear();
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="header_container">
      <div></div>
      <h1 className="header_h1">DataControl</h1>
      <div onClick={handleLogout} className="header_logout_div">
        <span className="header_logout_span">Выйти</span>
        <LogoutIcon className="header_logout_icon" />
      </div>
    </div>
  );
};
