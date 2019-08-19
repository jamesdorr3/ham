import React from 'react'
import {connect} from 'react-redux'
import CategoryCard from '../components/CategoryCard'
import GoalsRow from '../components/GoalsRow'
import {updateGoal} from '../actions/goalsActions'
import {createGoal} from '../actions/goalsActions'
import {saveAll} from '../actions/saveAllAction'
import {deleteGoal} from '../actions/goalsActions'

const ChoiceContainer = props => {

  const autoSum = (macro) => {
    let sum = 0
    props.choiceFoods.forEach(choiceFood => {
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
      sum += parseInt(choiceFood.food[macro] * servings)
    })
    return sum.toFixed()
  }

  const keyRow = 
    <ul className='grid key'>
      <li className='name'><div>Name</div></li>
      <li className='amount'><div>Amount</div></li>
      <li className='measure' ><div>Measure</div></li>
      <li className='macro calories' ><div>Calories</div></li>
      <li className='macro fat' ><div>Fat</div></li>
      <li className='macro carbs' ><div>Carbs</div></li>
      <li className='macro protein' ><div>Protein</div></li>
      <li className='deleteColumn'></li>
    </ul>
  
  const compareForStyle = (macro) =>{
    // debugger
    if (!props.user.email){return null}
    if (autoSum(macro) < props.goal[macro] - 5) {
      return 'under'
    }else if(autoSum(macro) > props.goal[macro] + 5) {
      return 'over'
    }else{return 'good'}
  }

  const totalsRow = () => {
    return  <ul className='grid totalsRow'>
      <li className='totals'><span>TOTALS:</span></li>
      <li className={`calories macro`} placeholder='grams'>{autoSum('calories')}</li>
      <li className={`fat macro ${compareForStyle('fat')}`}>{autoSum('fat')}</li>
      <li className={`carbs macro ${compareForStyle('carbs')}`}>{autoSum('carbs')}</li>
      <li className={`protein macro ${compareForStyle('protein')}`}>{autoSum('protein')}</li>
      <li className='deleteColumn'></li>
    </ul>
  }

  const macrosLeftRow = () => {
    return  <ul className='grid totalsRow'>
      <li className='totals'><span>remaining:</span></li>
      <li className={`calories macro`} placeholder='grams'>{(props.goal.calories - autoSum('calories')) || 0}</li>
      <li className={`fat macro ${compareForStyle('fat')}`}>{(props.goal.fat - autoSum('fat')) || 0}</li>
      <li className={`carbs macro ${compareForStyle('carbs')}`}>{(props.goal.carbs - autoSum('carbs')) || 0}</li>
      <li className={`protein macro ${compareForStyle('protein')}`}>{(props.goal.protein - autoSum('protein')) || 0}</li>
      <li className='deleteColumn'></li>
    </ul>
  }


    // console.log(props)
    return(
      <div className='table'>
        {localStorage.getItem('token') ? < GoalsRow /> : 
          <div className='welcome'>
          <h1>WELCOME TO HAM</h1>
          <h2>a simple macronutrient tracker</h2>
          <hr/>
          </div>
        }
        {totalsRow()}
        {macrosLeftRow()}
        {keyRow}
        {props.categories.sort((x, y) => x.created_at - y.created_at).map(category => {
        return <CategoryCard category={category} key={category.id} />
        })}
        {/* {keyRow} */}
        {/* {totalsRow()} */}
        {/* <button className='saveButton' onClick={() => props.saveAll(props)}>Save</button> */}
        {props.loading? <div className='loading'></div> : null}
        {/* <div className='loading'></div> */}
      </div>
    ) 
  
}

const mapStateToProps = (state) => { // LIMIT TO WHAT THIS COMPONENT IS USING!
  // console.log('Choice Container state to props', state)
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    addChoices: (choices) => dispatch({ type: 'ADD_CHOICES', payload: choices}),
    selectUser: (user) => dispatch({ type: 'SELECT_USER', payload: user}),
    editGoal: (info) => dispatch({ type: 'EDIT_GOAL', payload: info}),
    changeGoal: (id) => dispatch({ type: 'CHANGE_GOAL', payload: id}),
    updateGoal: (goal) => dispatch(updateGoal(goal)),
    createGoal: (state) => dispatch(createGoal(state)),
    saveAll: (state) => dispatch(saveAll(state)),
    editGoalName: (name) => dispatch({ type: 'EDIT_GOAL_NAME', payload: name}),
    deleteGoal: id => dispatch(deleteGoal(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceContainer)