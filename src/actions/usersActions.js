import {URL, HEADERS} from '../constants'

export const createUser = (user) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}/users`, {
      method: 'POST', 
      headers: HEADERS(),
      body: JSON.stringify({
        user: user
      })
    })
    .then(r => r.json())
    .then(resp => {
      dispatch({type: 'STOP_LOADING'})
      if (resp.user && resp.jwt) {
        localStorage.setItem('token', resp.jwt)
        dispatch({ type: 'SELECT_USER', payload: resp})
        return resp
      }
    })
  }
}