import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import React, { createContext, useEffect } from "react";
import { useCustomHook } from "./hooks/customHooks";
import Login from "./pages/loginPage";
export const userContext = createContext();
function App() {
  const { user, setUser, handleLogout } = useCustomHook();

  return (
    <>
      <userContext.Provider value={{ user, setUser, handleLogout }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/redirect" element={<Navigate to="/login" />}></Route>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
