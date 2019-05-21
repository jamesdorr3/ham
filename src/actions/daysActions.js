import {URL, HEADERS} from '../constants'

export const createDay = () => {
  return (dispatch) => {
    return fetch(`${URL}/days`, {
      method: 'POST', 
      headers: HEADERS()
    })
    .then(r => r.json())
    .then(day => dispatch({ type: 'SELECT_DAY', payload: day}))
  }
}