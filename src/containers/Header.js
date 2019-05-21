import React from 'react'
import { connect } from 'react-redux'
import LoginCard from '../components/LoginCard'
import SignUpCard from '../components/SignUpCard'
import {auth, reauth} from '../actions/authActions'
import {createDay} from '../actions/daysActions'

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
      return <option value={day.id} >{this.prettyDayDisplay(day)}</option>
    })
  }

  dayChange = () => {
    console.log('DAY CHANGE@')
  }

  render(){
    console.log(this.props.day)
    return(
      <>
      <table className='header'>
        <tbody>
          <tr>
          {this.signedIn() ? <td>{this.props.user.email}</td> : <td className='doublewide'>Use HAM, no strings attached. Log In or Sign Up to save your goals and foods.</td>}
          {this.signedIn() ? 
            <td>
            <select onChange={this.dayChange} value={this.props.day.id}>
              {/* <option selected>{this.prettyDayDisplay(this.props.day)}</option> */}
              {this.dayOptions()}
            </select> 
            <button onClick={this.props.createDay}>New Day</button>
            </td>
            : null
          }
          <td>
          {this.signedIn()?
          <button onClick={this.handleSignOut}>Sign Out</button> :
          < LoginCard state={this.state} toggleSignup={this.toggleSignup} handleChange={this.handleChange} login={this.login} />
          }
          </td>
          </tr>
        </tbody>
      </table>
        < SignUpCard toggleSignup={this.toggleSignup} showSignup={this.state.showSignup}/>
      </>
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
    createDay: () => dispatch(createDay())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)