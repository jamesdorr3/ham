import React from 'react'
import {URL, HEADERS} from '../constants.js'
import {connect} from 'react-redux'

class ChoiceCard extends React.Component {
  
  // state = {
  //   amount: this.props.choice.amount,
  //   measure: this.props.choice.measure
  // }
  
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
      headers: HEADERS(),
      body: JSON.stringify({choice: this.props.choice})
    })
  }

  handleAmountChange = (e) => {
    this.props.updateChoice({id: e.target.parentElement.parentElement.id, name: e.target.name, value: e.target.value})
  }

  handleMeasureChange = (e) => {
    this.handleAmountChange(e)
    const id = e.target.parentElement.parentElement.id
    const name = e.target.name
    const value = e.target.value
    const numberPart = e.target.parentElement.parentElement.querySelectorAll('td')[1].querySelector('input')
    const amount = numberPart.value
    const serving_unit_amount = this.props.choice.food.serving_unit_amount
    const serving_grams = this.props.choice.food.serving_grams
    console.log(id, name, value, amount, serving_unit_amount, serving_grams)
    let newAmount;
    if (value === 'grams') {
      newAmount = (amount / serving_unit_amount * serving_grams)
    }else{
      newAmount = (amount / serving_grams * serving_unit_amount)
    }
    this.props.updateChoice({id: id, name: 'amount', value: newAmount})
    // this.props.updateChoice({id: e.target.parentElement.parentElement.id, measure: e.target.name, value: e.target.value})
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
          onChange={this.handleAmountChange} 
          onBlur={this.updateInDB}
          >
          </input>
          </td>
        <td>
          <select 
          value={this.props.choice.measure} 
          onChange={this.handleMeasureChange}
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