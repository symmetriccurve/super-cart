import React from 'react';
import Products  from './Products'
import AddProduct  from '../pages/AddProduct'
import Cart from '../pages/Cart';
import ProductDetail from '../pages/ProductDetail';
import Header from '../components/Header';
import ResetDataBase from '../pages/ResetDataBase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Route exact path="/" component={Products}/>
        <Route path="/" component={Header}/>
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/add" component={AddProduct}/>
        <Route exact path="/product-detail" component={ProductDetail}/>
        <Route exact path="/reset" component={ResetDataBase}/>
    </Router>
  );
}

export default App;
