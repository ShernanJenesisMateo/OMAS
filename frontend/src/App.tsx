import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import './App.css';


// pages
import Login from "./components/login/Login";
import Seat from './components/seat/Seat';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/Seat" Component={Seat} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
