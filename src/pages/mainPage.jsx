import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";

const mainPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    navigate("/login");
  };

  return (
    <div>
      <Button type="button" onClick={handleLogout}>
        Çıkış Yap
      </Button>
    </div>
  );
};

export default mainPage;
