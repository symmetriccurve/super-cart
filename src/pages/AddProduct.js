import React, { Component } from "react";
//posible bootstrap here
class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productPrice: "",
      productImageURL: "",
      category: "",
      isAdded: false
    };
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleProductNameChange = this.handleProductNameChange.bind(this);
    this.handleProductImageURLChange = this.handleProductImageURLChange.bind(
      this
    );
    this.handleProductPriceChange = this.handleProductPriceChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleProductNameChange(event) {
    this.setState({
      productName: event.target.value
    });
  }

  handleProductImageURLChange(event) {
    this.setState({
      productImageURL: event.target.value
    });
  }

  handleProductPriceChange(event) {
    this.setState({
      productPrice: event.target.value
    });
  }

  handleCategoryChange(event) {
    this.setState({
      category: event.target.value
    });
  }

  handleAddProduct() {
    fetch("https://super-cart.firebaseio.com/products.json?shallow=true")
      .then(res => res.json())
      .then(resJson => {
        const productCount = Object.keys(resJson).length;
        fetch(
          `https://super-cart.firebaseio.com/products/${productCount}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              category: this.state.category,
              id: productCount,
              image: this.state.productImageURL, //"https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/walnuts.jpg",
              name: this.state.productName,
              price: this.state.productPrice
            })
          }
        )
          .then(res => res.json())
          .then(resJson => {
            this.setState({
              isAdded: true
            });
          });
      });
  }

  render() {
    const {
      productName,
      productPrice,
      productImageURL,
      category,
      isAdded
    } = this.state;
    //Destructuring
    return (
      <div className="add-product card">
        {isAdded ? (
          <h1> Added Successfully </h1>
        ) : (
          <div className="add-product__form">
            <span className="add-product__label">Product name: </span>
            <input
              value={productName}
              onChange={this.handleProductNameChange}
              className="add-product__input"
            />
            <br />
            <span className="add-product__label">Product Price: </span>
            <input
              value={productPrice}
              onChange={this.handleProductPriceChange}
              className="add-product__input"
            />
            <br />
            <span className="add-product__label">Product Image: </span>
            <input
              value={productImageURL}
              onChange={this.handleProductImageURLChange}
              className="add-product__input"
            />
            <span className="add-product__label">Category: </span>
            <input
              value={category}
              onChange={this.handleCategoryChange}
              className="add-product__input"
            />
            <button
              className="add-product__button"
              onClick={this.handleAddProduct}
            >
              Add
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default AddProduct;
