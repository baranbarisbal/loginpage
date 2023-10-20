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
  useEffect(() => {
    if (!loading && !error) {
      if (
        user &&
        localStorage.getItem("token") &&
        localStorage.getItem("user") &&
        data && // data varlığını kontrol et
        data.User && // User alanının varlığını kontrol et
        data.User.firstName // firstName alanının varlığını kontrol et
      ) {
        // Kullanıcı oturumu açık ve localStorage'da token ve user mevcutsa ana sayfada kal
        navigate("/");
      } else {
        // Kullanıcı oturumu kapalı veya token/user bilgileri eksikse login sayfasına yönlendir
        navigate("/login");
      }
    }
  }, [user, data, loading, error, navigate]);

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
