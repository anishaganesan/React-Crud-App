import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import AllUsers from './Components/AllUsers';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';
import Login from './Components/Login';
import Home from './Components/Home';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
<Route path="/" component={Login} exact />
      
      <Switch>
        <Route path="/home" component= {Home} exact />
        <Route path="/all" component= {AllUsers} exact />
        <Route path="/add" component={AddUser} exact />
        <Route path="/edit/:id" component={EditUser} exact />

      </Switch>
      
    </Router>
  );
}

export default App;
