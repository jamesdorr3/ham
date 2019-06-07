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
      const measurement = ((choiceFood.choice.measure === 'grams') ? choiceFood.food.serving_grams : (choiceFood.food.serving_unit_amount || 1))
      sum += parseInt((choiceFood.food[macro] / measurement * choiceFood.choice.amount).toFixed(0))
    })
    return sum
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
        <ul className='grid key'>
          <li className='name'><div></div></li>
          <li className='amount'><div></div></li>
          <li className='measure' ><div></div></li>
          <li className='macro calories' ><div>Calories</div></li>
          <li className='macro fat' ><div>Fat</div></li>
          <li className='macro carbs' ><div>Carbs</div></li>
          <li className='macro protein' ><div>Protein</div></li>
          <li className='deleteColumn'></li>
        </ul>
        <ul className='grid totalsRow'>
          <li className='totals'><span>TOTALS:</span></li>
          <li className='calories macro' placeholder='grams'>{this.autoSum('calories')}</li>
          <li className='fat macro'>{this.autoSum('fat')}</li>
          <li className='carbs macro'>{this.autoSum('carbs')}</li>
          <li className='protein macro'>{this.autoSum('protein')}</li>
          <li className='deleteColumn'></li>
        </ul>
        {this.props.categories.sort((x, y) => x.created_at - y.created_at).map(category => {
        return <CategoryCard category={category} key={category.id} />
        })}
        <div className='arrow' style={{display: this.props.choiceFoods.length > 0 ? 'none' : 'block'}}>
          <span className='rectangle'>Start Here</span>
        </div>
        <ul className='grid totalsRow'>
          <li className='totals'><span>TOTALS:</span></li>
          <li className='calories macro' placeholder='grams'>{this.autoSum('calories')}</li>
          <li className='fat macro'>{this.autoSum('fat')}</li>
          <li className='carbs macro'>{this.autoSum('carbs')}</li>
          <li className='protein macro'>{this.autoSum('protein')}</li>
          <li className='deleteColumn macro'></li>
        </ul>
        <button className='saveButton' onClick={() => this.props.saveAll(this.props)}>Save</button>
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