import React from 'react'
import ChoiceCard from '../components/ChoiceCard'
import '../constants'

class ChoiceContainer extends React.Component {

  state = {
    choices: []
  }

  componentDidMount(){
    const foodsUrl = `${URL}foods`
    fetch('http://localhost:3001/choices')
    .then(r => r.json())
    .then(choices => this.setState({choices: choices}))
  }

  render(){
    return(
      <>
      <p>ChoiceContainer</p>
      <table>
        <tbody>
          <tr>
            <td>name</td>
            <td>amount</td>
            <td>measure</td>
            <td>fat</td>
            <td>carbs</td>
            <td>protein</td>
          </tr>
          {this.state.choices.map(choice => < ChoiceCard 
          choice={choice} 
          key={choice.id}/> )}
        </tbody>
      </table>
      </>
    )
  }
}

export default ChoiceContainer