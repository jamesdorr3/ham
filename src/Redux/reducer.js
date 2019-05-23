const initialState = {
  categories: [
    {name: 'Breakfast', created_at: 1, id: 1},
    {name: 'Lunch', created_at: 2, id: 2},
    {name: 'Dinner', created_at: 3, id: 3}
  ],
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
      return {...state, choiceFoods: [...state.choiceFoods, {
        choice: {...action.payload.choice, id: action.payload.choice.id || Date.now()},
        food: action.payload.food
      }]}
    }
    case 'ADD_CHOICES': {
      debugger
      return {...state, choiceFoods: [...state.choiceFoods, ...action.payload]}
    }
    case 'DELETE_CHOICE': {
      return {...state, choiceFoods: state.choiceFoods.filter(x => x.choice.id !== action.payload)}
    }
    case 'UPDATE_CHOICE': {
      const choiceFood = state.choiceFoods.find(x => x.choice.id === parseInt(action.payload.id))
      // debugger
      return {
        ...state,
        choiceFoods: [
          ...state.choiceFoods.filter(x => x.choice.id !== parseInt(action.payload.id)),
          {choice: {...choiceFood.choice, [action.payload.name]: action.payload.amount}, food: choiceFood.food}
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
        choiceFoods: [],
        goal: {},
        goals: [],
        user: {}
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
        choiceFoods: [],
        day: action.payload,
        days: [...state.days, {...action.payload, goal_id: action.payload.goal.id}],
        goal: action.payload.goal
      }
    }
    case 'SELECT_DAY': {
      // debugger
      return {
        ...state,
        choiceFoods: action.payload.choice_foods,
        day: {
          created_at: action.payload.created_at,
          id: action.payload.id,
          name: action.payload.name
        },
        goal: action.payload.goal,
      }
    }
    case 'ADD_FOOD': {
      return {
        ...state,
        choiceFoods: [...state.choiceFoods, action.payload]
      }
    }
    default: {
      return state
    }
  }
}

export default reducer