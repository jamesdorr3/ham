import React from 'react'
import '../constants.js'

class ChoiceCard extends React.Component {
  
  state = {
    amount: this.props.choice.amount,
    measure: this.props.choice.measure
  }
  
  componentDidMount(){
    window.addEventListener('beforeunload', e => {
      this.updateInDB()
    })
  }
  
  autoUpdateMacro = macro => {
    if (this.state.measure === 'grams'){
      return (this.props.choice.food[macro] / this.props.choice.food.serving_grams * this.state.amount).toFixed(1)
    }
    else{
      return (this.props.choice.food[macro] / (this.props.choice.food.serving_unit_amount || 1 ) * this.state.amount).toFixed(1)
    }
  }

  updateInDB = () => {
    if (this.props.choice.amount !== this.state.amount || this.props.choice.measure !== this.state.measure) {
      const id = this.props.choice.id
      fetch(`${URL}choices/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({choice: this.state})
      })
    }
  }

  handleChange = (e) => {
    this.setState({measure: e.target.value})
  }

  generateMeasures = () => {
    const measures = [this.props.choice.measure]
    if (this.props.choice.food.serving_grams && !measures.includes('grams')){measures.push('grams')}
    if (this.props.choice.food.serving_unit_name && !measures.includes(this.props.choice.food.serving_unit_name)){
      measures.push(this.props.choice.food.serving_unit_name)
    }
    return measures.sort().map(measure => {
      return (
        <option value={measure} key={measure}>{measure}</option>
      )
    })
  }

  render(){
    console.log(this.props.choice)
    return(
      <tr 
      // draggable='true'
      // onDrag={(e) => console.log('drag!', this.props.choice)}
      // onDrop={(e) => console.log('drop!', this.props.choice)}
      // onDragOver={(e) => console.log('over!', this.props.choice)}
      >
        <td>{this.props.choice.food.name}</td>
        <td>
          <input type='number'
          value={this.state.amount} 
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
        <td className='calories'>{this.autoUpdateMacro('calories')}</td>
        <td className='fat'>{this.autoUpdateMacro('fat')}</td>
        <td className='carbs'>{this.autoUpdateMacro('carbs')}</td>
        <td className='protein'>{this.autoUpdateMacro('protein')}</td>
        <td><button onClick={() => {this.props.deleteChoice(this.props.choice.id)}}>X</button></td>
      </tr>
    )
  }
}

export default ChoiceCard