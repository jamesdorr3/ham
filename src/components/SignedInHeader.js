import React from 'react'
import { connect } from 'react-redux'
import LoginCard from './LoginCard'
import SignUpCard from './SignUpCard'
import {auth, reauth} from '../actions/authActions'
import {createDay, selectDay, updateDay} from '../actions/daysActions'
import {URL, HEADERS} from '../constants.js'
import {saveAll} from '../actions/saveAllAction'
import {deleteDay} from '../actions/daysActions'
import UsernameCard from './UsernameCard'

class SignedInHeader extends React.Component {

  state = {

  }

  handleSignOut = () => {
    this.setState({
      username: '',
      email: '',
      usernameOrEmail: '',
      password: '',
      signup: false,
      name: null,
      date: null,
      editDay: false
    })
    localStorage.removeItem('token');
    this.props.signOut()
  }

  prettyDayDisplay = (dayObj) => {
    const day = new Date(dayObj.date)
    let year = day.getFullYear();
    year = year.toString().substr(2,2);
    return `${day.getMonth() + 1}-${day.getDate() + 1}-${year}` + (dayObj.name ? ` ${dayObj.name}` : '' )
  }

  dayOptions = () => {
    // const days = this.props.days.filter(day => day.id !== this.props.day.id)
    const days = this.props.days.sort((x, y) => new Date(y.date) - new Date(x.date))
    return days.map(day => {
      return <option value={day.id} key={day.id} >{this.prettyDayDisplay(day)}</option>
    })
  }
  
  editDay = () => {
    this.setState({editDay: true})
  }

  handleDayFormChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  updateDay = (e) => {
    e.preventDefault()
    this.setState({editDay: false, name: null, date: null})
    if ((this.state.name !== this.props.day.name) || (this.state.date && this.state.date !== this.props.day.date)) {
      const day = {...this.props.day, name: this.state.name, date: this.state.date || this.props.day.date }
      this.props.editDay(day)
      this.props.updateDay(day)
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
    // console.log(this.props.days)
    return(
      <div className='header'>
        <div className='menuButton'>
          <span className='username'>▷</span>
          <div className='sideMenu'>
            <ul className='top'>
              <li>{this.props.user.username}</li>
              <li>{this.props.user.email}</li>
              <li>Height</li>
              <li>Weight</li>
              <li>Body Fat %</li>
            </ul>
            <ul className='bottom'>
              <li>About</li>
              <li onClick={this.handleSignOut}>Sign Out</li>
            </ul>
          </div>
        </div>
        <div className='daySelect'>
          {this.state.editDay
          ?
          <form className='dayEdit' onSubmit={this.updateDay}>
            <input type='text' name='name' placeholder='name' defaultValue={this.props.day.name} value={this.state.name} onChange={this.handleDayFormChange} />
            <input type='date' name='date' placeholder='date' defaultValue={this.props.day.date} value={this.state.date} onChange={this.handleDayFormChange} />
            <input type='submit' />
          </form>
          :
          <span className='daySelect'>
            <select onChange={this.dayChangeHandler} value={this.props.day.id} className='daySelect'>
              {this.dayOptions()}
            </select>
            <span className="dropdownButton">
              <button className='nonMenu'>▽</button>
              <ul className='dropdown'>
                <li onClick={this.props.createDay}><button><img src='add-icon-circle.png' className='newDay addButton' alt='add new Day'></img></button>Add Day</li>
                <li onClick={this.editDay}><button><img src='edit-icon.png' className='editDay editButton' alt='edit Day' /></button>Edit Day</li>
                <li onClick={this.deleteDay}><button><img src='trash-icon.png' className='deleteDay deleteButton' alt='delete Day' /></button>Delete Day</li>
              </ul>
            </span>
          </span>
          }
        </div>
        <div className='usernameArea'>
          <span className='username'>HAM</span>
        </div>
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
    editDay: (day) => dispatch({type: 'EDIT_DAY', payload: day}),
    updateDay: day => dispatch(updateDay(day)),
    reauth: () => dispatch(reauth()),
    createDay: () => dispatch(createDay()),
    selectDay: (id) => dispatch(selectDay(id)),
    saveAll: (state) => dispatch(saveAll(state)),
    startLoading: () => dispatch({type: 'START_LOADING'}),
    stopLoading: () => dispatch({type: 'STOP_LOADING'}),
    deleteDay: (id) => dispatch(deleteDay(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInHeader)