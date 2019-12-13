import React, { Component } from 'react'
import { withRouter } from "react-router";

class Product extends React.Component {

  constructor(){
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    this.handleViewProductDetails = this.handleViewProductDetails.bind(this)
  }

  handleAddToCart() {
    fetch(`https://super-cart.firebaseio.com/products/${this.props.productInfo.id}.json`, {
      method: 'PUT',
      body: JSON.stringify({ ...this.props.productInfo, isInCart: true })
    })
    .then(res=>{
      this.props.updateProducts({ ...this.props.productInfo, isInCart: true })
    })
  }

  handleRemoveFromCart() {
    fetch(`https://super-cart.firebaseio.com/products/${this.props.productInfo.id}.json`, {
      method: 'PUT',
      body: JSON.stringify({ ...this.props.productInfo, isInCart: false })
    })
    .then(res=>{
      this.props.updateProducts({ ...this.props.productInfo, isInCart: false })
    })
  }

  handleViewProductDetails() {
    this.props.history.push(`/product-detail?id=${this.props.productInfo.id}`)
  }


  render() {
    const productInfo = this.props.productInfo
    const id = productInfo.id
    const price = productInfo.price
    const name = productInfo.name
    const image = productInfo.image
    const isInCart = productInfo.isInCart

    return (
      <div className="product-card">
        <h2 className="product-card__name">{name}</h2>
        <h3 className="product-card__price">Rs.{price}</h3>
        <img className="product-card__image" alt="example" src={image} />
        <button
          className="product-card__button--view"
          onClick={this.handleViewProductDetails}>
            View
        </button>
        {
          isInCart ?
            <button
              className="product-card__button--remove"
              onClick={this.handleRemoveFromCart}>
              Remove
          </button> :
            <button
              className="product-card__button--add"
              onClick={this.handleAddToCart}>
              Add
          </button>
        }
      </div>
    )
  }
}

export default withRouter(Product)

