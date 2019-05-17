import {URL, HEADERS} from '../constants.js'
const initialState = {
  choices: [],
  user: {},
  jwt: null
}


const reducer = (state = initialState, action) => {
  // console.log(state)
  switch (action.type) {
    case 'ADD_CHOICES': {
      return {...state, choices: action.payload}
    }
    case 'DELETE_CHOICE': {
      fetch(`${URL}/choices/${action.payload}`, {method: 'DELETE'})
      return {...state, choices: state.choices.filter(x => x.id !== action.payload)}
    }
    case 'UPDATE_CHOICE': {
      // debugger
      const choice = state.choices.find(x => x.id === parseInt(action.payload.id))
      // const index = state.choices.indexOf(choice)
      choice[action.payload.name] = action.payload.value // ?
      // console.log(choice, state.choices)
      return {
        ...state,
        choices: [
          ...state.choices.filter(x => x.id !== parseInt(action.payload.id)),
          {...choice, [action.payload.name]: action.payload.value}
        ]
      }
    }
    case 'SELECT_USER': {
      // console.log(action)
      console.log( {...state, user: action.payload.user, jwt: action.payload.jwt})
      return {...state, user: action.payload.user, jwt: action.payload.jwt}
    }
    case 'UPDATE_USER': {
      // console.log(action.payload)
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.name]: action.payload.value
        }
      }
    }
    case 'SIGN_OUT': {
      console.log('sign out')
      return {
        ...state,
        user: {},
        choices: []
      }
    }
    default: {
      return state
    }
  }
}

export default reducer