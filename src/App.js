import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SocialwallAddBulk from './containers/SocialwallAddBulk';
import SocialwallUpdate from './containers/SocialwallUpdate';
import SocialwallAboutUs from './containers/SocialwallAboutUs';
import Home from './containers/Home';

import './App.css';
import Header from './components/header';

function App() {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row flex-xl-nowrap">
          <div className="col-12 col-md-3 col-xl-2 bd-sidebar">
            <p>--Left Content--</p>
          </div>
          <div className="d-none d-xl-block col-xl-2 bd-toc">
            --Right Content--
          </div>
          <main className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
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
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
