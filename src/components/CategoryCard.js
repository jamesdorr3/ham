import React from 'react'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'
import ChoiceCard from '../components/ChoiceCard'
import SearchContainer from '../containers/SearchContainer'

class CategoryCard extends React.Component {

  mySortedChoices = () => {
    const myChoices = this.props.choiceFoods.filter(choice => choice.choice.category_id === this.props.category.id)
    return myChoices.sort((x, y) => x.choice.index - y.choice.index)
  }

  autoSum = (macro) => {
    let sum = 0
    this.props.choiceFoods.filter(choiceFood => choiceFood.choice.category_id === this.props.category.id).forEach(choiceFood => {
      // console.log(choiceFood)
      const measurement = ((choiceFood.choice.measure === 'grams') ? choiceFood.food.serving_grams : (choiceFood.food.serving_unit_amount || 1))
      sum += parseInt((choiceFood.food[macro] / measurement * choiceFood.choice.amount).toFixed(0))
    })
    return sum
  }

  render(){
    // console.log(this.props)
    return(
      <Droppable droppableId={this.props.category.id}>
      {(provided) => (
        <div
          className="row"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className='categoryHeader'>
            <span colSpan='2'>{this.props.category.name}</span>
            <span colSpan='1' className='centered'>Totals: </span>
            <span className='macro'>{this.autoSum('calories')}</span>
            <span className='macro'>{this.autoSum('fat')}</span>
            <span className='macro'>{this.autoSum('carbs')}</span>
            <span className='macro'>{this.autoSum('protein')}</span>
            <th className='xrow'></th>
          </div>
          {this.mySortedChoices().map((choiceFood, index) => < ChoiceCard //.sort((x, y) => x.id - y.id)
          choiceFood={choiceFood} 
          key={choiceFood.choice.id} 
          index={index}
          deleteChoice={this.props.deleteChoice} 
          /> )}
          {provided.placeholder}
        < SearchContainer categoryId={this.props.category.id} />
        </div>
      )}
    </Droppable>
    )
  }
}

const mapStateToProps = state => {
  return {choiceFoods: state.choiceFoods}
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard)