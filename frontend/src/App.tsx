import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import './App.css';


// pages
import Login from "./components/Login";
import Area from "./components/AreaCanvas/Area"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/area" Component={Area} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
