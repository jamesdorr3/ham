import {URL, HEADERS} from '../constants'

export const createFood = (food) => {
  return (dispatch) => {
    return fetch(`${URL}/foods`, {
      method: 'POST',
      headers: HEADERS(),
      body: JSON.stringify(food)
    })
    .then(r => r.json())
    .then(choiceFood => dispatch({type: 'ADD_FOOD', payload: choiceFood}))
  }
}
