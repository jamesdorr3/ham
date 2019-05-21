import React from 'react'
import { connect } from 'react-redux'
import LoginCard from '../components/LoginCard'
import SignUpCard from '../components/SignUpCard'
import {auth, reauth} from '../actions/authActions'
import fetchChoices from '../actions/choicesActions'

class Header extends React.Component {

  state = {
    signup: false
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
    this.setState({signup: !this.state.signup})
  }

  signedIn = () => {
    return !!this.props.user.email
  }

  render(){
    console.log(this.props)
    return(
      <>
      <table className='header'>
        <tbody>
          <tr>
          {this.signedIn() ? <td>{this.props.user.email}</td> : <td className='doublewide'>Use HAM, no strings attached. Log In or Sign Up to save your goals and foods.</td>}
          {this.signedIn() ? 
            <td>
            <select>
              <option>Today</option>
            </select> 
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
          {this.state.signup ? 
          < SignUpCard toggleSignup={this.toggleSignup}/>
          : null}
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
    reauth: () => dispatch(reauth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)