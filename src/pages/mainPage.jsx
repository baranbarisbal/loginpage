import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { MY_QUERY } from "../graphql/query";

const mainPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  const { data, loading, error } = useQuery(MY_QUERY);
  console.log(data);

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
