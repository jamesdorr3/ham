import React from 'react'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'
import ChoiceCard from '../components/ChoiceCard'

class CategoryCard extends React.Component {

  mySortedChoices = () => {
    const myChoices = this.props.choices.filter(choice => choice.choice.category_id === this.props.category.id)
    return myChoices.sort((x, y) => x.choice.index - y.choice.index)
  }

  render(){
    console.log(this.props.choices)
    return(
      <Droppable droppableId={this.props.category.id}>
      {(provided) => (
        <tbody
          className=""
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <tr>
            <th colSpan='2'>{this.props.category.name}</th>
            <th colSpan='1'>Totals: </th>
            <th>00</th>
            <th>00</th>
            <th>00</th>
            <th>00</th>
          </tr>
          {this.mySortedChoices().map((choice, index) => < ChoiceCard //.sort((x, y) => x.id - y.id)
          choice={choice} 
          key={choice.choice.id} 
          index={index}
          deleteChoice={this.props.deleteChoice} 
          /> )}
          {provided.placeholder}
        </tbody>
      )}
    </Droppable>
    )
  }
}

const mapStateToProps = state => {
  return {choices: state.choices}
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard)