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
import ProfilePage from './views/ProfilePage';
import UpdatePage from './views/UpdatePage';
import UserPage from './views/UserPage';
import FriendPage from './views/FriendPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomePage/>} path="/"/>
        <Route element={<LoginPage/>} path="/login"/>
        <Route element={<BrowsePage/>} path="/browse"/>
        <Route element={<RegisterPage/>} path="/register"/>
        <Route element={<ProfilePage/>} path="/profile"/>
        <Route element={<UpdatePage/>} path="/update-profile"/>
        <Route element={<UserPage/>} path="/user/:name"/>
        <Route element={<FriendPage/>} path="/friends"/>
      </Routes>
    </Router>
  );
}

export default App;
