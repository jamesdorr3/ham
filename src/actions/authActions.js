import {URL, HEADERS} from '../constants'

const reauth = () => {
  return (dispatch) => {
    return fetch(`${URL}/reauth`, {
      method: 'POST',
      headers: HEADERS()
    })
    .then(response => {
      return response.json()
    })
    .then(jwtAndUser => {
      if (jwtAndUser.user && jwtAndUser.jwt) {
        dispatch({ type: 'SELECT_USER', payload: jwtAndUser})
      }
    })
  }
}

// const auth = (info) => {
//   return (dispatch) => {
//     console.log(info)
//     return fetch(`${URL}/auth`, {
//       method: 'POST',
//       headers: HEADERS(),
//       body: JSON.stringify({
//         user: {
//           username_or_email: info.usernameOrEmail,
//           password: info.password
//         }
//       })
//     })
//     // .then(r => r.json())
//     // .then(jwtAndUser => {
//     //   if (jwtAndUser.user && jwtAndUser.jwt) {
//     //     this.props.selectUser(jwtAndUser)
//     //     localStorage.setItem('token', jwtAndUser.jwt)
//     //     this.fetchChoices()
//     //   }
//     // })
//   }
// }

export default (reauth//, auth)
)
