import {URL, HEADERS} from '../constants'

export const saveAll = (state) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}/saveall`, {
      method: 'PATCH',
      headers: HEADERS(),
      body: JSON.stringify(state)
    })
    .then(r => dispatch({type: 'STOP_LOADING'}))
  }
}
