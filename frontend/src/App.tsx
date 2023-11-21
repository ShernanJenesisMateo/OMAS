import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import './App.css';


// pages
import Login from "./components/login/Login";
import Area from "./components/AreaCanvas/Area"
import Calendar from './components/calendar/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/area" Component={Area} />
        <Route path="/calendar" Component={Calendar} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
