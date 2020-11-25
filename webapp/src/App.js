import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'fontsource-roboto';

import './App.css';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import { HomePage, FacturasPage, GastosPage } from './pages/';
import { isUserLoggedIn } from './utils/LogIn';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

const UserApp = (proceed) =>
  proceed ? (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/mis-gastos">
          <GastosPage />
        </Route>
        <Route path="/facturas">
          <FacturasPage />
        </Route>
        <Route path="/home">
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
  const [isLoading, setLoading] = useState(true);
  const [proceed, setProceed] = useState();

  useEffect(async () => {
    if (!proceed) {
      const loggedIn = await isUserLoggedIn();
      if (loggedIn) {
        setProceed(true);
      } else {
        setProceed(false);
      }
    }
    setLoading(false);
  });

  return (
    <div className="App">
      {isLoading ? (
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={40}
          thickness={4}
        />
      ) : (
        UserApp(proceed)
      )}
    </div>
  );
}

export default App;
