import React from 'react'
import {URL, HEADERS} from '../constants.js'
import {connect} from 'react-redux'
import {Draggable} from 'react-beautiful-dnd'

class ChoiceCard extends React.Component {

  state = {
    amount: this.props.choiceFood.choice.amount,
    measure: this.props.choiceFood.choice.measure
  }
  
  autoUpdateMacro = macro => {
    const amount = this.props.choiceFood.choice.amount
    const measure = this.props.choiceFood.measures.find(x => x.id === this.props.choiceFood.choice.measure_id)
    const totalGrams = amount * measure.grams
    const servingAmount = this.props.choiceFood.food.serving_grams
    const servings = totalGrams / servingAmount

    return (this.props.choiceFood.food[macro] * servings).toFixed()
  }

  updateInDB = () => {
    const id = this.props.choiceFood.choice.id
    this.props.startLoading()
    fetch(`${URL}choices/${id}`, {
      method: 'PATCH',
      headers: HEADERS(),
      body: JSON.stringify({choice: this.props.choiceFood.choice})
    })
    .then(r => this.props.stopLoading())
  }

  handleAmountChange = (e) => {
    if (e.target.value >= 0) {
      const id = this.props.choiceFood.choice.id
      this.setState({amount: e.target.value})
      this.props.editChoice({choice: {amount: e.target.value, id: id}})
    }
  }

  handleMeasureChange = (e) => {
    const fromMeasureId = this.props.choiceFood.choice.measure_id
    const fromMeasure = this.props.choiceFood.measures.find(x => x.id === fromMeasureId)
    const toMeasureId = parseInt(e.target.value)
    const toMeasure = this.props.choiceFood.measures.find(x => x.id === toMeasureId)
    const newAmount = fromMeasure.grams / toMeasure.grams * this.props.choiceFood.choice.amount 
    // debugger
    this.props.editChoice({choice: {measure_id: toMeasureId, amount: newAmount.toFixed(2), id: this.props.choiceFood.choice.id}})
  }

  generateMeasures = () => {
    const measures = this.props.choiceFood.measures

    return measures.sort((x,y) => x.name - y.name).map(measure => {
      return (
        <option value={measure.id} key={measure.id} >{measure.name}</option>
      )
    })
  }

  deleteChoice = () => {
    const id = this.props.choiceFood.choice.id
    this.props.startLoading()
    fetch(`${URL}/choices/${id}`, {method: 'DELETE'})
    .then(r => this.props.stopLoading())
    this.props.deleteChoice(id)
  }

  render(){
    // console.log(this.props.choiceFood)
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
            <span className='nameScroll'
            >
            {this.props.choiceFood.food.name}{this.props.choiceFood.food.brand ? ` - ${this.props.choiceFood.food.brand}` : null}
            </span>
          </li>
          <li className='amount'>
              <input type='number'
              className=''
              name='amount'
              value={this.props.choiceFood.choice.amount} 
              onChange={this.handleAmountChange} 
              onBlur={this.updateInDB}
              >
              </input>
              </li>
          <li className='measure'>
              <select 
              className=''
              value={this.props.choiceFood.choice.measure_id} 
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
          <li className='deleteColumn' ><button onClick={this.deleteChoice} className='deleteChoice deleteButton' alt='delete choice'><img src='trash-icon.png' className='deleteChoice deleteChoiceButton' alt='delete choice'></img></button></li>
        </ul>
        )}
      </Draggable>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    deleteChoice: id => dispatch({ type: 'DELETE_CHOICE', payload: id}),
    editChoice: info => dispatch({ type: 'EDIT_CHOICE', payload: info}),
    startLoading: () => dispatch({type: 'START_LOADING'}),
    stopLoading: () => dispatch({type: 'STOP_LOADING'})
  }
}

export default connect(null, mapDispatchToProps)(ChoiceCard)