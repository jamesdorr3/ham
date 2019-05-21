import {URL, HEADERS} from '../constants'

export const updateGoal = (goal) => {
  return (dispatch) => {
    return fetch(`${URL}/goals/${goal.id}`, {
      method: 'PATCH', 
      headers: HEADERS(),
      body: JSON.stringify({goal})
    })
    .then(r => r.json())
    .then(choiceAndFood => {
      console.log(choiceAndFood)
    })
  }
}

    // fetch(`${URL}users/${this.props.user.id}`, {
    //   method: 'PATCH',
    //   headers: HEADERS(),
    //   body: JSON.stringify(this.props.user)
    // })
    // .then(r => r.json())
    // .then(r => this.setState({userNeedsSaved: false}))