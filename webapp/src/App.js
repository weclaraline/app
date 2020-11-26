import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'fontsource-roboto';

import './App.css';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import { HomePage, FacturasPage, GastosPage } from './pages/';
import { isUserLoggedIn } from './utils/LogIn';
import { useEffect } from 'react';

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
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  ) : (
    <Router>
      <Route path="/">
        <Login/>
      </Route>
    </Router>
  );

function App() {
  const [proceed, setProceed] = useState(false);

  useEffect(async () => {
    if (!proceed) {
      const loggedIn = await isUserLoggedIn();
      setProceed(loggedIn);
    }
  });

  return (
    <div className="App">
      { UserApp(proceed) }
    </div>
  );
}

export default App;
