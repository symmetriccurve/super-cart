import React, { Component, useEffect, useState } from 'react'
import { withRouter } from "react-router";

const ProductDetail = function(props) {

    const [productDetails, setProductDetails] = useState({})

    useEffect(()=>{
      const productId = props.history.location.search.slice(4)
      fetch(`https://super-cart.firebaseio.com/products/${productId}.json`)
      .then(res=>res.json())
      .then(resJson=>{
        setProductDetails(resJson)
      })
    })

    return(
      <div className='product-detail card'>
        <img src={productDetails.image} className='product-detail__image'/>
        <div className='product-detail__details'>
          <h1 className='details__label' >Category: {productDetails.category}</h1>
          <h1 className='details__label'>Name: {productDetails.name}</h1>
          <h1 className='details__label'>Id: {productDetails.id}</h1>
        </div>
      </div>
    )
}

/* ES6 Class component

class ProductDetail extends Component{
  render(){
    return(
      <div>
        This is Product Detail Page
      </div>
    )
  }
}
*/

// var ProductDetail = React.createClass({
//   render: function(){
//     return(
//       <div>
//         This is Product Detail Page
//       </div>
//     )
//   }
// })

export default withRouter(ProductDetail)

