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

// export const reauth = () => {
//   return (dispatch) => {
//     dispatch({type: 'START_LOADING'})
//     return fetch(`${URL}/reauth`, {
//       method: 'POST',
//       headers: HEADERS()
//     })
//     .then(response => {
//       return response.json()
//     })
//     .then(jwtAndUser => {
//       // console.log(jwtAndUser)
//       dispatch({type: 'STOP_LOADING'})
//       if (jwtAndUser.user && jwtAndUser.jwt) {
//         // console.log(jwtAndUser)
//         dispatch({ type: 'SELECT_USER', payload: jwtAndUser})
//       }
//     })
//   }
// }