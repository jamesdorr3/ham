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
  }
}