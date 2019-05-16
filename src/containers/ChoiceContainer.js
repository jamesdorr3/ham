import React from 'react'
import ChoiceCard from '../components/ChoiceCard'
import '../constants'
import {connect} from 'react-redux'

class ChoiceContainer extends React.Component {

  componentDidMount(){
    fetch(`${URL}/choices`)
    .then(r => r.json())
    .then(choices => this.props.addChoices(choices))
  }

  autoSum = (macro) => {
    const elements = document.querySelectorAll(`.${macro}`)
    let sum = 0
    elements.forEach(element => {
      // debugger
      sum += parseInt(element.innerText)
    })
    return sum
  }

  render(){
    console.log(this.props)
    return(
      <table>
        <tbody>
          <tr>
            <td colSpan='3'>Goals: </td>
            <td><input type='number'/></td>
            <td><input type='number'/></td>
            <td><input type='number'/></td>
            <td><input type='number'/></td>
          </tr>
          <tr>
            <td colSpan='3'>Totals: </td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
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
          {this.props.choices.map(choice => < ChoiceCard 
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
  console.log('Choice Container state to props', state)
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    addChoices: (choices) => dispatch({ type: 'ADD_CHOICES', payload: choices})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceContainer)