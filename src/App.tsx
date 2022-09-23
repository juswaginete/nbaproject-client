import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import TopNavBar from './components/AppBar/AppBar';
import Home from './pages/Home/Home';
import TeamDetails from './pages/TeamDetails/TeamDetails';

const App: FC = () => {
  const navbarItems = [
    {
      name: "Home",
      link: "/home"
    }
  ]

  return (
    <Router forceRefresh={true}>
      <div className="App">
        <TopNavBar navItems={navbarItems} />
        <ToastContainer />
        <Switch>
          <Route path="/" exact>
            <div>
              <h1>default page</h1>
            </div>
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/team/:teamId">
            <TeamDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
