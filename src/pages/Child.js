import React from 'react'

class Child extends React.Component{

  constructor(){
    super()
    this.state = {
     money: 100
    }
  }

  render(){    
    return (
      <div>
        <h1>Child Money: {this.props.moneyFromPapa}</h1>
        <button onClick={this.props.askMoneyFromPapa}>Ask more money from papa</button>
      </div>
    )
  }
  
}


export default Child