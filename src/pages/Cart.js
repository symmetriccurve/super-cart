import React, { Component } from 'react'
import Product from '../components/Product'
import _ from 'underscore'
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
      var oldProductsInCart = this.state.productsInCart

      /* ES6
        var newProductsInCart = oldProductsInCart.filter(function(oneSingleProduct){
          return oneSingleProduct.id !== updatedProduct.id
        })

      */

      //ES5
      // var newProductsInCart = oldProductsInCart.filter(oneSingleProduct=>{
      //   return oneSingleProduct.id !== updatedProduct.id
      // })

      /** Using a Library called underscore - a javascript utility library to  
       */

      var newProductsInCart = _.reject(
          oldProductsInCart,
          oneSingleProduct=>oneSingleProduct.id === updatedProduct.id
      )
    
      /**
       * Array has in build methods to sort,filter,push,pop items in a list, the below is what filter
       * does internally
      
        oldProductsInCart.forEach(oneSingleProduct=>{ // Go Over each Object
          if(oneSingleProduct.id !== updatedProduct.id ){ // check if each of single product match with product that is clicked
            newProductsInCart.push(oneSingleProduct) // if true, push it into newProductsInCart
          }
        })
      */

      //Finally update the State: productsInCart variable with newProductsInCart which has every product, except one which is removed
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