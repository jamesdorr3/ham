import React from 'react'
import ChoiceCard from '../components/ChoiceCard'
import {URL, HEADERS} from '../constants.js'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'
import CategoryCard from '../components/CategoryCard'
import GoalsRow from '../components/GoalsRow'
import {updateGoal} from '../actions/goalsActions'
import {createGoal} from '../actions/goalsActions'
import {saveAll} from '../actions/saveAllAction'
import {deleteGoal} from '../actions/goalsActions'

class ChoiceContainer extends React.Component {

  componentDidMount(){
    window.addEventListener('beforeunload', e => {
      this.props.saveAll(this.props)
    })
    document.addEventListener('keydown', e => {
      if (e.metaKey && e.code === 'KeyS') {
        e.preventDefault()
        this.props.saveAll(this.props)
      }
    })
  }

  autoSum = (macro) => {
    let sum = 0
    this.props.choiceFoods.forEach(choiceFood => {
      // console.log(choiceFood)
      // const measurement = ((choiceFood.choice.measure === 'grams') ? choiceFood.food.serving_grams : (choiceFood.food.serving_unit_amount || 1))
      // sum += parseInt((choiceFood.food[macro] / measurement * choiceFood.choice.amount).toFixed(0))
      const amount = choiceFood.choice.amount
      const measure = choiceFood.measures.find(x => x.id === choiceFood.choice.measure_id)
      const totalGrams = amount * measure.grams
      const servingAmount = choiceFood.food.serving_grams
      const measureAmount = measure.amount? measure.amount : 1
      const servings = (totalGrams / servingAmount) / measureAmount
      // console.log(sum)
      sum += parseInt(choiceFood.food[macro] * servings)
    })
    return sum.toFixed()
  }

  keyRow = 
    <ul className='grid key'>
      <li className='name'><div>Name</div></li>
      <li className='amount'><div>Amount</div></li>
      <li className='measure' ><div>Measure</div></li>
      <li className='macro calories' ><div>Calories</div></li>
      <li className='macro fat' ><div>Fat</div></li>
      <li className='macro carbs' ><div>Carbs</div></li>
      <li className='macro protein' ><div>Protein</div></li>
      <li className='deleteColumn'></li>
    </ul>
  
  compareForStyle = (macro) =>{
    // debugger
    if (!this.props.user.email){return null}
    if (this.autoSum(macro) < this.props.goal[macro] - 5) {
      return 'under'
    }else if(this.autoSum(macro) > this.props.goal[macro] + 5) {
      return 'over'
    }else{return 'good'}
  }

  totalsRow = () => {
    return  <ul className='grid totalsRow'>
      <li className='totals'><span>TOTALS:</span></li>
      <li className={`calories macro`} placeholder='grams'>{this.autoSum('calories')}</li>
      <li className={`fat macro ${this.compareForStyle('fat')}`}>{this.autoSum('fat')}</li>
      <li className={`carbs macro ${this.compareForStyle('carbs')}`}>{this.autoSum('carbs')}</li>
      <li className={`protein macro ${this.compareForStyle('protein')}`}>{this.autoSum('protein')}</li>
      <li className='deleteColumn'></li>
    </ul>
  }

  render(){
    // console.log(this.props)
    return(
      <div className='table'>
        {localStorage.getItem('token') ? null : 
          <div className='welcome'>
          <h1>WELCOME TO HAM</h1>
          <h2>a simple macronutrient tracker</h2>
          <hr/>
          </div>
        }
        < GoalsRow />
        {this.totalsRow()}
        {this.keyRow}
        {this.props.categories.sort((x, y) => x.created_at - y.created_at).map(category => {
        return <CategoryCard category={category} key={category.id} />
        })}
        {this.keyRow}
        {this.totalsRow()}
        <button className='saveButton' onClick={() => this.props.saveAll(this.props)}>Save</button>
        {this.props.loading? <div className='loading'></div> : null}
        {/* <div className='loading'></div> */}
      </div>
    ) 
  }
}

const mapStateToProps = (state) => { // LIMIT TO WHAT THIS COMPONENT IS USING!
  // console.log('Choice Container state to props', state)
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    addChoices: (choices) => dispatch({ type: 'ADD_CHOICES', payload: choices}),
    selectUser: (user) => dispatch({ type: 'SELECT_USER', payload: user}),
    editGoal: (info) => dispatch({ type: 'EDIT_GOAL', payload: info}),
    changeGoal: (id) => dispatch({ type: 'CHANGE_GOAL', payload: id}),
    updateGoal: (goal) => dispatch(updateGoal(goal)),
    createGoal: (state) => dispatch(createGoal(state)),
    saveAll: (state) => dispatch(saveAll(state)),
    editGoalName: (name) => dispatch({ type: 'EDIT_GOAL_NAME', payload: name}),
    deleteGoal: id => dispatch(deleteGoal(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceContainer)