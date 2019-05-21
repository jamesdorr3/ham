import {URL, HEADERS} from '../constants.js'

const initialState = {
  days: [],
  categories: [],
  choices: [],
  goal: {},
  goals: [],
  user: {},
  error: {}
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHOICE': {
      return {...state, choices: [...state.choices, {...action.payload.choice, food: action.payload.food}]}
    }
    case 'ADD_CHOICES': {
      debugger
      return {...state, choices: [...state.choices, ...action.payload]}
    }
    case 'DELETE_CHOICE': {
      return {...state, choices: state.choices.filter(x => x.choice.id !== action.payload)}
    }
    case 'UPDATE_CHOICE': {
      // debugger
      const choice = state.choices.find(x => x.choice.id === parseInt(action.payload.id))
      choice.choice[action.payload.name] = action.payload.value // ?
      // debugger
      return {
        ...state,
        choices: [
          ...state.choices.filter(x => x.choice.id !== parseInt(action.payload.id)),
          {...choice, [action.payload.name]: action.payload.value}
        ]
      }
    }
    case 'SELECT_USER': {
      // debugger
      return {
        days: action.payload.user.days,
        categories: action.payload.user.last_day_categories,
        choices: action.payload.user.last_day_choices_and_foods,
        goal: action.payload.user.goals[0],
        goals: action.payload.user.goals,
        user: {
          email: action.payload.user.email,
          id: action.payload.user.id,
          username: action.payload.user.username
        }
      }
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.name]: action.payload.value
        }
      }
    }
    case 'SIGN_OUT': {
      // console.log('sign out')
      return {
        ...state,
        user: {},
        choices: []
      }
    }
    case 'UPDATE_INDEX': {
      const newChoices = []
      const choicesIds = action.payload.choicesIds
      for (let i = 0; i < choicesIds.length; i ++) {
        const choice = state.choices.find(x => x.choice.id === parseInt(choicesIds[i]))
        // debugger
        newChoices.push({choice: {...choice.choice, index: i}, food: choice.food})
      }
      return {
        ...state,
        choices: newChoices
      }
    }
    case 'REAUTH': {
      return state
    }
    default: {
      return state
    }
  }
}

export default reducer