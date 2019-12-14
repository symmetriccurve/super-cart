import React, { Component } from 'react'
import { withRouter } from "react-router";

class Product extends React.Component {

  constructor(){
    super()

    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    this.handleGotoDetailPage = this.handleGotoDetailPage.bind(this)
    
  }

  handleAddToCart() {
    const component = this
    const updatedProductInfo = this.props.productInfo_copy
    // Change the flag from false to true and post the updated product to database
    updatedProductInfo.isInCart = true

    const productInfoCopyInString = JSON.stringify(updatedProductInfo)
    const URLToPost = `https://super-cart.firebaseio.com/products/${this.props.productInfo_copy.id}.json`

    fetch(URLToPost, {
      method: 'PUT',
      body: productInfoCopyInString
      //or using ES6 Spread operator: body: JSON.stringify({ ...this.props.productInfo_copy, isInCart: true })
    })
    .then(function(responseFromAPI){

      if(responseFromAPI.status === 200){
        component.props.updateProductWithId_reference(updatedProductInfo)
      }else{
        throw Error("Adding to cart failed")
      }

    })
    .catch(function(error){
      console.log("Error adding to the Cart",error)
      alert(error)
    })
  }

  handleRemoveFromCart() {
    fetch(`https://super-cart.firebaseio.com/products/${this.props.productInfo_copy.id}.json`, {
      method: 'PUT',
      body: JSON.stringify({ ...this.props.productInfo_copy, isInCart: false })
       //or using ES6 Spread operator: body: JSON.stringify({ ...this.props.productInfo_copy, isInCart: false })
    })
    .then(res=>{
      this.props.updateProductWithId_reference({ ...this.props.productInfo_copy, isInCart: false })
    })
    .catch(error=>{
      console.log("Error removing from the Cart",error)
      alert(error)
    })
  }

  handleGotoDetailPage() {
    this.props.history.push(`/product-detail?id=${this.props.productInfo_copy.id}`)
  }


  render() {

    const price = this.props.productInfo_copy.price
    const name = this.props.productInfo_copy.name
    const image = this.props.productInfo_copy.image

    return (
      <div className="product card">
        <h2 className="product-card__name">{name}</h2>
        <h3 className="product-card__price">Rs.{price}</h3>
        <img className="product-card__image" alt="example" src={image} />
        <button
          className="product-card__button--view"
          onClick={this.handleGotoDetailPage}>
            View
        </button>
        { this.renderButton() }
      </div>
    )
  }

  renderButton(){
    let buttonToRender = null
    const isInCart = this.props.productInfo_copy.isInCart

    if(isInCart === true){
      buttonToRender = <button
          className="product-card__button--remove"
          onClick={this.handleRemoveFromCart}>
          Remove
      </button>
    }else {
      buttonToRender = <button
        className="product-card__button--add"
        onClick={this.handleAddToCart}>
        Add
    </button>
    }

    return buttonToRender
  }

}

export default withRouter(Product)

