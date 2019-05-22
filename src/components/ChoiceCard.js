import React from 'react'
import {URL, HEADERS} from '../constants.js'
import {connect} from 'react-redux'
import {Draggable} from 'react-beautiful-dnd'

class ChoiceCard extends React.Component {
  
  componentDidMount(){
    window.addEventListener('beforeunload', e => {
      this.updateInDB()
    })
  }
  
  autoUpdateMacro = macro => {
    const choiceFood = this.props.choiceFood
    const measurement = choiceFood.choice.measure === 'grams' ? choiceFood.food.serving_grams : (choiceFood.food.serving_unit_amount || 1)
    return (this.props.choiceFood.food[macro] / measurement * this.props.choiceFood.choice.amount).toFixed()
  }

  updateInDB = () => {
    const id = this.props.choiceFood.choice.id
    fetch(`${URL}choices/${id}`, {
      method: 'PATCH',
      headers: HEADERS(),
      body: JSON.stringify({choice: this.props.choiceFood.choice})
    })
  }

  handleAmountChange = (e) => {
    // debugger
    this.props.updateChoice({id: e.target.parentElement.parentElement.id, name: e.target.name, value: e.target.value})
  }

  handleMeasureChange = (e) => {
    this.handleAmountChange(e)
    const id = e.target.parentElement.parentElement.id
    const name = e.target.name
    const value = e.target.value
    const numberPart = e.target.parentElement.parentElement.querySelectorAll('td')[1].querySelector('input')
    const amount = numberPart.value
    const serving_unit_amount = this.props.choiceFood.food.serving_unit_amount
    const serving_grams = this.props.choiceFood.food.serving_grams
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
    const measures = [this.props.choiceFood.choice.measure]
    if (this.props.choiceFood.food.serving_grams && !measures.includes('grams')){measures.push('grams')}
    if (this.props.choiceFood.food.serving_unit_name && !measures.includes(this.props.choiceFood.food.serving_unit_name)){
      measures.push(this.props.choiceFood.food.serving_unit_name)
    }
    return measures.sort().map(measure => {
      return (
        <option value={measure} key={measure}>{measure}</option>
      )
    })
  }

  deleteChoice = () => {
    const id = this.props.choiceFood.choice.id
    fetch(`${URL}/choices/${id}`, {method: 'DELETE'})
    this.props.deleteChoice(id)
  }

  render(){
    return(
      <Draggable 
        draggableId={this.props.choiceFood.choice.id} 
        index={this.props.index}
      >
        {provided => (
        <tr 
        className='choice'
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        id={this.props.choiceFood.choice.id}
        >
          <td className='name'>
            {this.props.choiceFood.food.name}
          </td>
          <td className='amount'>
            <input type='number'
            className=''
            name='amount'
            value={this.props.choiceFood.choice.amount} 
            onChange={this.handleAmountChange} 
            onBlur={this.updateInDB}
            >
            </input>
            </td>
          <td className=''>
            <select 
            className='measure'
            value={this.props.choiceFood.choice.measure} 
            onChange={this.handleMeasureChange}
            name='measure'
            >
              {this.generateMeasures()}
            </select>
          </td>
          <td className='macro calories'>{this.autoUpdateMacro('calories')}</td>
          <td className='macro fat'>{this.autoUpdateMacro('fat')}</td>
          <td className='macro carbs'>{this.autoUpdateMacro('carbs')}</td>
          <td className='macro protein'>{this.autoUpdateMacro('protein')}</td>
          <td className='deleteColumn' ><button onClick={this.deleteChoice} className='x'>X</button></td>
        </tr>
        )}
      </Draggable>
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