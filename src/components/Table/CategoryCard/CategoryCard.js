import React from 'react'
import {connect} from 'react-redux'
import {Droppable} from 'react-beautiful-dnd'
import ChoiceCard from './ChoiceCard/ChoiceCard'

const CategoryCard = props => {

  const mySortedChoices = () => {
    const myChoices = props.choiceFoods.filter(choice => choice.choice.category_id === props.category.id)
    return myChoices.sort((x, y) => x.choice.index - y.choice.index)
  }

  const autoSum = (macro) => {
    let sum = 0
    props.choiceFoods.filter(choiceFood => choiceFood.choice.category_id === props.category.id).forEach(choiceFood => {
      // console.log(choiceFood)
      // const measurement = ((choiceFood.choice.measure === 'grams') ? choiceFood.food.serving_grams : (choiceFood.food.serving_unit_amount || 1))
      // sum += parseInt((choiceFood.food[macro] / measurement * choiceFood.choice.amount).toFixed(0))
      const amount = choiceFood.choice.amount
      const measure = choiceFood.measures.find(x => x.id === choiceFood.choice.measure_id)
      const totalGrams = amount * measure.grams
      const servingAmount = choiceFood.food.serving_grams
      const measureAmount = measure.amount? measure.amount : 1
      const servings = (totalGrams / servingAmount) / measureAmount
      // console.log(sum)
      sum += (choiceFood.food[macro] * servings)
    })
    return sum.toFixed()
  }

  return(
    <Droppable droppableId={props.category.id}>
    {(provided) => (
      <div className='category'
      ref={provided.innerRef}
      {...provided.droppableProps}
      >
        <p className='name categoryName'>{props.category.name}</p>
        {mySortedChoices().map((choiceFood, index) => < ChoiceCard //.sort((x, y) => x.id - y.id)
        // animationEnd={console.log('END!')}
        choiceFood={choiceFood} 
        key={choiceFood.choice.id} 
        index={index}
        deleteChoice={props.deleteChoice} 
        /> )}
        {provided.placeholder}
        <ul
        className="grid categoryGrid"
        >
          <li className='name categoryName' ></li>
          <li className='subtotals'>Subtotals: </li>
          <li className='calories macro'>{autoSum('calories')}</li>
          <li className='fat macro'>{autoSum('fat')}</li>
          <li className='carbs macro'>{autoSum('carbs')}</li>
          <li className='protein macro'>{autoSum('protein')}</li>
          <li className='deleteColumn'></li>
        </ul>
      </div>
    )}
    
  </Droppable>
  )
}

const mapStateToProps = state => {
  return {choiceFoods: state.choiceFoods}
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard)