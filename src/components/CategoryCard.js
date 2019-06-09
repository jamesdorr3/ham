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
      // const measurement = ((choiceFood.choice.measure === 'grams') ? choiceFood.food.serving_grams : (choiceFood.food.serving_unit_amount || 1))
      // sum += parseInt((choiceFood.food[macro] / measurement * choiceFood.choice.amount).toFixed(0))
      const amount = choiceFood.choice.amount
      const measure = choiceFood.measures.find(x => x.id === choiceFood.choice.measure_id)
      const totalGrams = amount * measure.grams
      const servingAmount = choiceFood.food.serving_grams
      const servings = (totalGrams / servingAmount) / measure.amount
      // console.log(sum)
      sum += parseInt(choiceFood.food[macro] * servings)
    })
    return sum.toFixed()
  }

  render(){
    // console.log(this.props.choiceFoods)
    return(
      <Droppable droppableId={this.props.category.id}>
      {(provided) => (
        <div className={`category number${this.props.category.id}`}
        ref={provided.innerRef}
        {...provided.droppableProps}
        >
        <ul
          className="grid categoryGrid"
          >
            <li className='name categoryName' >{this.props.category.name}</li>
            <li className='subtotals'>Subtotals: </li>
            <li className='calories macro'>{this.autoSum('calories')}</li>
            <li className='fat macro'>{this.autoSum('fat')}</li>
            <li className='carbs macro'>{this.autoSum('carbs')}</li>
            <li className='protein macro'>{this.autoSum('protein')}</li>
            <li className='deleteColumn'></li>
          </ul>
          {/* <ul className='grid key'>
            <li className='name'><div>Name</div></li>
            <li className='amount'><div>Amount</div></li>
            <li className='measure' ><div>Measure</div></li>
            <li className='macro calories' ><div>Calories</div></li>
            <li className='macro fat' ><div>Fat</div></li>
            <li className='macro carbs' ><div>Carbs</div></li>
            <li className='macro protein' ><div>Protein</div></li>
            <li className='deleteColumn'></li>
          </ul> */}
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