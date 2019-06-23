export const URL = 'https://polarcoast.herokuapp.com/https://ham-backend.herokuapp.com/'
// export const URL = 'http://localhost:3001/'

export const HEADERS = () => ({
  'Content-Type':'application/json',
  Accept: 'application/json',
  Authorization: localStorage.getItem('token') ? `BEARER ${localStorage.getItem('token')}` : null
  // Authorization: // upcase or title?
})