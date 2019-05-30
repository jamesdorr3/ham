import React from 'react'
import {connect} from 'react-redux'
import {selectSearchResult} from '../actions/searchActions'
import {createGoal} from '../actions/goalsActions'

class UsernameCard extends React.Component {

  state = {
    showUserInfo: false,
    feet: null,
    inches: null,
    weight: null,
    bodyFat: null,
    age: null,
    gender: 50,
    activityLevel: 1.2
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let bmrCals;
    if (this.state.bodyFat) {
      bmrCals = (this.katchMcArdle() + this.mifflin()) / 2
    }
    else{
      bmrCals = this.mifflin()
    }
    this.props.createGoal({calories: bmrCals, name: 'basal metabolic rate', user_id: this.props.user.id})
    this.setState({showUserInfo: false})
  }

  katchMcArdle = () => { // Katch-Mcardle formula and Harris Benedict Equation
    const lbmPounds = this.state.weight - (this.state.weight * (this.state.bodyFat / 100))
    const lbmKilos = lbmPounds / 2.2
    const bmr = 370 + (21.6 * lbmKilos)
    const cals = bmr * this.state.activityLevel
    return cals
  }

  mifflin = () => {
    const weightKG = this.state.weight / 2.2
    const heightCM = (this.state.feet * 12 + parseInt(this.state.inches)) * 2.54
    const ageCalc = (5 * this.state.age)
    const genderCalc = (166 * (this.state.gender / 100) - 161)
    const bmr = 10 * weightKG + 6.25 * heightCM - ageCalc + genderCalc
    const cals = bmr * this.state.activityLevel
    return cals
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  activityLevelSelect = () => {
    const levels = [
      {name: 'sedentary', multiplier: 1.2}, 
      {name: 'lightly active', multiplier: 1.375}, 
      {name: 'moderately active', multiplier: 1.55}, 
      {name: 'very active', multiplier: 1.725}, 
      {name: 'extremely active', multiplier: 1.9}]
    return <select name='activityLevel' onChange={this.handleChange}>
    {levels.map(opt => {
        return <option name={opt.name} value={opt.multiplier} >{opt.name}</option>
      })}
    </select>
  }

  render(){
    return(
      <>
      <div className="third centered email" onClick={() => this.setState({showUserInfo: !this.state.showUserInfo})}>{this.props.user.username} {this.state.showUserInfo? '△' : '▽'}</div> 
      <div className='userModal' style={{display: this.state.showUserInfo ? 'inline' : 'none'}}>
        <h2>User Info</h2>
        <p>username: {this.props.user.username}</p>
        <p>email: {this.props.user.email}</p>
        <h2>Generate Macros</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Height</label>
          <span>
            <input required type='number' min='1' max='7' placeholder='feet' name='feet' className='height' onChange={this.handleChange} ></input>
            <input required type='number' min='0' max='11' placeholder='inches' name='inches' className='height' onChange={this.handleChange}></input>
          </span>
          <label>Weight (lbs)</label>
          <input required type='number' min='1' max='1500' className='sensitive' placeholder='hidden' name='weight' onChange={this.handleChange}></input>
          <label>Body Fat %</label>
          <input type='number' min='2' max='90' className='sensitive' placeholder='optional & hidden' name='bodyFat' onChange={this.handleChange}></input>
          <label>Age</label>
          <input required type='number' min='18' max='130' pattern='[0-9]*' placeholder='age' name='age' onChange={this.handleChange}></input>
          <label className='gender'>Gender</label>
          <span className='gender'>
            <label>female</label>
            <input type='range' name='gender' onChange={e => console.log(e.target.value)} onChange={this.handleChange}></input>
            <label>male</label>
          </span>
          <label>Activity Level</label>
          {this.activityLevelSelect()}
          <input type='submit' value='Generate Macros' />
        </form>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return{
    createGoal: (props) => dispatch(createGoal(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsernameCard)