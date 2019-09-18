import {URL, HEADERS} from '../constants'

export const forgotPassword = (email) => {
  return (dispatch) => {
    return fetch(`${URL}/password/forgot`, {
      method: 'POST',
      headers: HEADERS(),
      body: JSON.stringify({
        email: email
      })
    })
  }
}

export const resetPassword = (user) => {
  return (dispatch) => {
    return fetch(`${URL}/password/reset`, {
      method: 'POST',
      headers: HEADERS(),
      body: JSON.stringify({
        user: user
      })
    })
  }
}