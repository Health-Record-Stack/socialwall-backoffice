import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import SocialwallAddBulk from './containers/SocialwallAddBulk';
import SocialwallUpdate from './containers/SocialwallUpdate';
import SocialwallAboutUs from './containers/SocialwallAboutUs';
import Home from './containers/Home';

import './App.css';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Bulk Add</Link>
          </li>
          <li>
            <Link to="/edit">Edit</Link>
          </li>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/add">
          <SocialwallAddBulk />
        </Route>
        <Route path="/Edit">
          <SocialwallUpdate />
        </Route>
        <Route path="/aboutus">
          <SocialwallAboutUs />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
