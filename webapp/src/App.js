import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'fontsource-roboto';

import './App.css';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import { HomePage, FacturasPage, GastosPage } from './pages/';
import { isUserLoggedIn } from './utils/LogIn';
import { useEffect } from 'react';
import ThemeProvider from './providers/ThemeProvider';

const UserApp = (loggedUserData) =>
  loggedUserData ? (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/mis-gastos">
          <GastosPage />
        </Route>
        <Route path="/facturas">
          <FacturasPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  ) : (
    <Router>
      <Route path="/">
        <Login />
      </Route>
    </Router>
  );

function App() {
  const [loggedUserData, setLoggedUserData] = useState(false);

  useEffect(async () => {
    if (!loggedUserData) {
      const loggedIn = await isUserLoggedIn();
      setLoggedUserData(loggedIn);
    }
  });

  return (
    <div className="App">
      <ThemeProvider>{UserApp(loggedUserData)}</ThemeProvider>
    </div>
  );
}

export default App;
