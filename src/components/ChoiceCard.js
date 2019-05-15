import React from 'react'

const ChoiceCard = props => {
  return(
    <tr>
      <td>{props.choice.food.name}</td>
      <td>{props.choice.amount}</td>
      <td>{props.choice.measure}</td>
      <td>{props.choice.food.fat}</td>
      <td>{props.choice.food.carbs}</td>
      <td>{props.choice.food.protein}</td>
    </tr>
  )
}

export default ChoiceCard