import React from 'react'
import {connect} from 'react-redux'
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
    activityLevel: 1.2,
    calorieGoalAdjuster: 1,
    macroGoal: 'high protein - lift day',
    fat: 40,
    carbs: 30,
    protein: 30,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let tdeeCals;
    if (this.state.bodyFat) {
      tdeeCals = (this.katchMcArdle() + this.mifflin()) / 2
    }
    else{
      tdeeCals = this.mifflin()
    }

    tdeeCals = tdeeCals * parseFloat(this.state.calorieGoalAdjuster)

    let calorieGoalDescriptor
    if(this.state.calorieGoalAdjuster > 1){calorieGoalDescriptor="gain weight"}
    else if(this.state.calorieGoalAdjuster < 1){calorieGoalDescriptor="lose weight"}
    else{calorieGoalDescriptor="maintain weight"}
    
    this.props.createGoal({
      calories: tdeeCals.toFixed(), 
      fat: ((tdeeCals * parseInt(this.state.fat)) / 900).toFixed(),
      carbs: ((tdeeCals * parseInt(this.state.carbs)) / 400).toFixed(),
      protein: ((tdeeCals * parseInt(this.state.protein)) / 400).toFixed(),
      name: `${this.state.macroGoal} to ${calorieGoalDescriptor}`, 
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
      {name: "0 times", oldName: 'Sedentary - little or no exercise, desk job', multiplier: 1.2}, 
      {name: "lightly 1 to 3 times", oldName: 'lightly active - light exercise, sports 1-3 days a week', multiplier: 1.375}, 
      {name: "moderately 3 to 5 times", oldName: 'moderately active - moderate exercise, sports 3-5 days a week', multiplier: 1.55}, 
      {name: "hard 6 to 7 times", oldName: 'very active - hard exercise, sports 6-7 days a week', multiplier: 1.725}, 
      {name: "extremely hard, at least every day", oldName: 'extremely active - hard daily exercise, sports and physical job, or 2x a day exercise', multiplier: 1.9}]
    return <select value={this.state.activityLevel} className='activityLevel' name='activityLevel' onChange={this.handleChange}>
    {levels.map(opt => {
        return <option name={opt.name} key={opt.name} value={opt.multiplier} >{opt.name}</option>
      })}
    </select>
  }

  calorieGoalAdjusterSelect = () => {
    const calorieGoals = [
      {name: "gain weight: +5% calories", multiplyer: 1.05},
      {name: "maintain weight", multiplyer: 1},
      {name: "lose weight: -5% calories", multiplyer: 0.95},
    ]
    return <select value={this.state.calorieAdjuster} name='calorieGoalAdjuster' onChange={this.handleChange}>
      {calorieGoals.map(goal => <option name={goal.name} key={goal.name} value={goal.multiplier}>{goal.name}</option>)}
    </select>
  }

  macroGoalsSelect = () => {
    const macroGoals = [
      {name: 'high protein - rest day', fat: 45, carbs: 20, protein: 35},
      {name: 'high protein - lift day', fat: 40, carbs: 30, protein: 30},
      {name: 'keto - low carb', fat: 60, carbs: 5, protein: 35},
      {name: 'moderate-carb / paleo', fat: 40, carbs: 30, protein: 30},
      {name: 'shipscale.com weightloss and muscle gain', fat: 35, carbs: 30, protein: 35},
      {name: 'myFitnessPal', fat: 30, carbs: 50, protein: 20},
      // {name: 'healthyeater.com', fat: 30, carbs: calc(), protein: 20},
    ]
    const selfchange = (e) => {
      this.handleChange(e)
      const goalProfile = macroGoals.filter(x=>x.name === e.target.value)[0]
      this.setState({fat: goalProfile.fat, carbs: goalProfile.carbs, protein: goalProfile.protein})
    }
    return <select value={this.state.macroGoal} name='macroGoal' onChange={selfchange}>
      {macroGoals.map(goal => <option name={goal.name} key={goal.name} value={goal.name}>{goal.name}</option>)}
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
          <div><label>exercise per week</label>
          {this.activityLevelSelect()}</div>
          <div>
            <label>Calorie Goal</label>
            {this.calorieGoalAdjusterSelect()}
          </div>
          <div>
            <label>Macro Profile</label>
            {this.macroGoalsSelect()}
          </div>
          <div>
            <label>% calories from</label>
            <label className='macrosForAutogenerate' >Fat</label>
            <input className='macrosForAutogenerate' name='fat' type='number' value={this.state.fat} onChange={this.handleChange} />
            <label className='macrosForAutogenerate' >carbs</label>
            <input className='macrosForAutogenerate' name='carbs' type='number' value={this.state.carbs} onChange={this.handleChange} />
            <label className='macrosForAutogenerate' >protein</label>
            <input className='macrosForAutogenerate' name='protein' type='number' value={this.state.protein} onChange={this.handleChange} />
          </div>
          <div>
            <label id='autoMacrosSum'>Total</label>
            {parseInt(this.state.fat) + parseInt(this.state.carbs) + parseInt(this.state.protein)}%
          </div>
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