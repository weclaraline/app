import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'fontsource-roboto';

import './App.css';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Navbar from './components/navbar/Navbar';
//import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Login></Login>
        <Logout></Logout>
      </BrowserRouter>
    </div>
  );
}

export default App;
