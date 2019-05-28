import {URL, HEADERS} from '../constants'

export const updateGoal = (goal) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}/goals/${goal.id}`, {
      method: 'PATCH', 
      headers: HEADERS(),
      body: JSON.stringify({goal})
    })
    .then(r => dispatch({type: 'STOP_LOADING'}))
  }
}

export const createGoal = (goal) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}/goals`, {
      method: 'POST', 
      headers: HEADERS(),
      body: JSON.stringify({goal})
    })
    .then(r => r.json())
    .then(goal => {
      dispatch({type: 'STOP_LOADING'})
      dispatch({type: 'ADD_GOAL', payload: goal})
    })
  }
}

export const deleteGoal = id => {
  return dispatch => {
    dispatch({type: 'DELETE_GOAL', payload: id})
    return fetch(`${URL}/goals/${id}`, {method: 'DELETE', headers: HEADERS()})
  }
}