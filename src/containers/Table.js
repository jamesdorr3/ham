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
    window.addEventListener('beforeunload', e => {
      const dayId = this.props.day.id
      const goalId = this.props.goal.id
      fetch(`${URL}days/${dayId}`, {
        method: 'PATCH',
        headers: HEADERS(),
        body: JSON.stringify({goal_id: goalId,})
      })
    })
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
    this.props.editGoal({[e.target.name]: e.target.value})
    this.setState({goalChanged: true})
  }

  saveGoals = () => {
    this.setState({goalChanged: false})
    this.props.updateGoal(this.props.goal)
  }

  changeGoal = (e) => {
    this.setState({goalChanged: true})
    this.props.changeGoal(e.target.value)
  }

  goalsSelector = (goals) => {
    return <select value={this.props.goal.id} className='goalsSelect' onChange={this.changeGoal}>
      {goals.map(goal => <option value={goal.id} key={goal.id}>{goal.name}</option>)}
    </select>
  }

  render(){
    // console.log(this.props.categories)
    return(
      <div className='table'>
        <div className='categoryRowContainer'>
          <ul className='row choiceRow'>
            <li className='name'>name</li>
            <li className='amount'>amount</li>
            <li className='measure' >measure</li>
            <li className='macro calories' >calories</li>
            <li className='macro fat' >fat</li>
            <li className='macro carbs' >carbs</li>
            <li className='macro protein' >protein</li>
            <li className='deleteColumn'></li>
          </ul>
          <ul className='row highlightRow choiceRow goalsRow'>
            <li className='goals'><span>Goals:</span></li>
            <li className='goalsSelect'>{this.goalsSelector(this.props.goals)}<button>+</button></li>
            <li className='calories'><input onChange={this.handleChange}  type='number' name='calories' value={this.props.goal.calories} /></li>
            <li className='fat'><input onChange={this.handleChange} type='number' name='fat' value={this.props.goal.fat} /></li>
            <li className='carbs'><input onChange={this.handleChange} type='number' name='carbs' value={this.props.goal.carbs} /></li>
            <li className='protein'><input onChange={this.handleChange} type='number' name='protein' value={this.props.goal.protein} /></li>
            <li className='deleteColumn'>{this.state.goalChanged ? <button onClick={this.saveGoals} >Save</button> : null }</li>
          </ul>
          <ul className='row highlightRow choiceRow'>
            <li className='totals'><span>Totals:</span></li>
            <li className='calories'>{this.autoSum('calories')}</li>
            <li className='fat'>{this.autoSum('fat')}</li>
            <li className='carbs'>{this.autoSum('carbs')}</li>
            <li className='protein'>{this.autoSum('protein')}</li>
            <li className='deleteColumn'></li>
          </ul>
        {this.props.categories.sort((x, y) => x.created_at - y.created_at).map(category => {
        return <CategoryCard category={category} key={category.id} />
        })}
        </div>
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
    updateGoal: (goal) => dispatch(updateGoal(goal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceContainer)