import {URL, HEADERS} from '../constants'

const fetchChoices = () => {
  return (dispatch) => {
    return fetch(`${URL}/choices`, {headers: HEADERS()})
      .then(r => r.json())
      .then(choicesArray => {
        if (choicesArray[0]) {
          dispatch({ type: 'ADD_CHOICES', payload: choicesArray})
        }
      })
    }
  }

export default (fetchChoices)
