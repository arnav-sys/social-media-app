import React from 'react';
import './App.css';
import HomePage from './views/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './views/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomePage/>} path="/"/>
        <Route element={<LoginPage/>} path="/login"/>
      </Routes>
    </Router>
  );
}

export default App;
