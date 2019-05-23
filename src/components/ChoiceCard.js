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

  handleChoiceChange = (e) => {
    this.props.updateChoice({id: e.target.parentElement.parentElement.id, name: e.target.name, amount: e.target.value})
  }

  handleMeasureChange = (e) => {
    this.handleChoiceChange(e)
    const id = e.target.parentElement.parentElement.id
    const measure = e.target.value
    const amount = e.target.parentElement.parentElement.querySelector('span.amount input').value 
    const serving_unit_amount = this.props.choiceFood.food.serving_unit_amount
    const serving_grams = this.props.choiceFood.food.serving_grams
    // console.log(id, name, value, amount, serving_unit_amount, serving_grams)
    let newAmount;
    if (measure == "grams") {
      newAmount = (amount / serving_unit_amount * serving_grams)
    }else{
      newAmount = (amount / serving_grams * serving_unit_amount)
    }
    this.props.updateChoice({id: id, name: 'amount', amount: newAmount})
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
        <div 
        className='choice row highlightRow'
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        id={this.props.choiceFood.choice.id}
        >
         <span className='name'>
            {this.props.choiceFood.food.name}
          </span>
         <span className='amount'>
            <input type='number'
            className=''
            name='amount'
            value={this.props.choiceFood.choice.amount} 
            onChange={this.handleChoiceChange} 
            onBlur={this.updateInDB}
            >
            </input>
            </span>
         <span className=''>
            <select 
            className='measure'
            value={this.props.choiceFood.choice.measure} 
            onChange={this.handleMeasureChange}
            name='measure'
            >
              {this.generateMeasures()}
            </select>
          </span>
         <span className='macro calories'>{this.autoUpdateMacro('calories')}</span>
         <span className='macro fat'>{this.autoUpdateMacro('fat')}</span>
         <span className='macro carbs'>{this.autoUpdateMacro('carbs')}</span>
         <span className='macro protein'>{this.autoUpdateMacro('protein')}</span>
         <span className='deleteColumn' ><button onClick={this.deleteChoice} className='x'>X</button></span>
        </div>
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