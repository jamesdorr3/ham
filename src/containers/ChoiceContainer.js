import React from 'react'
import ChoiceCard from '../components/ChoiceCard'
import {URL, HEADERS} from '../constants.js'
import {connect} from 'react-redux'

class ChoiceContainer extends React.Component {

  state = {
    userNeedsSaved: false
  }

  componentDidMount(){
    fetch(`${URL}/choices`)
    .then(r => r.json())
    .then(choices => this.props.addChoices(choices))
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
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json',
        Authorization: `Bearer <token>`
      },
      body: JSON.stringify(this.props.user)
    })
    .then(r => r.json())
    .then(r => this.setState({userNeedsSaved: false}))
  }

  render(){
    // console.log('this.props.choices', this.props)
    return(
      <table>
        <tbody>
          <tr>
            <td colSpan='3'>Goals: </td>
            <td><input onChange={this.handleUpdateGoals} type='number' name='calories' value={this.props.user.calories} /></td>
            <td><input onChange={this.handleUpdateGoals} type='number' name='fat' value={this.props.user.fat} /></td>
            <td><input onChange={this.handleUpdateGoals} type='number' name='carbs' value={this.props.user.carbs} /></td>
            <td><input onChange={this.handleUpdateGoals} type='number' name='protein' value={this.props.user.protein} /></td>
            {this.state.userNeedsSaved ? <td><button onClick={this.saveGoals} >Save Goals</button></td> : null }
          </tr>
          <tr>
            <td colSpan='3'>Totals: </td>
            <td>{this.autoSum('calories')}</td>
            <td>{this.autoSum('fat')}</td>
            <td>{this.autoSum('carbs')}</td>
            <td>{this.autoSum('protein')}</td>
          </tr>
          <tr>
            <td>name</td>
            <td>amount</td>
            <td>measure</td>
            <td>calories</td>
            <td>fat</td>
            <td>carbs</td>
            <td>protein</td>
          </tr>
          {this.props.choices.sort((x, y) => x.id - y.id).map(choice => < ChoiceCard 
          choice={choice} 
          key={choice.id} 
          deleteChoice={this.props.deleteChoice} 
          /> )}
        </tbody>
      </table>
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