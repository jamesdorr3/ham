import React from 'react'
import {connect} from 'react-redux'
import '../constants.js'
import {URL, HEADERS} from '../constants.js'

class SignUpCard extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    error: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // console.log(this.state)
    if (this.state.password && this.state.username && this.state.email && this.state.password === this.state.password2){
      fetch(`${URL}/users`, {
        method: 'POST',
        headers: HEADERS(),
        body: JSON.stringify({
          user: this.state
        })
      })
      .then(r => r.json())
      .then(resp => {
        if (resp.user && resp.jwt) {
          this.props.selectUser(resp)
          localStorage.setItem('token', resp.jwt)
        }else{
          this.setState({error: resp.message})
        }
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  render(){
    return(
      <div className='modal'>
      <form onSubmit={this.handleSubmit}>
      <button onClick={this.props.toggleSignup} className='x'>X</button>
        <input value={this.state.username} name='username' onChange={this.handleChange} type='text' placeholder='username' />
        <input value={this.state.email} name='email' onChange={this.handleChange} type='text' placeholder='email' />
        <input value={this.state.password} name='password' onChange={this.handleChange} type='password' placeholder='password'/>
        <input value={this.state.password2} name='password2' onChange={this.handleChange} type='password' placeholder='password'/>
        <input value='Sign Up' type='submit' />
      </form>
      <p>{this.state.error}</p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectUser: (user) => dispatch({ type: 'SELECT_USER', payload: user})
  }
}

export default connect(null, mapDispatchToProps)(SignUpCard)