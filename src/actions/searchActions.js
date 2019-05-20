import {URL, HEADERS} from '../constants'

export const selectSearchResult = (prop) => {
  return (dispatch) => {
    return fetch(`${URL}search?${prop}`, {headers: HEADERS()})
    .then(r => r.json())
    .then(choice => {
      debugger
      dispatch({ type: 'ADD_CHOICE', payload: choice})
    })
  }
}