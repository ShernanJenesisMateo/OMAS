import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";

//Components
import LoginPage from "./components/Login";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LoginPage} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;




