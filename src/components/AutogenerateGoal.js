import React from 'react'
import {connect} from 'react-redux'
import {selectSearchResult} from '../actions/searchActions'
import {createGoal} from '../actions/goalsActions'

class AutogenerateGoal extends React.Component {

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
    
    this.props.createGoal({
      calories: bmrCals.toFixed(), 
      fat: 1,
      carbs: 1,
      protein: 1,
      name: 'Total Daily Energy Expenditure', 
      user_id: this.props.user.id
    })
    this.props.toggleAutogenerate()
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
        return <option name={opt.name} key={opt.name} value={opt.multiplier} >{opt.name}</option>
      })}
    </select>
  }

  render(){
    return(
      <div className='autogenerateMacros'>
        <h2>Generate Macros</h2>
        <button onClick={this.props.toggleAutogenerate}>close</button>
        <form onSubmit={this.handleSubmit}>
          <div><label>Height</label>
          <span>
            <input required type='number' min='1' max='7' placeholder='feet' name='feet' className='height' onChange={this.handleChange} ></input>
            <input required type='number' min='0' max='11' placeholder='inches' name='inches' className='height' onChange={this.handleChange}></input>
          </span></div>
          <div><label>Weight (lbs)</label>
          <input required type='number' min='1' max='1500' className='sensitive' placeholder='pounds' name='weight' onChange={this.handleChange}></input></div>
          <div><label>Body Fat %</label>
          <input type='number' min='2' max='90' className='sensitive' placeholder='(optional)' name='bodyFat' onChange={this.handleChange}></input></div>
          <div><label>Age</label>
          <input required type='number' min='18' max='130' pattern='[0-9]*' placeholder='age' name='age' onChange={this.handleChange}></input></div>
          <label className='gender'>Gender</label>
          <div><span className='gender'>
            <label>female</label>
            <input type='range' name='gender' onChange={this.handleChange}></input>
            <label>male</label>
          </span></div>
          <div><label>Activity Level</label>
          {this.activityLevelSelect()}</div>
          <input type='submit' value='Generate Macros' />
        </form>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AutogenerateGoal)