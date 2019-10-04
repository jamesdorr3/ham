import React from 'react'
import { connect } from 'react-redux'
import {reauth} from '../actions/authActions'
import {createDay, selectDay, updateDay, deleteDay, copyDay} from '../actions/daysActions'
import {saveAll} from '../actions/saveAllAction'
import MakeFoodCard from './MakeFoodCard'

class SignedInHeader extends React.Component {

  state = {
    username: '',
    email: '',
    usernameOrEmail: '',
    password: '',
    signup: false,
    name: null,
    date: null,
    editDay: false
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
    const day = dayObj.date
    // console.log(dayObj.date)
    // debugger
    // const day = new Date(dayObj.date)
    // let year = day.getFullYear();
    // year = year.toString().substr(2,2);
    // return `${day.getMonth() + 1}-${day.getDate() + 1}-${year}` + (dayObj.name ? ` ${dayObj.name}` : '' )
    return `${day.slice(5,7)}-${day.slice(8,10)}-${day.slice(2,4)}` + (dayObj.name ? ` ${dayObj.name}` : '' )
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
      const day = {...this.props.day, name: this.state.name || this.props.day.name, date: this.state.date || this.props.day.date }
      this.props.editDay(day)
      this.props.updateDay(day)
    }
  }

  dayChangeHandler = e => {
    // this.props.saveAll(this.props) // doesn't work?
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

  toggleNewFoodForm = () => {
    this.setState({showNewFoodForm: !this.state.showNewFoodForm})
  }

  copyDay = () => {
    this.props.copyDay(this.props.day.id)
  }

  render(){
    // console.log(this.props.days)
    return(
      <div className='header'>
        <div className='menu'>
          <div className='menuButton'><img src='menu-icon-white.png' className='menuButton' alt='menu button'></img>
            <div className='sideMenu'>
              <ul className='menuItems'>
                <h1>{this.props.user.username}</h1>
                <li onClick={this.toggleNewFoodForm} className="clickable">Create Your Own Food</li>
                < MakeFoodCard showNewFoodForm={this.state.showNewFoodForm} toggleNewFoodForm={this.toggleNewFoodForm} categoryId={this.props.categories[0].id} />
                <li className='contact clickable'><a href='mailto:ham.macros@gmail.com'>Contact</a></li>
                <li className='signOut clickable' onClick={this.handleSignOut}>Sign Out</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='daySelect'>
          {this.state.editDay
          ?
          <form className='dayEdit' onSubmit={this.updateDay}>
            <input type='text' name='name' placeholder='name' defaultValue={this.props.day.name} value={this.state.name} onChange={this.handleDayFormChange} />
            <input type='date' name='date' placeholder='date' defaultValue={this.props.day.date} value={this.state.date} onChange={this.handleDayFormChange} />
            <input type='submit' value='✔'/>
          </form>
          :
          <span className='daySelect'>
            <select onChange={this.dayChangeHandler} value={this.props.day.id} className='daySelect'>
              {this.dayOptions()}
            </select>
            <span className="dropdown">
              <span className='dots'><span/><span/><span/></span>
              <ul className='dropdown-content'>
                <li onClick={this.props.createDay}><button><img src='add-icon-circle.png' className='newDay addButton' alt='add new Day'></img></button>Add Day</li>
                <li onClick={this.editDay}><button><img src='edit-icon.png' className='editDay editButton' alt='edit Day' /></button>Edit Day</li>
                <li onClick={this.copyDay}><button className='copyButton'><span className='copy'>𝍌</span></button>Copy Day</li>
                {this.props.days.length > 1 ?
                <li onClick={this.deleteDay}><button><img src='trash-icon.png' className='deleteDay deleteButton' alt='delete Day' /></button>Delete Day</li>
                : null}
              </ul>
            </span>
          </span>
          }
        </div>
        <div className='appName'>
          <h1 className='appName'>HAM</h1>
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
    deleteDay: (id) => dispatch(deleteDay(id)),
    copyDay: (id) => dispatch(copyDay(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInHeader)