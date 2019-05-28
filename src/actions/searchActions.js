import {URL, HEADERS} from '../constants'

export const selectSearchResult = (prop) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}search/make_choice?${prop}`, {headers: HEADERS()})
    .then(r => r.json())
    .then(choiceAndFood => {
      dispatch({type: 'STOP_LOADING'})
      dispatch({ type: 'ADD_CHOICE', payload: choiceAndFood})
    })
  }
}

export const selectInternalSearchResult = (idAndCategory) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}/choices`, {method: 'POST', headers: HEADERS(), body: JSON.stringify(idAndCategory)})
    .then(r => r.json())
    .then(choiceFood  => {
      // debugger
      dispatch({type: 'STOP_LOADING'})
      dispatch({ type: 'ADD_CHOICE', payload: choiceFood})
    })
  }
}