import React from 'react'
import {connect} from 'react-redux'
import '../constants.js'
import {auth} from '../actions/authActions'
import {forgotPassword} from '../actions/passwordActions'

class LoginCard extends React.Component {

  state = {
    usernameOrEmail: '',
    password: '',
    error: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.props.showSignup){this.props.toggleSignup(e)}
    if (this.state.password) {
      this.props.startLoading()
      this.props.auth({username_or_email: this.state.usernameOrEmail.toLowerCase(), password: this.state.password})
      .then(response => {
        return response.json()
      })
      .then(response => {
        // console.log(jwtAndUser)
        this.props.stopLoading()
        if (response.user && response.jwt) {
          localStorage.setItem('token', response.jwt)
          this.props.selectUser(response)
        }
        else {
          this.setState({error: response.message})
        }
      })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  forgotPassword = () => {
    this.setState({error: ''})
    if(this.state.usernameOrEmail.match(/.+@.+\..+/)){
      this.props.startLoading()
      this.props.forgotPassword(this.state.usernameOrEmail)
      .then(r => r.json())
      .then(r => this.setState({error: r.error}))
      this.props.stopLoading()
      // this.setState({error: `Email sent to ${this.state.usernameOrEmail}`})
    }else{
      this.setState({error: 'Please enter a valid email address'})
    }
  }

  render(){
    return(
      <>
      <form className='login' onSubmit={this.handleSubmit}>
        <input autoComplete="true" value={this.state.usernameOrEmail} name='usernameOrEmail' id='usernameOrEmail' onChange={this.handleChange} type='text' placeholder='Username/Email' />
        <input autoComplete="true" value={this.state.password} name='password' onChange={this.handleChange} type='password' placeholder='Password' />
        <div onClick={this.forgotPassword}>Forgot Password?</div>
        <input value='Log In' type='submit' className='standardButton' />
        {/* <button onClick={this.props.toggleSignup} className='standardButton'>{this.props.showSignup ? 'Close Sign Up': 'Sign Up'}</button> */}
        {this.state.error ? <p className='errorMessage'>{this.state.error}</p> : null }
      </form>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectUser: (user) => dispatch({ type: 'SELECT_USER', payload: user}),
    startLoading: () => dispatch({type: 'START_LOADING'}),
    stopLoading: () => dispatch({type: 'STOP_LOADING'}),
    auth: (info) => dispatch(auth(info)),
    forgotPassword: (email) => dispatch(forgotPassword(email))
  }
}

export default connect(null, mapDispatchToProps)(LoginCard)