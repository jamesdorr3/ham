import React from 'react'
import ChoiceCard from '../components/ChoiceCard'
import {URL, HEADERS} from '../constants.js'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'
import fetchChoices from '../actions/choicesActions'
import CategoryCard from '../components/CategoryCard'

class ChoiceContainer extends React.Component {

  state = {
    userNeedsSaved: false
  }

  componentDidMount(){
    if (localStorage.getItem('token')){
      // this.props.fetchChoices()
    }
  }

  autoSum = (macro) => {
    let sum = 0
    this.props.choices.forEach(choice => {
      console.log(choice)
      const measurement = ((choice.choice.measure === 'grams') ? choice.food.serving_grams : (choice.food.serving_unit_amount || 1))
      sum += parseInt((choice.food[macro] / measurement * choice.choice.amount).toFixed(0))
    })
    return sum
  }

  handleUpdateGoals = (e) => {
    this.setState({userNeedsSaved: true})
    this.props.updateUser(e.target)
  }

  saveGoals = () => {
    fetch(`${URL}users/${this.props.user.id}`, {
      method: 'PATCH',
      headers: HEADERS(),
      body: JSON.stringify(this.props.user)
    })
    .then(r => r.json())
    .then(r => this.setState({userNeedsSaved: false}))
  }

  goalsSelector = (goals) => {
    return <select>
      {goals.map(goal => <option value={goal.id} key={goal.id}>{goal.name}</option>)}
    </select>
  }

  render(){
    console.log(this.props.categories)
    return(
      <>
      <table>
        <tbody>
          <tr>
            <th className='name'>name</th>
            <th className='amount'>amount</th>
            <th className='measure' >measure</th>
            <th className='calories' >calories</th>
            <th className='fat' >fat</th>
            <th className='carbs' >carbs</th>
            <th className='protein' >protein</th>
          </tr>
          <tr>
            <th colSpan='1'>Goals: </th>
            <th colSpan='2'>{this.goalsSelector(this.props.goals)}</th>
            <th><input onChange={this.handleUpdateGoals} type='number' name='calories' value={this.props.goal.calories} /></th>
            <th><input onChange={this.handleUpdateGoals} type='number' name='fat' value={this.props.goal.fat} /></th>
            <th><input onChange={this.handleUpdateGoals} type='number' name='carbs' value={this.props.goal.carbs} /></th>
            <th><input onChange={this.handleUpdateGoals} type='number' name='protein' value={this.props.goal.protein} /></th>
            {this.state.userNeedsSaved ? <th><button onClick={this.saveGoals} >Save Goals</button></th> : null }
          </tr>
          <tr>
            <th colSpan='2'></th>
            <th colSpan='1'>Totals: </th>
            <th>{this.autoSum('calories')}</th>
            <th>{this.autoSum('fat')}</th>
            <th>{this.autoSum('carbs')}</th>
            <th>{this.autoSum('protein')}</th>
          </tr>
        </tbody>
        {this.props.categories.sort((x, y) => x.index - y.index).map(category => {
          return <CategoryCard category={category} />
        })}
          {/* <Droppable droppableId='1'>
            {(provided) => (
              <tbody
                className=""
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.props.choices.sort((x, y) => x.choice.index - y.choice.index).map((choice, index) => < ChoiceCard //.sort((x, y) => x.id - y.id)
                choice={choice} 
                key={choice.choice.id} 
                index={index}
                deleteChoice={this.props.deleteChoice} 
                /> )}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable> */}
      </table>
      </>
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
    updateUser: (elem) => dispatch({ type: 'UPDATE_USER', payload: elem}),
    fetchChoices: () => dispatch(fetchChoices())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceContainer)