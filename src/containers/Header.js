import React from 'react'
import { connect } from 'react-redux'
import LoginCard from '../components/LoginCard'
import SignUpCard from '../components/SignUpCard'
import {auth, reauth} from '../actions/authActions'
import {createDay, selectDay} from '../actions/daysActions'
import {URL, HEADERS} from '../constants.js'
import {saveAll} from '../actions/saveAllAction'
import {deleteDay} from '../actions/daysActions'

class Header extends React.Component {

  state = {
    username: '',
    email: '',
    usernameOrEmail: '',
    password: '',
    signup: false,
    editDayName: false,
    showSignup: false
  }

  componentDidMount(){
    if (localStorage.getItem('token')){this.props.reauth()} // thunk
  }

  handleSignOut = () => {
    this.setState({
      username: '',
      email: '',
      usernameOrEmail: '',
      password: '',
      signup: false,
      editDayName: false,
      dayName: ''
    })
    localStorage.removeItem('token');
    this.props.signOut()
  }

  toggleSignup = (e) => {
    e.preventDefault()
    this.setState({showSignup: !this.state.showSignup})
  }

  signedIn = () => {
    return !!this.props.user.email
  }

  prettyDayDisplay = (dayObj) => {
    const day = new Date(dayObj.created_at)
    return `${day.getMonth() + 1}-${day.getDate()}-${day.getFullYear()}` + (dayObj.name ? ` ${dayObj.name}` : '' )
  }

  dayOptions = () => {
    // const days = this.props.days.filter(day => day.id !== this.props.day.id)
    const days = this.props.days.sort((x, y) => new Date(y.created_at) - new Date(x.created_at))
    return days.map(day => {
      return <option value={day.id} key={day.id} >{this.prettyDayDisplay(day)}</option>
    })
  }
  
  editDayToggle = () => {
    this.setState({editDayName: !this.state.editDayName})
  }

  handleDayNameChange = (e) => {
    this.setState({dayName: e.target.value})
  }

  submitDayName = (e) => {
    e.preventDefault()
    this.setState({editDayName: false, dayName: null})
    if (this.state.dayName && this.state.dayName !== this.props.day.name) {
      this.props.editDayName(this.state.dayName)
      this.props.startLoading()
      fetch(`${URL}days/${this.props.day.id}`, {
        method: 'PATCH',
        headers: HEADERS(),
        body: JSON.stringify({name: this.state.dayName})
      })
      .then(r => this.props.stopLoading())
    }
  }

  dayChangeHandler = e => {
    this.props.saveAll(this.props) // doesn't work?
    this.props.selectDay(e.target.value)
  }

  todaysDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month < 10) {month = `0${month}`}
    if (day < 10) {day = `0${day}`}
    return `${year}-${month}-${day}`
  }

  deleteDay = () => {
    if (this.props.days.length > 1 && window.confirm('Are you sure you want to delete this day?')) {
      const anotherDay = this.props.days.filter(x => x.id !== this.props.day.id)[0]
      this.props.selectDay(anotherDay.id)
      this.props.deleteDay(this.props.day.id)
    }
  }

  render(){
    // console.log(this.props.day)
    return(
      <div className='header'>
        {this.signedIn() ? <div className="third centered email">{this.props.user.email}</div> : <div className='twothirds'><p>Use HAM free. Log in to record data</p></div>}
        {this.signedIn() ? 
          <div className='third centered'>
            {this.state.editDayName 
              ?
              <form onSubmit={this.submitDayName} className='dayNameForm'>
                <input type='text' defaultValue={this.props.day.name} value={this.state.dayName} onChange={this.handleDayNameChange}  placeholder='Name This Day' ></input>
                <input id='submitDayName' type='submit' value='✔︎' />
                <button onClick={this.editDayToggle} className='closeButton closeEditDay' alt='Close Edit Form' >
                  <span className='tooltiptext'>Close Edit Name</span>
                  <img src='close-icon.png' className='closeEdit closeButton' alt='Close Edit Form' />
                </button>
                <button onClick={this.deleteDay} className='deleteChoice deleteButton' alt='delete choice'>
                  <span className='tooltiptext'>Delete Day</span>
                  <img src='trash-icon.png' className='deleteChoice deleteButton' alt='delete choice'></img>
                </button>
              </form>
              : 
              <>
              <select onChange={this.dayChangeHandler} value={this.props.day.id} className='daySelect'>
                {this.dayOptions()}
              </select>
              <button onClick={this.props.createDay} className='newDay addButton' alt='add new day' ><span className='tooltiptext'>Add New Day</span><img src='add-icon-circle.png' className='newDay addButton' alt='add new day'></img></button>
              <button onClick={this.editDayToggle} className='editDay editButton' alt='edit day' >
                <span className='tooltiptext'>{this.state.editDayName ? 'Close Edit Name' : 'Edit Day Name'}</span>
                <img src={this.state.editDayName ? 'close-icon.png' : 'edit-icon.png'} className='editDay editButton' alt='edit day' />
              </button>
              {/* <input type='date' min="2019-05-01" value={this.todaysDate()}/> */}
              </>
            }
          </div>
          : null
        }
        <div className='third'>
        {this.signedIn()?
        <button onClick={this.handleSignOut} className='centered'>Sign Out</button> :
        < LoginCard showSignup={this.state.showSignup} toggleSignup={this.toggleSignup} handleChange={this.handleChange} login={this.login} />
        }
        </div>
        < SignUpCard showSignup={this.state.showSignup} toggleSignup={this.toggleSignup} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return{
    signOut: () => dispatch({ type: 'SIGN_OUT'}),
    reauth: () => dispatch(reauth()),
    createDay: () => dispatch(createDay()),
    selectDay: (id) => dispatch(selectDay(id)),
    editDayName: (dayName) => dispatch({type: 'EDIT_DAY_NAME', payload: dayName}),
    saveAll: (state) => dispatch(saveAll(state)),
    startLoading: () => dispatch({type: 'START_LOADING'}),
    stopLoading: () => dispatch({type: 'STOP_LOADING'}),
    deleteDay: (id) => dispatch(deleteDay(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)