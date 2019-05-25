import {URL, HEADERS} from '../constants'

export const saveAll = (state) => {
  return (dispatch) => {
    return fetch(`${URL}/saveall`, {
      method: 'PATCH',
      headers: HEADERS(),
      body: JSON.stringify(state)
    })
  }
}
