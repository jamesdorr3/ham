import {URL, HEADERS} from '../constants'

export const createDay = () => {
  return (dispatch) => {
    return fetch(`${URL}/days`, {
      method: 'POST', 
      headers: HEADERS()
    })
    .then(r => r.json())
    .then(day => dispatch({ type: 'ADD_DAY', payload: day}))
  }
}

export const selectDay = (e) => {
  return (dispatch) => {
    const dayId = e.target.value
    return fetch(`${URL}/days/${dayId}`, {headers: HEADERS()})
    .then(r => r.json())
    .then(dayAndInfo => dispatch({ type: 'SELECT_DAY', payload: dayAndInfo}))
  }
}