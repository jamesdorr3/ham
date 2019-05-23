import React from 'react'
import ChoiceCard from '../components/ChoiceCard'
import {URL, HEADERS} from '../constants.js'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'
import CategoryCard from '../components/CategoryCard'
import {updateGoal} from '../actions/goalsActions'

class ChoiceContainer extends React.Component {

  state = {
    goalChanged: false
  }

  componentDidMount(){
    if (localStorage.getItem('token')){
      // this.props.fetchChoices()
    }
  }

  autoSum = (macro) => {
    let sum = 0
    this.props.choiceFoods.forEach(choiceFood => {
      // console.log(choiceFood)
      const measurement = ((choiceFood.choice.measure === 'grams') ? choiceFood.food.serving_grams : (choiceFood.food.serving_unit_amount || 1))
      sum += parseInt((choiceFood.food[macro] / measurement * choiceFood.choice.amount).toFixed(0))
    })
    return sum
  }

  handleChange = (e) => {
    this.props.changeGoal({[e.target.name]: e.target.value})
    this.setState({goalChanged: true})
  }

  saveGoals = () => {
    this.setState({goalChanged: false})
    this.props.updateGoal(this.props.goal)
  }

  goalsSelector = (goals) => {
    return <select value={this.props.goal.id} className='goalsSelect'>
      {goals.map(goal => <option value={goal.id} key={goal.id}>{goal.name}</option>)}
    </select>
  }

  render(){
    // console.log(this.props.categories)
    return(
      <div className='table'>
          <div className='row'>
            <span className='name'>name</span>
            <span className='amount'>amount</span>
            <span className='measure' >measure</span>
            <span className='macro calories' >calories</span>
            <span className='macro fat' >fat</span>
            <span className='macro carbs' >carbs</span>
            <span className='macro protein' >protein</span>
            <span className='deleteColumn'></span>
          </div>
          <div className='row highlightRow'>
            <span colSpan='1'>Goals: </span>
            <span colSpan='2'>{this.goalsSelector(this.props.goals)}<button>+</button></span>
            <span><input onChange={this.handleChange} className='calories' type='number' name='calories' value={this.props.goal.calories} /></span>
            <span><input onChange={this.handleChange} className='fat' type='number' name='fat' value={this.props.goal.fat} /></span>
            <span><input onChange={this.handleChange} className='carbs' type='number' name='carbs' value={this.props.goal.carbs} /></span>
            <span><input onChange={this.handleChange} className='protein' type='number' name='protein' value={this.props.goal.protein} /></span>
            <span className='deleteColumn'>{this.state.goalChanged ? <button onClick={this.saveGoals} >Save</button> : null }</span>
          </div>
          <div className='row highlightRow'>
            <span colSpan='2'></span>
            <span colSpan='1'>Totals: </span>
            <span className='calories'>{this.autoSum('calories')}</span>
            <span className='fat'>{this.autoSum('fat')}</span>
            <span className='carbs'>{this.autoSum('carbs')}</span>
            <span className='protein'>{this.autoSum('protein')}</span>
            <span className='deleteColumn'></span>
          </div>
        {this.props.categories.sort((x, y) => x.created_at - y.created_at).map(category => {
        return <CategoryCard category={category} key={category.id} />
        })}
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
    changeGoal: (info) => dispatch({ type: 'CHANGE_GOAL', payload: info}),
    updateGoal: (goal) => dispatch(updateGoal(goal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceContainer)