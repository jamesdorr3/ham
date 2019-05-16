import '../constants.js'

const initialState = {
  choices: []
}


const reducer = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case 'ADD_CHOICES': {
      return {...state, choices: [...state.choices, ...action.payload]}
    }
    case 'DELETE_CHOICE': {
      fetch(`${URL}/choices/${action.payload}`, {method: 'DELETE'})
      return {...state, choices: state.choices.filter(x => x.id !== action.payload)}
    }
    case 'UPDATE_CHOICE': {
      const choice = state.choices.find(x => x.id === parseInt(action.payload.id))
      // const index = state.choices.indexOf(choice)
      choice[action.payload.measure] = action.payload.value // ?
      // console.log(choice, state.choices)
      return {
        ...state,
        choices: [
          ...state.choices.filter(x => x.id !== parseInt(action.payload.id)),
          {...choice, [action.payload.measure]: action.payload.value}
        ]
      }
    }
    default: {
      return state
    }
  }
}

export default reducer