import React from 'react';
import './App.css';
import HomePage from './views/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './views/LoginPage';
import BrowsePage from './views/BrowsePage';
import RegisterPage from './views/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomePage/>} path="/"/>
        <Route element={<LoginPage/>} path="/login"/>
        <Route element={<BrowsePage/>} path="/browse"/>
        <Route element={<RegisterPage/>} path="/register"/>
      </Routes>
    </Router>
  );
}

export default App;
