import React, { useState, useEffect, createContext } from "react";
import GlobalStyle from "./constants/global";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ComparePage } from "./pages/ComparePage/ComparePage";
import { LearnPage } from "./pages/LearnPage/LearnPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";

type isLoggedIn = boolean;
type userName = string;
type UserContextType = string | null;

export const UserContext = createContext<UserContextType>(null);

export const App: React.FC = (): React.ReactElement => {
  const [loggedIn, setLoggedIn] = useState<isLoggedIn>(false);
  const [username, setUsername] = useState<userName>("");

  const clearState = () => {
    setLoggedIn(false);
    setUsername("");
    localStorage.clear();
  };

  useEffect(() => {
    const retrievedUsername = localStorage.getItem("username");
    const retrievedLoggedIn = localStorage.getItem("loggedIn");
    if (retrievedUsername && retrievedLoggedIn) {
      const foundUsername = retrievedUsername;
      const foundLoggedIn = retrievedLoggedIn == "true" ? true : false;
      setLoggedIn(foundLoggedIn);
      setUsername(foundUsername);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        {loggedIn ? (
          <UserContext.Provider value={username}>
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/home" element={<HomePage logout={clearState} />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/learn" element={<LearnPage />} />
            </Routes>
          </UserContext.Provider>
        ) : (
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/"
              element={
                <LoginPage
                  updateLoggedIn={setLoggedIn}
                  updateUsername={setUsername}
                />
              }
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        )}
      </Router>
    </>
  );
};
