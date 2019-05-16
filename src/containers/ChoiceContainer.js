import React from 'react'
import ChoiceCard from '../components/ChoiceCard'
// import '../constants'

class ChoiceContainer extends React.Component {

  autoSum = (macro) => {
    const elements = document.querySelectorAll(`.${macro}`)
    let sum = 0
    elements.forEach(element => {
      debugger
      sum += parseInt(element.innerText)
    })
    return sum
  }

  render(){
    return(
      <table>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>Goals: </td>
            <td><input type='number'/></td>
            <td><input type='number'/></td>
            <td><input type='number'/></td>
            <td><input type='number'/></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>Totals: </td>
            <td>{this.autoSum('calories')}</td>
            <td>{this.autoSum('fat')}</td>
            <td>{this.autoSum('carbs')}</td>
            <td>{this.autoSum('proten')}</td>
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

export default ChoiceContainer