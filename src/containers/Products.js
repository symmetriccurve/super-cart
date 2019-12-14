import React, { Component } from "react";
import Product from "../components/Product";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      allProducts: []
    };

    this.updateProductWithId_original = this.updateProductWithId_original.bind(this);
  }

  componentDidMount() {
    const componentInstance = this;
    fetch("https://super-cart.firebaseio.com/products.json")
      .then(function(streamObject) {
        return streamObject.json();
      })
      .then(function(extractedJsonFromStreamObject) {
        componentInstance.setState({ allProducts: extractedJsonFromStreamObject });
      });
  }

  updateProductWithId_original(updatedProductFromChild) {
    var updatedProducts = this.state.allProducts;
    updatedProducts[updatedProductFromChild.id] = updatedProductFromChild;

    this.setState({
      allProducts: updatedProducts
    });
  }

  render() {
    const ProductViews = [];

    /* Using ES5 Syntax

    this.state.products.forEach(function(product){
      ProductViews.push(<Product productInfo={product} key={product.id} updateProductWithId_reference={this.updateProductWithId} />)
    }.bind(this))
    
    */

    /* Using ES6 Syntax - Arrow functions
      Notice how we got rid of function, return, bind(this) keywords
    */
   
    this.state.allProducts.forEach(oneSingleProduct=>{
        ProductViews.push(
          <Product
            productInfo_copy={oneSingleProduct}
            key={oneSingleProduct.id}
            updateProductWithId_reference={this.updateProductWithId_original}
          />
        );
      }
    );

    return <div className="products-container card">{ProductViews}</div>;
  }
}

export default Products;
