import React from 'react'
import {URL, HEADERS} from '../constants.js'
import {connect} from 'react-redux'
import {Draggable} from 'react-beautiful-dnd'

class ChoiceCard extends React.Component {

  state = {
    amount: this.props.choiceFood.choice.amount,
    measure: this.props.choiceFood.choice.measure
  }
  
  componentDidMount(){
    window.addEventListener('beforeunload', e => {
      this.updateInDB()
    })
  }
  
  autoUpdateMacro = macro => {
    const choiceFood = this.props.choiceFood
    const measurement = this.state.measure === 'grams' ? choiceFood.food.serving_grams : (choiceFood.food.serving_unit_amount || 1)
    return (this.props.choiceFood.food[macro] / measurement * this.state.amount).toFixed()
  }

  updateInDB = () => {
    const id = this.props.choiceFood.choice.id
    fetch(`${URL}choices/${id}`, {
      method: 'PATCH',
      headers: HEADERS(),
      body: JSON.stringify({choice: {...this.props.choiceFood.choice, ...this.state}})
    })
  }

  handleAmountChange = (e) => {
    if (e.target.value >= 0) {
      const id = this.props.choiceFood.choice.id
      this.setState({amount: e.target.value})
      this.props.editChoice({id: id, choice: {amount: e.target.value}})
    }
  }

  handleMeasureChange = (e) => {
    const id = this.props.choiceFood.choice.id
    const measure = e.target.value
    const amount = this.state.amount
    const serving_unit_amount = this.props.choiceFood.food.serving_unit_amount
    const serving_grams = this.props.choiceFood.food.serving_grams
    // console.log(id, name, value, amount, serving_unit_amount, serving_grams)
    let newAmount;
    if (measure == "grams") {
      newAmount = (amount / serving_unit_amount * serving_grams)
    }else{
      newAmount = (amount / serving_grams * serving_unit_amount)
    }
    this.setState({measure: measure, amount: newAmount})
    this.props.editChoice({id: id, choice: {measure: measure, amount: newAmount}})
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
        <ul 
        className='choice grid'
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        id={this.props.choiceFood.choice.id}
        >
          <li className='name'>
              {this.props.choiceFood.food.name}
            </li>
          <li className='amount'>
              <input type='number'
              className=''
              name='amount'
              value={this.state.amount} 
              onChange={this.handleAmountChange} 
              onBlur={this.updateInDB}
              >
              </input>
              </li>
          <li className='measure'>
              <select 
              className=''
              value={this.state.measure} 
              onChange={this.handleMeasureChange}
              name='measure'
              >
                {this.generateMeasures()}
              </select>
            </li>
          <li className='macro calories'>{this.autoUpdateMacro('calories')}</li>
          <li className='macro fat'>{this.autoUpdateMacro('fat')}</li>
          <li className='macro carbs'>{this.autoUpdateMacro('carbs')}</li>
          <li className='macro protein'>{this.autoUpdateMacro('protein')}</li>
          <li className='deleteColumn' ><button onClick={this.deleteChoice} className='x'>X</button></li>
        </ul>
        )}
      </Draggable>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteChoice: id => dispatch({ type: 'DELETE_CHOICE', payload: id}),
    editChoice: info => dispatch({ type: 'EDIT_CHOICE', payload: info})
  }
}

export default connect(null, mapDispatchToProps)(ChoiceCard)