import React from 'react';
import Login from './login/Login'
import SignUp from './signup/SignUp'
import Product from './product/Product'
import Header from './header/Header';
import Dashboard from "./dashboard/Dashboard";
import AddEditProduct from './product/AddEditProduct'
import { Switch, Route } from 'react-router-dom'
import Footer from './footer/footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div >
      <Header />
      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route path='/signup' component={SignUp}></Route>
        <Route path='/product' component={Product}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
        <Route path='/addeditproduct' component={AddEditProduct}></Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
