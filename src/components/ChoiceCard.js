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

  componentDidMount(){
    window.addEventListener('beforeunload', e => {
      this.updateInDB()
    })
  }

  updateInDB = () => {
    const id = this.props.choice.id
    fetch(`http://localhost:3001/choices/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({choice: {amount: this.state.amount}})
    })
  }

  render(){
    console.log(this.props.choice)
    return(
      <tr>
        <td>{this.props.choice.food.name}</td>
        <td>
          <input value={this.state.amount} 
          onChange={(e) => this.setState({amount: e.target.value})} 
          onBlur={this.updateInDB}
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