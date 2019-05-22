import {URL, HEADERS} from '../constants'

export const auth = (info) => {
  return (dispatch) => {
    console.log(info)
    return fetch(`${URL}/auth`, {
      method: 'POST',
      headers: HEADERS(),
      body: JSON.stringify({
        user: {
          username_or_email: info.usernameOrEmail,
          password: info.password
        }
      })
    })
    .then(r => r.json())
    .then(jwtAndUser => {
      debugger
      if (jwtAndUser.user && jwtAndUser.jwt) {
        localStorage.setItem('token', jwtAndUser.jwt)
        dispatch({ type: 'SELECT_USER', payload: jwtAndUser})
      }
      else {
        debugger
      }
    })
  }
}

export const reauth = () => {
  return (dispatch) => {
    return fetch(`${URL}/reauth`, {
      method: 'POST',
      headers: HEADERS()
    })
    .then(response => {
      return response.json()
    })
    .then(jwtAndUser => {
      // debugger
      if (jwtAndUser.user && jwtAndUser.jwt) {
        // console.log(jwtAndUser)
        dispatch({ type: 'SELECT_USER', payload: jwtAndUser})
      }
    })
  }
}