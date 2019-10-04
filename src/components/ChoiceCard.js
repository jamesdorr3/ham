import React from 'react'
import {connect} from 'react-redux'
import {Draggable} from 'react-beautiful-dnd'
import {updateChoice, destroyChoice} from '../actions/choicesActions'

class ChoiceCard extends React.Component {

  state = {
    className: 'choice grid'
  }

  componentDidMount(){
    this.setState({className: 'grid toExpand'})
    setTimeout(() => {
      this.setState({className: 'choice grid'})
    }, 500)
  }
  
  autoUpdateMacro = macro => {
    const amount = this.props.choiceFood.choice.amount
    const measure = this.props.choiceFood.measures.find(x => x.id === this.props.choiceFood.choice.measure_id)
    const totalGrams = amount * measure.grams
    const servingAmount = this.props.choiceFood.food.serving_grams
    const measureAmount = measure.amount? measure.amount : 1
    const servings = (totalGrams / servingAmount) / measureAmount

    return (this.props.choiceFood.food[macro] * servings).toFixed()
  }

  updateInDB = (payload = null) => {
    this.props.updateChoice({...this.props.choiceFood.choice, ...payload})
  }

  handleAmountChange = (e) => {
    if (e.target.value >= 0) {
      const id = this.props.choiceFood.choice.id
      const amount = e.target.value
      const payload = {id: id, amount: amount}
      this.props.editChoice({choice: payload})
    }
  }

  handleMeasureChange = (e) => {
    // const fromMeasureId = this.props.choiceFood.choice.measure_id
    // const fromMeasure = this.props.choiceFood.measures.find(x => x.id === fromMeasureId)
    // const toMeasureId = parseInt(e.target.value)
    // const toMeasure = this.props.choiceFood.measures.find(x => x.id === toMeasureId)
    // let newAmount = (fromMeasure.grams / toMeasure.grams * this.props.choiceFood.choice.amount) * ((toMeasure.amount || 1) / (fromMeasure.amount || 1))
    // if (!/^gram(s)?$/i.test(toMeasure.name)){newAmount = newAmount.toFixed(2)}
    // else{newAmount = newAmount.toFixed()}
    // // debugger
    // this.props.editChoice({choice: {measure_id: toMeasureId, amount: newAmount, id: this.props.choiceFood.choice.id}})
    const measure_id = parseInt(e.target.value)
    const id = this.props.choiceFood.choice.id
    const payload = {measure_id: measure_id, id: id}
    this.props.editChoice({choice: payload})
    this.updateInDB(payload)
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
    // debugger
    this.setState({className: 'grid shrunk'})
    setTimeout(() => {
      const id = this.props.choiceFood.choice.id
      this.props.deleteChoice(id)
      this.props.destroyChoice(id)
    }, 500)
  }

  handleFocus = () => {
    window.addEventListener('beforeunload', this.updateInDB)
  }

  handleBlur = () => {
    window.removeEventListener('beforeunload', this.updateInDB)
    this.updateInDB()
  }

  render(){
    return(
      <Draggable 
        draggableId={this.props.choiceFood.choice.id} 
        index={this.props.index}
      >
        {provided => (
        <ul 
        className={this.state.className}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        id={this.props.choiceFood.choice.id}
        >
          <li className='name'>
            <span className='nameScroll'
            >
            ↕ {this.props.choiceFood.food.name}{this.props.choiceFood.food.brand ? ` - ${this.props.choiceFood.food.brand}` : null}
            </span>
          </li>
          <li className='amount'>
              <input type='number'
              ref={(input) => { this.amountInput = input; }} 
              min='0'
              name='amount'
              value={this.props.choiceFood.choice.amount} 
              id={this.props.choiceFood.choice.id}
              key={this.props.choiceFood.choice.id}
              onChange={this.handleAmountChange} 
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
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
          <li className='deleteColumn' ><button onClick={this.deleteChoice} className='deleteChoice deleteButton' alt='delete choice'><span className="icon deleteIcon"/></button></li>
        </ul>
        
        )}
      </Draggable>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteChoice: id => dispatch({ type: 'DELETE_CHOICE', payload: id}),
    editChoice: info => dispatch({ type: 'EDIT_CHOICE', payload: info}),
    updateChoice: info => dispatch(updateChoice(info)),
    destroyChoice: info => dispatch(destroyChoice(info)),
  }
}

export default connect(null, mapDispatchToProps)(ChoiceCard)