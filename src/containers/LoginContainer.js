import React from 'react'
import { URL, HEADERS } from '../constants.js'
import { connect } from 'react-redux'
import LoginCard from '../components/LoginCard'
import SignUpCard from '../components/SignUpCard'

class LoginContainer extends React.Component {

  state = {
    username: '',
    email: '',
    usernameOrEmail: '',
    password: '',
    signup: false
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  login = () => {
    if (this.state.password) {
      fetch(`${URL}/auth`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          user: {
            username_or_email: this.state.usernameOrEmail,
            password: this.state.password
          }
        })
      })
      .then(r => r.json())
      .then(jwtAndUser => {
        if (jwtAndUser.user && jwtAndUser.jwt) {
          this.props.selectUser(jwtAndUser)
          localStorage.setItem('token', jwtAndUser.jwt)
          // this.setState({signup: 'logout'})
        }
      })
    }
  }

  signup = () => {
    console.log('sign up!')
  }

  handleLoginClick = () => {
    if (this.state.signup){
      this.setState({signup: false})
    }else{
      this.login()
      this.setState({
        password: ''
      })
    }
  }

  handleSignupClick = () => {
    if (this.state.signup){
      this.signup()
      this.setState({
        password: ''
      })
    }else{
      this.setState({signup: true})
    }
  }

  render(){
    return(
      <table>
        <tbody>
          <tr>
            <td>
              {this.props.user.email ? this.props.user.email : 'Feel free to use HAM without signing in. To save your foods, days, and goals, login or sign up!'}
            </td>
            <td>
            {this.props.user.email ?
            <button>Sign Out</button> :
            <>
              {this.state.signup ? < SignUpCard state={this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> : < LoginCard state={this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>}
              <button onClick={this.handleLoginClick} >
                Log In
              </button>
              or
              <button onClick={() => this.setState({signup: 'sign up'})} >
                Sign Up
              </button>
            </>
            }
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return{
    selectUser: (user) => dispatch({ type: 'SELECT_USER', payload: user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)