import {URL, HEADERS} from '../constants'

export const createFood = (food) => {
  // debugger
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}/foods`, {
      method: 'POST',
      headers: HEADERS(),
      body: JSON.stringify(food)
    })
    .then(r => r.json())
    .then(choiceFood => {
      dispatch({type: 'STOP_LOADING'})
      dispatch({type: 'ADD_FOOD', payload: choiceFood})
    })
  }
}

export const foodsIndex = (searchTerm) => {
  return dispatch => {
    return fetch(`${URL}/foods?q=${searchTerm}`, {headers: HEADERS()})
  }
}