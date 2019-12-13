import React, { Component } from 'react'
import Product from '../components/Product'
//import _ from 'lodash'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }

    this.updateProducts = this.updateProducts.bind(this)
  }

    componentDidMount(){
      const componentInstance = this
      fetch('https://super-cart.firebaseio.com/products.json')
      .then(function(streamObject){
        return streamObject.json()
      })
      .then(function(products){ 
        const cartProducts = products.filter( product=> product.isInCart)
        componentInstance.setState({ products: cartProducts })
      })
    }

    updateProducts(updatedProduct) {
      var oldCart = this.state.products
      var newCart = []
      //create a bug here
      oldCart.map(product=>{
        if(product.id !== updatedProduct.id ){
          newCart.push(product)
        }
      })
      this.setState({
        products: newCart
      })
    }

    render() {
      return (
        <div>
          <div className="cart">
            {
              this.state.products.map(each=>{
                return <Product productInfo={each} key={each.id} updateProducts={this.updateProducts} />
              })
            }
          </div>
        </div>
      )
    }
  }

export default Cart