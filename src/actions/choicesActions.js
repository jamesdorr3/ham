import {URL, HEADERS} from '../constants'

const fetchChoices = () => {
  return (dispatch) => {
    return fetch(`${URL}/choices`, {headers: HEADERS()})
      .then(r => r.json())
      .then(choicesArray => dispatch({ type: 'ADD_CHOICES', payload: choicesArray}))
    }
  }

// fetchChoices = () => {
//   fetch(`${URL}/choices`, {headers: HEADERS()})
//   .then(r => r.json())
//   .then(choicesArray => this.props.addChoices(choicesArray))
// }

export default (fetchChoices)
