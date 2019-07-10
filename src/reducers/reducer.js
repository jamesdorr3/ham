// import {URL, HEADERS} from '../constants.js'
// const initialState = {
//   choices: [],
//   user: {}
// }


// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_CHOICES': {
//       return {...state, choices: [...state.choices, ...action.payload]}
//     }
//     case 'DELETE_CHOICE': {
//       fetch(`${URL}/choices/${action.payload}`, {method: 'DELETE'})
//       return {...state, choices: state.choices.filter(x => x.id !== action.payload)}
//     }
//     case 'UPDATE_CHOICE': {
//       const choice = state.choices.find(x => x.id === parseInt(action.payload.id))
//       choice[action.payload.name] = action.payload.value // ?
//       return {
//         ...state,
//         choices: [
//           ...state.choices.filter(x => x.id !== parseInt(action.payload.id)),
//           {...choice, [action.payload.name]: action.payload.value}
//         ]
//       }
//     }
//     case 'SELECT_USER': {
//       return {...state, user: action.payload.user, choices: []}
//     }
//     case 'UPDATE_USER': {
//       return {
//         ...state,
//         user: {
//           ...state.user,
//           [action.payload.name]: action.payload.value
//         }
//       }
//     }
//     case 'SIGN_OUT': {
//       console.log('sign out')
//       return {
//         ...state,
//         user: {},
//         choices: []
//       }
//     }
//     case 'UPDATE_INDEX': {
//       const newChoices = []
//       const choicesIds = action.payload.choicesIds
//       for (let i = 0; i < choicesIds.length; i ++) {
//         const choice = state.choices.find(x => x.id === parseInt(choicesIds[i]))
//         newChoices.push({...choice, index: i})
//       }
//       return {
//         ...state,
//         choices: newChoices
//       }
//     }
//     default: {
//       return state
//     }
//   }
// }

// export default reducer