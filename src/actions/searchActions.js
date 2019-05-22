import {URL, HEADERS} from '../constants'

export const selectSearchResult = (prop) => {
  return (dispatch) => {
    return fetch(`${URL}search/make_choice?${prop}`, {headers: HEADERS()})
    .then(r => r.json())
    .then(choiceAndFood => {
      dispatch({ type: 'ADD_CHOICE', payload: choiceAndFood})
    })
  }
}