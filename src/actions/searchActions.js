import {URL, HEADERS} from '../constants'

export const selectSearchResult = (prop) => {
  return (dispatch) => {
    return fetch(`${URL}search/make_choice?${prop}`, {headers: HEADERS()})
    .then(r => r.json())
    .then(choiceAndFood => {
      // debugger
      dispatch({ type: 'ADD_CHOICE', payload: choiceAndFood})
    })
  }
}

export const selectInternalSearchResult = (idAndCategory) => {
  return (dispatch) => {
    return fetch(`${URL}/choices`, {method: 'POST', headers: HEADERS(), body: JSON.stringify(idAndCategory)})
    .then(r => r.json())
    .then(choiceFood  => {
      // debugger
      dispatch({ type: 'ADD_CHOICE', payload: choiceFood})
    })
  }
}