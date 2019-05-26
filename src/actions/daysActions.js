import {URL, HEADERS} from '../constants'

export const createDay = () => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}/days`, {
      method: 'POST', 
      headers: HEADERS()
    })
    .then(r => r.json())
    .then(day => {
      dispatch({type: 'STOP_LOADING'})
      dispatch({ type: 'ADD_DAY', payload: day})
    })
  }
}

export const selectDay = (e) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    const dayId = e.target.value
    return fetch(`${URL}/days/${dayId}`, {headers: HEADERS()})
    .then(r => r.json())
    .then(dayAndInfo => {
      dispatch({type: 'STOP_LOADING'})
      dispatch({ type: 'SELECT_DAY', payload: dayAndInfo})
    })
  }
}