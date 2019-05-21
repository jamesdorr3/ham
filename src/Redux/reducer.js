import {URL, HEADERS} from '../constants.js'

const initialState = {
  categories: [],
  days: [],
  choiceFoods: [],
  goal: {},
  goals: [],
  user: {},
  error: {}
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHOICE': {
      debugger
      return {...state, choiceFoods: [...state.choiceFoods, action.payload]}
    }
    case 'ADD_CHOICES': {
      debugger
      return {...state, choiceFoods: [...state.choiceFoods, ...action.payload]}
    }
    case 'DELETE_CHOICE': {
      return {...state, choiceFoods: state.choiceFoods.filter(x => x.choice.id !== action.payload)}
    }
    case 'UPDATE_CHOICE': {
      // debugger
      const choice = state.choiceFoods.find(x => x.choice.id === parseInt(action.payload.id))
      choice.choice[action.payload.name] = action.payload.value // ?
      // debugger
      return {
        ...state,
        choiceFoods: [
          ...state.choiceFoods.filter(x => x.choice.id !== parseInt(action.payload.id)),
          {...choice, [action.payload.name]: action.payload.value}
        ]
      }
    }
    case 'SELECT_USER': {
      return {
        categories: action.payload.user.categories,
        choiceFoods: action.payload.user.choice_foods,
        day: action.payload.user.day,
        days: action.payload.user.days,
        goal: action.payload.user.goal,
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
        choiceFoods: []
      }
    }
    case 'UPDATE_INDEX': {
      const newChoices = []
      const choicesIds = action.payload.choicesIds
      for (let i = 0; i < choicesIds.length; i ++) {
        const choice = state.choiceFoods.find(x => x.choice.id === parseInt(choicesIds[i]))
        // debugger
        newChoices.push({choice: {...choice.choice, index: i}, food: choice.food})
      }
      return {
        ...state,
        choiceFoods: newChoices
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