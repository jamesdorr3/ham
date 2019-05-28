import React from 'react'
import {connect} from 'react-redux'
import '../constants.js'
import {URL, HEADERS} from '../constants.js'
import {auth, reauth} from '../actions/authActions'

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
      fetch(`${URL}/auth`, {
        method: 'POST',
        headers: HEADERS(),
        body: JSON.stringify({
          user: {
            username_or_email: this.state.usernameOrEmail,
            password: this.state.password
          }
        })
      })
      .then(r => r.json())
      .then(resp => {
        // debugger
        this.props.stopLoading()
        if (resp.user && resp.jwt) {
          localStorage.setItem('token', resp.jwt)
          this.props.selectUser(resp)
        }
        else {
          this.setState({error: resp.message})
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
        <input value={this.state.usernameOrEmail} name='usernameOrEmail' onChange={this.handleChange} type='text' placeholder='username or email' />
        <input value={this.state.password} name='password' onChange={this.handleChange} type='password' placeholder='password' />
        <input value='Log In' type='submit' />
        <button onClick={this.props.toggleSignup}>{this.props.showSignup ? 'Close Sign Up': 'Sign Up'}</button>
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
    stopLoading: () => dispatch({type: 'STOP_LOADING'})
  }
}

export default connect(null, mapDispatchToProps)(LoginCard)