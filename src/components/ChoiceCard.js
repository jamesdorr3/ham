import React from 'react'
import '../constants.js'
import {connect} from 'react-redux'

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
    const choice = this.props.choice
    const measurement = choice.measure === 'grams' ? choice.food.serving_grams : (choice.food.serving_unit_amount || 1)
    return (this.props.choice.food[macro] / measurement * this.props.choice.amount).toFixed()
  }

  updateInDB = () => {
    const id = this.props.choice.id
    fetch(`${URL}choices/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({choice: this.props.choice})
    })
  }

  handleChange = (e) => {
    this.props.updateChoice({id: e.target.parentElement.parentElement.id, measure: e.target.name, value: e.target.value})
    // console.log(e.target.parentElement.parentElement.id, e.target.name, e.target.value)
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
    console.log('choice', this.props.choice)
    return(
      <tr 
      id={this.props.choice.id}
      // draggable='true'
      // onDrag={(e) => console.log('drag!', this.props.choice)}
      // onDrop={(e) => console.log('drop!', this.props.choice)}
      // onDragOver={(e) => console.log('over!', this.props.choice)}
      >
        <td>{this.props.choice.food.name}</td>
        <td>
          <input type='number'
          name='amount'
          value={this.props.choice.amount} 
          onChange={this.handleChange} 
          onBlur={this.updateInDB}
          >
          </input>
          </td>
        <td>
          <select 
          value={this.props.choice.measure} 
          onChange={this.handleChange}
          name='measure'
          >
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

const mapDispatchToProps = dispatch => {
  return {
    deleteChoice: id => dispatch({ type: 'DELETE_CHOICE', payload: id}),
    updateChoice: idAndAttr => dispatch({ type: 'UPDATE_CHOICE', payload: idAndAttr})
  }
}

export default connect(null, mapDispatchToProps)(ChoiceCard)