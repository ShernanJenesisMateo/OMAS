import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import './App.css';


// pages
import Login from "./components/Login";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
