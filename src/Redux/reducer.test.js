import reducer from './reducer'

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
  error: {},
  loading: false
}

describe('undefined reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      initialState
    )
  })
})



// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_CHOICE': {
//       // debugger
//       return {...state, choiceFoods: [...state.choiceFoods, {
//         choice: {...action.payload.choice, id: action.payload.choice.id || Date.now()},
//         food: action.payload.food,
//         measures: action.payload.measures
//       }]}
//     }
//     case 'ADD_CHOICES': {
//       debugger
//       return {...state, choiceFoods: [...state.choiceFoods, ...action.payload]}
//     }
//     case 'DELETE_CHOICE': {
//       return {...state, choiceFoods: state.choiceFoods.filter(x => x.choice.id !== action.payload)}
//     }
//     case 'SELECT_USER': {
//       // debugger
//       return {
//         categories: action.payload.user.categories,
//         choiceFoods: action.payload.user.choice_foods,
//         day: action.payload.user.day,
//         days: action.payload.user.days,
//         goal: action.payload.user.goal,
//         goals: action.payload.user.goals,
//         user: {
//           email: action.payload.user.email,
//           id: action.payload.user.id,
//           username: action.payload.user.username
//         }
//       }
//     }
//     case 'EDIT_GOAL': {
//       return {
//         ...state,
//         goal: {
//           ...state.goal,
//           ...action.payload
//         },
//         goals: [
//           ...state.goals.filter(x => x.id !== state.goal.id),
//           {
//             ...state.goal,
//             ...action.payload
//           }
//         ]
//       }
//     }
//     case 'CHANGE_GOAL': {
//       const id = action.payload
//       const goal = state.goals.find(x => x.id === parseInt(id))
//       return {
//         ...state,
//         goal: goal
//       }
//     }
//     case 'SIGN_OUT': {
//       // console.log('sign out')
//       return {
//         ...state,
//         choiceFoods: [],
//         goal: {},
//         goals: [],
//         user: {}
//       }
//     }
//     case 'HANDLE_DROP': {
//       const newChoices = []
//       const choicesIds = action.payload.choicesIds
//       for (let i = 0; i < choicesIds.length; i ++) {
//         const choiceFood = state.choiceFoods.find(x => x.choice.id === parseInt(choicesIds[i]))

//         // debugger
//         newChoices.push({...choiceFood, choice: {...choiceFood.choice, index: i}})
//       }
//       const choiceFood = newChoices.find(x => x.choice.id === action.payload.choiceId)
//       choiceFood.choice.category_id = action.payload.categoryId
//       // debugger
//       return {
//         ...state,
//         choiceFoods: newChoices
//       }
//     }
//     case 'ADD_DAY': {
//       return {
//         ...state,
//         choiceFoods: [],
//         day: action.payload,
//         days: [...state.days, {...action.payload, goal_id: action.payload.goal.id}],
//         goal: action.payload.goal
//       }
//     }
//     case 'SELECT_DAY': {
//       // debugger
//       return {
//         ...state,
//         choiceFoods: action.payload.choice_foods,
//         day: {
//           date: action.payload.date,
//           id: action.payload.id,
//           name: action.payload.name
//         },
//         goal: action.payload.goal,
//       }
//     }
//     case 'ADD_FOOD': {
//       // debugger
//       return {
//         ...state,
//         choiceFoods: [...state.choiceFoods, action.payload]
//       }
//     }
//     case 'EDIT_CHOICE': {
//       const choiceFood = state.choiceFoods.find(x => x.choice.id === action.payload.choice.id)
//       return {
//         ...state,
//         choiceFoods: [
//           ...state.choiceFoods.filter(x => parseInt(x.choice.id) !== parseInt(choiceFood.choice.id)),
//           {
//             ...choiceFood,
//             choice: {...choiceFood.choice, ...action.payload.choice}
//           }
//         ]
//       }
//     }
//     case 'EDIT_DAY': {
//       return {
//         ...state,
//         day: {
//           ...state.day,
//           ...action.payload
//         },
//         days: [
//           ...state.days.filter(x => x.id !== state.day.id),
//         {...state.day,
//           ...action.payload
//         }
//         ]
//       }
//     }
//     case 'ADD_GOAL': {
//       return {
//         ...state,
//         goal: action.payload,
//         goals: [
//           ...state.goals,
//           action.payload
//         ]
//       }
//     }
//     case 'START_LOADING': {
//       return {
//         ...state,
//         loading: true
//       }
//     }
//     case 'STOP_LOADING': {
//       return {
//         ...state,
//         loading: false
//       }
//     }
//     case 'DELETE_DAY': {
//       return {
//         ...state,
//         days: state.days.filter(x => x.id !== parseInt(action.payload))
//       }
//     }
//     case 'DELETE_GOAL': {
//       return {
//         ...state,
//         goals: state.goals.filter(x => x.id !== parseInt(action.payload))
//       }
//     }
//     default: {
//       return state
//     }
//   }
// }

// export default reducer