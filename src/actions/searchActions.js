import {URL, HEADERS} from '../constants'

export const selectSearchResult = (props) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}search/make_choice`, {
      method: 'POST',
      headers: HEADERS(),
      body: JSON.stringify(props)
    })
    .then(r => r.json())
    .then(choiceAndFood => {
      console.log(choiceAndFood.resp)
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

export const internalSearch = (searchTerm) => {
  return dispatch => {
    return fetch(`${URL}search/internal_search?q=${searchTerm}`, {headers: HEADERS()})
  }
}

export const favoriteSearch = (searchTerm) => {
  return dispatch => {
    return fetch(`${URL}search/favorite_search?q=${searchTerm}`, {headers: HEADERS()})
  }
}

export const externalSearch = searchTerm => {
  return dispatch => {
    return fetch(`${URL}search/many?q=${searchTerm}`, {headers: HEADERS()})
  }
}