import {URL, HEADERS} from '../constants'

export const updateGoal = (goal) => {
  return (dispatch) => {
    return fetch(`${URL}/goals/${goal.id}`, {
      method: 'PATCH', 
      headers: HEADERS(),
      body: JSON.stringify({goal})
    })
    // .then(r => r.json())
    // .then(goal => {
    //   console.log(goal)
    // })
  }
}