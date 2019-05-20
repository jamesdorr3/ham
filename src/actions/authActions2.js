import {URL, HEADERS} from '../constants'

const auth = (info) => {
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
      if (jwtAndUser.user && jwtAndUser.jwt) {
        localStorage.setItem('token', jwtAndUser.jwt)
        dispatch({ type: 'SELECT_USER', payload: jwtAndUser})
      }
    })
  }
}

export default (auth)