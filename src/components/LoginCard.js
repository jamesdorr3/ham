import React from 'react'
import {connect} from 'react-redux'
import '../constants.js'
import {auth} from '../actions/authActions'

class LoginCard extends React.Component {

  state = {
    usernameOrEmail: '',
    password: '',
    error: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.password) {
      this.props.startLoading()
      this.props.auth({username_or_email: this.state.usernameOrEmail, password: this.state.password})
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

  render(){
    return(
      <>
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.usernameOrEmail} name='usernameOrEmail' id='usernameOrEmail' onChange={this.handleChange} type='text' placeholder='username/email' />
        <input value={this.state.password} name='password' onChange={this.handleChange} type='password' placeholder='password' />
        <input value='Log In' type='submit' className='standardButton' />
        <button onClick={this.props.toggleSignup} className='standardButton'>{this.props.showSignup ? 'Close Sign Up': 'Sign Up'}</button>
      </form>
      {this.state.error ? <p className='errorMessage'>{this.state.error}</p> : null }
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectUser: (user) => dispatch({ type: 'SELECT_USER', payload: user}),
    startLoading: () => dispatch({type: 'START_LOADING'}),
    stopLoading: () => dispatch({type: 'STOP_LOADING'}),
    auth: (info) => dispatch(auth(info))
  }
}

export default connect(null, mapDispatchToProps)(LoginCard)