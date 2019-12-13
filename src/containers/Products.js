import React, { Component } from 'react'
import Product from '../components/Product'

class Products extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }

    this.updateProducts = this.updateProducts.bind(this)
  }

  componentDidMount() {
    const componentInstance = this
    fetch('https://super-cart.firebaseio.com/products.json')
      .then(function (streamObject) {
        return streamObject.json()
      })
      .then(function (extractedJsonFromStreamObject) {
        componentInstance.setState({ products: extractedJsonFromStreamObject })
      })
  }

  updateProducts(updatedProduct) {
    var products = this.state.products
    products[updatedProduct.id] = updatedProduct
    this.setState({
      products
    })
  }

  render() {
    return (
      <div>
        <div className="products-container">
          {
            this.state.products.map(each => {
              return <Product productInfo={each} key={each.id} updateProducts={this.updateProducts} />
            })
          }
        </div>
      </div>
    )
  }
}

export default Products