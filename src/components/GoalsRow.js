import React from 'react'
import {connect} from 'react-redux'
import {createGoal, updateGoal, deleteGoal} from '../actions/goalsActions'
import AutogenerateGoal from './AutogenerateGoal'
import {updateDay} from '../actions/daysActions'

class GoalsRow extends React.Component {

  state = {
    showEditGoalForm: false
  }

  goalsSelector = () => {
    return <select value={this.props.goal.id} className='goalsSelect' onChange={this.changeGoal}>
      {this.props.goals.sort((a,b) => a.name - b.name).map(goal => <option value={goal.id} key={goal.id}>{goal.name}</option>)}
    </select>
  }

  changeGoal = (e) => {
    this.props.changeGoal(e.target.value)
    this.props.updateDay({id: this.props.day.id,goal_id: e.target.value})
  }

  addGoal = () => {
    this.props.createGoal({
      user_id: this.props.user.id,
      name: 'new goal',
      calories: 1, fat: 1, carbs: 1, protein: 1
    })
    .then(this.editGoal)
  }
  editGoal = () => {
    this.setState({showEditGoalForm: true})
  }
  deleteGoal = () => this.props.deleteGoal(this.props.goal.id)

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({showEditGoalForm: false})
    this.props.updateGoal({...this.state, id: this.props.goal.id})
  }

  handleChange = (e) => {
    // console.log({[e.target.name]: e.target.value})
    this.props.editGoal({[e.target.name]: e.target.value})
  }

  toggleAutogenerate = () => {this.setState({showAutogenerateForm: !this.state.showAutogenerateForm})}

  render(){
    return(
      <>
      {
      this.state.showEditGoalForm
      ?
      <form className='grid goals' onSubmit={this.handleSubmit}>
        <li className='goalsTitle'><div>Goals:</div></li>
        <li className='goalsSelect'>
          <div><input type='text' name='name' placeholder='name' defaultValue={this.props.goal.name} value={this.state.name} onChange={this.handleChange} /></div>
        </li>
        <li className='macro calories' ><div><input type='number' name='calories' min='0' placeholder='kcal' value={this.props.goal.calories} onChange={this.handleChange} /></div></li>
        <li className='macro fat' ><div><input type='number' name='fat' min='0' placeholder='grams' value={this.props.goal.fat} onChange={this.handleChange} /></div></li>
        <li className='macro carbs' ><div><input type='number' name='carbs' min='0' placeholder='grams' value={this.props.goal.carbs} onChange={this.handleChange} /></div></li>
        <li className='macro protein' ><div><input type='number' name='protein' min='0' placeholder='grams' value={this.props.goal.protein} onChange={this.handleChange} /></div></li>
        <li className='submitGoal'><input className='submitGoal' type='submit' value='✔'/></li>
      </form>
      :
      <ul className='grid goals'>
        <li className='goalsTitle'><div>Goals:</div></li>
        <li className='goalsSelect'><div>{this.goalsSelector()}</div></li>
        <li className='macro calories' ><div>{this.props.goal.calories}</div></li>
        <li className='macro fat' ><div>{this.props.goal.fat}</div></li>
        <li className='macro carbs' ><div>{this.props.goal.carbs}</div></li>
        <li className='macro protein' ><div>{this.props.goal.protein}</div></li>
        <span className='dropdownButton'>
          <span>⋯</span>
          <ul className='dropdown'>
            <li onClick={this.addGoal}><button><img src='add-icon-circle.png' className='newGoal addButton' alt='add new goal'></img></button>Add Goal</li>
            <li onClick={this.editGoal}><button><img src='edit-icon.png' className='editGoal editButton' alt='edit goal' /></button>Edit Goal</li>
            <li onClick={this.deleteGoal}><button><img src='trash-icon.png' className='deleteChoice deleteButton' alt='delete choice' /></button>Delete Goal</li>
            <li onClick={this.toggleAutogenerate}><button>♾</button>Autogenerate Goal</li>
          </ul>
        </span>
      </ul>
      }
    <div 
      style={{display: this.state.showAutogenerateForm ? 'block' : 'none'}}
      >
      < AutogenerateGoal toggleAutogenerate={this.toggleAutogenerate}/>
    </div>
    </>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    changeGoal: (id) => dispatch({ type: 'CHANGE_GOAL', payload: id}),
    updateGoal: (goal) => dispatch(updateGoal(goal)),
    createGoal: (userId) => dispatch(createGoal(userId)),
    deleteGoal: id => dispatch(deleteGoal(id)),
    editGoal: info => dispatch({ type: 'EDIT_GOAL', payload: info}),
    updateDay: info => dispatch(updateDay(info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalsRow)