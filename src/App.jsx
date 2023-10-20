import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import React, { createContext, useEffect } from "react";
import { useCustomHook } from "./hooks/customHooks";
import Login from "./pages/loginPage";
export const userContext = createContext();
function App() {
  const { user, setUser } = useCustomHook();

  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <MainPage /> : <Navigate to="/login " />}
            ></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
