import '../constants.js'

const initialState = {
  choices: []
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHOICES': {
      return {...state, choices: [...state.choices, ...action.payload]}
    }
    case 'DELETE_CHOICE': {
      fetch(`${URL}/choices/${action.payload}`, {method: 'DELETE'})
      return {...state, choices: state.choices.filter(x => x.id !== action.payload)}
    }
    default: {
      return state
    }
  }
}

export default reducer