import React from 'react'
import { connect } from 'react-redux'
import LoginCard from '../components/LoginCard'
import SignUpCard from '../components/SignUpCard'
import {auth, reauth} from '../actions/authActions'
import {createDay, selectDay} from '../actions/daysActions'

class Header extends React.Component {

  state = {
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
      signup: false
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
    const days = this.props.days.sort((x, y) => y.created_at - x.created_at)
    return days.map(day => {
      return <option value={day.id} key={day.id} >{this.prettyDayDisplay(day)}</option>
    })
  }

  dayChange = () => {
    console.log('DAY CHANGE@')
  }

  render(){
    // console.log(this.props.day)
    return(
      <div className='header'>
        {this.signedIn() ? <div className="third centered email">{this.props.user.email}</div> : <div className='twothirds'>Use HAM, no strings attached. Log In or Sign Up to save your goals and foods.</div>}
        {this.signedIn() ? 
          <div className='third centered'>
          <select onChange={(e) =>this.props.selectDay(e)} value={this.props.day.id} class='daySelect'>
            {this.dayOptions()}
          </select>
          <button onClick={this.props.createDay} className='newday'>New Day</button>
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
    selectDay: (info) => dispatch(selectDay(info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)