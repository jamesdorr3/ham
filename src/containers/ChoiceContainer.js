import React from 'react'
import ChoiceCard from '../components/ChoiceCard'
import {URL, HEADERS} from '../constants.js'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'

class ChoiceContainer extends React.Component {

  state = {
    userNeedsSaved: false
  }

  componentDidMount(){
    if (localStorage.getItem('token')){
      fetch(`${URL}/choices`, {headers: HEADERS()})
      .then(r => r.json())
      .then(choicesArray => this.props.addChoices(choicesArray))
    }
  }

  autoSum = (macro) => {
    let sum = 0
    this.props.choices.forEach(choice => {
      const measurement = choice.measure === 'grams' ? choice.food.serving_grams : (choice.food.serving_unit_amount || 1)
      sum += parseInt((choice.food[macro] / measurement * choice.amount).toFixed(0))
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

  render(){
    // console.log('this.props.user', this.props.user)
    return(
      <>
      <table>
        <tbody>
          <tr>
            <th>name</th><th>amount</th><th>measure</th><th>calories</th><th>fat</th><th>carbs</th><th>protein</th>
          </tr>
          <tr>
            <th colSpan='3'>Goals: </th>
            <th><input onChange={this.handleUpdateGoals} type='number' name='calories' value={this.props.user.calories} /></th>
            <th><input onChange={this.handleUpdateGoals} type='number' name='fat' value={this.props.user.fat} /></th>
            <th><input onChange={this.handleUpdateGoals} type='number' name='carbs' value={this.props.user.carbs} /></th>
            <th><input onChange={this.handleUpdateGoals} type='number' name='protein' value={this.props.user.protein} /></th>
            {this.state.userNeedsSaved ? <th><button onClick={this.saveGoals} >Save Goals</button></th> : null }
          </tr>
          <tr>
            <th colSpan='3'>Totals: </th>
            <th>{this.autoSum('calories')}</th>
            <th>{this.autoSum('fat')}</th>
            <th>{this.autoSum('carbs')}</th>
            <th>{this.autoSum('protein')}</th>
          </tr>
        </tbody>
          <Droppable droppableId='1'>
            {(provided) => (
              <tbody
                className="Hero-List"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <tr>blah</tr>
                {this.props.choices.map((choice, index) => < ChoiceCard //.sort((x, y) => x.id - y.id)
                choice={choice} 
                key={choice.id} 
                index={index}
                deleteChoice={this.props.deleteChoice} 
                /> )}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
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
    updateUser: (elem) => dispatch({ type: 'UPDATE_USER', payload: elem})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceContainer)