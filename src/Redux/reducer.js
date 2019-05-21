import {URL, HEADERS} from '../constants.js'

const initialState = {
  categories: [],
  day: {},
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
      // debugger
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
      // debugger
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
    case 'CHANGE_GOAL': {
      // debugger
      return {
        ...state,
        goal: {
          ...state.goal,
          ...action.payload
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
    case 'HANDLE_DROP': {
      const newChoices = []
      const choicesIds = action.payload.choicesIds
      for (let i = 0; i < choicesIds.length; i ++) {
        const choiceFood = state.choiceFoods.find(x => x.choice.id === parseInt(choicesIds[i]))
        // debugger
        newChoices.push({choice: {...choiceFood.choice, index: i}, food: choiceFood.food})
      }
      const choiceFood = newChoices.find(x => x.choice.id === action.payload.choiceId)
      choiceFood.choice.category_id = action.payload.categoryId
      // debugger
      return {
        ...state,
        choiceFoods: newChoices
      }
    }
    case 'ADD_DAY': {
      return {
        ...state,
        day: action.payload,
        days: [...state.days, {...action.payload, goal_id: action.payload.goal.id}],
        goal: action.payload.goal
      }
    }
    case 'SELECT_DAY': {
      // debugger
      return {
        ...state,
        categories: action.payload.unique_categories,
        choiceFoods: action.payload.choice_foods,
        day: {
          created_at: action.payload.created_at,
          id: action.payload.id,
          name: action.payload.name
        },
        goal: action.payload.goal,
      }
    }
    default: {
      return state
    }
  }
}

export default reducer