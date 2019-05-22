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
      <table>
        <tbody>
          <tr>
            <th className='name'>name</th>
            <th className='amount'>amount</th>
            <th className='measure' >measure</th>
            <th className='macro calories' >calories</th>
            <th className='macro fat' >fat</th>
            <th className='macro carbs' >carbs</th>
            <th className='macro protein' >protein</th>
            <th className='xcol'></th>
          </tr>
          <tr>
            <th colSpan='1'>Goals: </th>
            <th colSpan='2'>{this.goalsSelector(this.props.goals)}<button>+</button></th>
            <th><input onChange={this.handleChange} className='macro' type='number' name='calories' value={this.props.goal.calories} /></th>
            <th><input onChange={this.handleChange} className='macro' type='number' name='fat' value={this.props.goal.fat} /></th>
            <th><input onChange={this.handleChange} className='macro' type='number' name='carbs' value={this.props.goal.carbs} /></th>
            <th><input onChange={this.handleChange} className='macro' type='number' name='protein' value={this.props.goal.protein} /></th>
            <th className='xcol'>{this.state.goalChanged ? <button onClick={this.saveGoals} >Save</button> : null }</th>
          </tr>
          <tr>
            <th colSpan='2'></th>
            <th colSpan='1'>Totals: </th>
            <th className='macro'>{this.autoSum('calories')}</th>
            <th className='macro'>{this.autoSum('fat')}</th>
            <th className='macro'>{this.autoSum('carbs')}</th>
            <th className='macro'>{this.autoSum('protein')}</th>
            <th className='xcol'></th>
          </tr>
        </tbody>
        {this.props.categories.sort((x, y) => x.created_at - y.created_at).map(category => {
        return <CategoryCard category={category} key={category.id} />
        })}
      </table>
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