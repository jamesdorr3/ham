import {URL, HEADERS} from '../constants'

export const updateGoal = (goal) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    dispatch({type: 'EDIT_GOAL', payload: goal})
    return fetch(`${URL}/goals/${goal.id}`, {
      method: 'PATCH', 
      headers: HEADERS(),
      body: JSON.stringify({goal})
    })
    .then(r => dispatch({type: 'STOP_LOADING'}))
  }
}

export const createGoal = (userId) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}/goals`, {
      method: 'POST', 
      headers: HEADERS(),
      body: JSON.stringify({name: 'New Goal', user_id: userId})
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
    return fetch(`${URL}/goals/${id}`, {method: 'DELETE', headers: HEADERS()})
    .then(r => dispatch({type: 'DELETE_GOAL', payload: id}))
  }
}