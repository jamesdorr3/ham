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

export const selectDay = (id) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}/days/${id}`, {headers: HEADERS()})
    .then(r => r.json())
    .then(dayAndInfo => {
      dispatch({type: 'STOP_LOADING'})
      dispatch({ type: 'SELECT_DAY', payload: dayAndInfo})
    })
  }
}

export const deleteDay = id => {
  // debugger
  return dispatch => {
    dispatch({type: 'DELETE_DAY', payload: id})
    return fetch(`${URL}/days/${id}`, {method: 'DELETE', headers: HEADERS()})
  }
}

export const updateDay = day => {
  return dispatch => {
    return fetch(`${URL}days/${day.id}`, {
      method: 'PATCH',
      headers: HEADERS(),
      body: JSON.stringify(day)
    })
  }
}

export const copyDay = id => {
  return dispatch => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}days/copy/${id}`, {headers: HEADERS()})
    .then(r => r.json())
    .then(r => {
      dispatch({type: 'STOP_LOADING'})
      dispatch({ type: 'ADD_DAY', payload: r})
      dispatch({ type: 'SELECT_DAY', payload: r})
    })
  }
}