import React, { Component } from 'react'
import Product from '../components/Product'
//import _ from 'lodash'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      productsInCart: []
    }

    this.updateProductWithId_original = this.updateProductWithId_original.bind(this)
  }

    componentDidMount(){
      const componentInstance = this
      fetch('https://super-cart.firebaseio.com/products.json')
      .then(function(streamObject){
        return streamObject.json()
      })
      .then(function(allProducts){ 
        const cartProducts = allProducts.filter(oneSingleProduct=> oneSingleProduct.isInCart)
        componentInstance.setState({ productsInCart: cartProducts })
      })
    }

    updateProductWithId_original(updatedProduct) {
      var oldProductsInCart= this.state.productsInCart
      var newProductsInCart = []
      //create a bug here
      oldProductsInCart.forEach(oneSingleProduct=>{
        if(oneSingleProduct.id !== updatedProduct.id ){
          newProductsInCart.push(oneSingleProduct)
        }
      })
      this.setState({
        productsInCart: newProductsInCart
      })
    }

    render() {
      return (
          <div className="cart card">
            {
              this.state.productsInCart.map(oneSingleProduct=>{
                return <Product productInfo_copy={oneSingleProduct} key={oneSingleProduct.id} updateProductWithId_reference={this.updateProductWithId_original} />
              })
            }
          </div>
      )
    }
  }

export default Cart