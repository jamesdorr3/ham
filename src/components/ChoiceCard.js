import React from 'react'

class ChoiceCard extends React.Component {
  
  state = {
    amount: this.props.choice.amount,
    measure: this.props.choice.measure
  }

  autoUpdateMacro = macro => {
    if (this.state.measure === 'grams'){
      return (this.props.choice.food[macro] / this.props.choice.food.serving_grams * this.state.amount).toFixed(1)
    }
    else{
      return (this.props.choice.food[macro] / (this.props.choice.food.serving_unit_amount || 1 ) * this.state.amount).toFixed(1)
    }
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
      body: JSON.stringify({choice: this.state})
    })
  }

  deleteChoice = () => {
    console.log('DELETE!')
  }

  handleChange = (e) => {
    this.setState({measure: e.target.value})
  }

  generateMeasures = () => {
    const measures = [this.props.choice.measure]
    if (!measures.includes('grams')){measures.push('grams')}
    if (this.props.choice.food.serving_unit_name && !measures.includes(this.props.choice.food.serving_unit_name)){
      measures.push(this.props.choice.food.serving_unit_name)
    }
    return measures.sort().map(measure => {
      return (
        <option value={measure}>{measure}</option>
      )
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
        <td>
          <select value={this.state.measure} onChange={this.handleChange}>
            {this.generateMeasures()}
          </select>
        </td>
        <td>{this.autoUpdateMacro('fat')}</td>
        <td>{this.autoUpdateMacro('carbs')}</td>
        <td>{this.autoUpdateMacro('protein')}</td>
        <td><button onClick={this.deleteChoice}>X</button></td>
      </tr>
    )
  }
}

export default ChoiceCard