import React from 'react'
import Child from './Child'


class Parent extends React.Component{

  constructor(){
    super()
    this.state = {
      papaMoney: 100,
      moneyForChild: 0
    }
    this.giveMoreMoneyToChild = this.giveMoreMoneyToChild.bind(this)
  }

  giveMoreMoneyToChild(){
    this.setState({
      moneyForChild: this.state.moneyForChild + 10,
      papaMoney: this.state.papaMoney - 10
    })
  }

  render(){    
    return (
      <div>
        <h1>Papa Money: {this.state.papaMoney}</h1>
        <Child moneyFromPapa={this.state.moneyForChild} askMoneyFromPapa={this.giveMoreMoneyToChild}/>
      </div>
    )
  }

}


export default Parent