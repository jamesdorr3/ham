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
        <div className='category'>
        <ul
          className="grid categoryGrid"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
            <li className='name categoryName' >{this.props.category.name}</li>
            <li className='totals'>Totals: </li>
            <li className='calories'>{this.autoSum('calories')}</li>
            <li className='fat'>{this.autoSum('fat')}</li>
            <li className='carbs'>{this.autoSum('carbs')}</li>
            <li className='protein'>{this.autoSum('protein')}</li>
            <li className='deleteColumn'></li>
          </ul>
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