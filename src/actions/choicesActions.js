import {URL, HEADERS} from '../constants'

export const updateChoice = (choiceObj) => {
  return dispatch => {
    return fetch(`${URL}choices/${choiceObj.id}`, {
      method: 'PATCH',
      headers: HEADERS(),
      body: JSON.stringify({choice: choiceObj})
    })
  }
}

export const destroyChoice = (id) => {
  return dispatch => {
    return fetch(`${URL}/choices/${id}`, {method: 'DELETE'})
  }
}