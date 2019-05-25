import React from 'react'
import ChoiceCard from '../components/ChoiceCard'
import {URL, HEADERS} from '../constants.js'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'
import CategoryCard from '../components/CategoryCard'
import {updateGoal} from '../actions/goalsActions'
import {saveAll} from '../actions/saveAllAction'

class ChoiceContainer extends React.Component {

  state = {
    goalChanged: false,
    showEditGoalForm: false,
    editGoalName: null
  }

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

  goalsSelector = () => {
    return <select value={this.props.goal.id} className='goalsSelect' onChange={this.changeGoal}>
      {this.props.goals.map(goal => <option value={goal.id} key={goal.id}>{goal.name}</option>)}
    </select>
  }

  addGoal = () => {console.log('add goal')}

  toggleEditGoalForm = () => {this.setState({showEditGoalForm: !this.state.showEditGoalForm})}

  editGoalName = (e) => {
    e.preventDefault()
    this.setState({showEditGoalForm: false, editGoalName: null})
    if (this.state.editGoalName && this.state.editGoalName !== this.props.goal.name){
      this.props.editGoal({name: this.state.editGoalName})
    }
  }

  render(){
    console.log(this.props)
    return(
      <div className='table'>
        {localStorage.getItem('token') ? null : 
          <div className='welcome'>
          <h1>WELCOME TO HAM</h1>
          <h2>a simple macronutrient tracker</h2>
          <hr/>
          </div>
        }
          <ul className='grid goals'>
            <li className='goals'><span>Goals:</span></li>
            <li className='goalsSelect'>
              {this.state.showEditGoalForm 
                ? 
                <form onSubmit={this.editGoalName}>
                  <input type='text' defaultValue={this.props.goal.name} placeholder='Edit Goal Name' value={this.state.editGoalName} onChange={(e) => this.setState({editGoalName: e.target.value})} />
                  <input type='submit' value='✔︎' />
                </form>
                : 
                this.goalsSelector()}
                {/* <br/> */}
              <button onClick={this.addGoal} className='newGoal addButton' alt='add new goal' >
                <img src='add-icon-circle.png' className='newGoal addButton' alt='add new goal'></img>
                <span className='tooltiptext'>Add New Goal</span>
              </button>
              <button onClick={this.toggleEditGoalForm} className='editGoalName editButton' alt='edit goal name' >
                {this.state.showEditGoalForm
                ?
                <>
                <img src='delete-icon-circle.png' className='closeEditForm deleteButton' alt='Close Edit Form'></img>
                <span className='tooltiptext'>Close Edit Form</span>
                </>
                :
                <>
                <img src='edit-icon.png' className='editGoalName editButton' alt='Edit Goal Name'></img>
                <span className='tooltiptext'>EditGoalName</span>
                </>
                }
              </button>
            </li>
            <li className='calories'><input onChange={this.handleChange}  type='number' name='calories' value={this.props.goal.calories} /></li>
            <li className='fat'><input onChange={this.handleChange} type='number' name='fat' value={this.props.goal.fat} /></li>
            <li className='carbs'><input onChange={this.handleChange} type='number' name='carbs' value={this.props.goal.carbs} /></li>
            <li className='protein'><input onChange={this.handleChange} type='number' name='protein' value={this.props.goal.protein} /></li>
            <li className='deleteColumn'>{this.state.goalChanged ? <button onClick={this.saveGoals} >Save</button> : null }</li>
          </ul>
          <ul className='grid key'>
            <li className='name'>name</li>
            <li className='amount'>amount</li>
            <li className='measure' >measure</li>
            <li className='macro calories' >calories</li>
            <li className='macro fat' >fat</li>
            <li className='macro carbs' >carbs</li>
            <li className='macro protein' >protein</li>
            <li className='deleteColumn'></li>
          </ul>
          <ul className='grid totalsRow'>
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
    saveAll: (state) => dispatch(saveAll(state)),
    editGoalName: (name) => dispatch({ type: 'EDIT_GOAL_NAME', payload: name})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceContainer)