import {URL, HEADERS} from '../constants'

const fetchChoices = () => {
  return (dispatch) => {
    return fetch(`${URL}/choices`, {headers: HEADERS()})
      .then(r => r.json())
      .then(choicesArray => {
        if (choicesArray[0]) {
          dispatch({ type: 'ADD_CHOICES', payload: choicesArray})
          // debugger
          // choicesArray.map(choice => {
          //   if (choice.food){ return choice}
          //   else {
          //     // debugger
          //     const prop = (choice.nix_id) ? 
          //     `id=${choice.nix_id}`: 
          //     `name=${choice.nix_name}`
          //     fetch(`${URL}/search/get_nix_food?${prop}`)
          //     .then(r => r.json())
          //     .then(food => {
          //       dispatch({ type: 'ADD_CHOICE', payload: {choice: choice, food: food}})
          //     })
          //   }
          // })
          // dispatch({ type: 'ADD_CHOICES', payload: choicesArray})
        }
      })
    }
  }

export default (fetchChoices)
