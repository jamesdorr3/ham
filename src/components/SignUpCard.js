import React from 'react'
import {connect} from 'react-redux'
import '../constants.js'
import {URL, HEADERS} from '../constants.js'
import {createUser} from '../actions/usersActions'

class SignUpCard extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    error: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password && this.state.username && this.state.email && this.state.password === this.state.password2){
      this.props.createUser(this.state)
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
      <div className='modal' style={{display: `${ this.props.showSignup && !this.props.user.email ? 'block' : 'none'}`}}>
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.username} name='username' onChange={this.handleChange} type='text' placeholder='username' />
        <input value={this.state.email} name='email' onChange={this.handleChange} type='text' placeholder='email' />
        <input value={this.state.password} name='password' onChange={this.handleChange} type='password' placeholder='password'/>
        <input value={this.state.password2} name='password2' onChange={this.handleChange} type='password' placeholder='password'/>
        <input value='Sign Up' type='submit'/>
      </form>
      <p>{this.state.error}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    selectUser: (user) => dispatch({ type: 'SELECT_USER', payload: user}),
    createUser: user => dispatch(createUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCard)