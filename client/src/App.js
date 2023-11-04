import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from './vistas/Landing/Welcome';
import Home from './vistas/Home/Home';
import Detail from './vistas/Detail/Detail';
import CreateDog from './vistas/CrearDog/CreateDog';
import * as stylo from './App.css';
import CrearDemo from "./vistas/CrearDog/CrearDemo"

const App = () => {
  return (
    
    <Router>
      <Switch>
        {/* Landing Page */}
        <Route exact path="/" component={Welcome} />

        {/* Home Page */}
        <Route exact path="/home" component={Home} />

        {/* Detail Page */}
        <Route path="/detail/:id" component={Detail} />

        {/* Form Page */}
        <Route path="/form" component={CreateDog} />
      </Switch>
    </Router>
  );
};

export default App;
