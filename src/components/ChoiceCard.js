import React from 'react'

class ChoiceCard extends React.Component {
  
  state = {
    amount: this.props.choice.amount
  }

  autoUpdateMacro = macro => {
    return(
      (this.props.choice.food[macro] / (this.props.choice.food.serving_unit_amount || 1 ) * this.state.amount).toFixed(1)
    )
  }

  render(){
    console.log(this.props.choice)
    return(
      <tr>
        <td>{this.props.choice.food.name}</td>
        <td>
          <input value={this.state.amount} 
          onChange={(e) => this.setState({amount: e.target.value})} 
          onBlur={() => console.log('blur!')}
          >
          </input>
          </td>
        <td>{this.props.choice.measure}</td>
        <td>{this.autoUpdateMacro('fat')}</td>
        <td>{this.autoUpdateMacro('carbs')}</td>
        <td>{this.autoUpdateMacro('protein')}</td>
      </tr>
    )
  }
}

export default ChoiceCard