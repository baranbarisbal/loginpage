import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import React, { createContext, useEffect, useState } from "react";
import { useCustomHook } from "./hooks/customHooks";
import Login from "./pages/loginPage";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";

export const userContext = createContext();
function App() {
  const { user, setUser } = useCustomHook();

  console.log(user);

  const materialTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            background: "orange",
            textTransform: "none",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <userContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <MainPage /> : <Navigate to="/login " />}
            ></Route>
            <Route
              path="/login"
              element={user ? <Navigate replace to="/" /> : <Login />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </ThemeProvider>
  );
}

export default App;
