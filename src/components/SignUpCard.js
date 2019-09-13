import React from 'react'
import {connect} from 'react-redux'
import '../constants.js'
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
    if (!this.state.password || !this.state.username || !this.state.email) {
      this.setState({error: 'Username, email, and password required'})
    }
    // else if (!(/\w+@\w+\.\w+/).test(this.state.email)) {
    //   this.setState({error: 'Email is invalid'})
    // }
    else if (this.state.password !== this.state.password2){
      this.setState({error: 'Passwords must match'})
    }
    else if (this.state.password.length < 6){
      this.setState({error: 'Password must be at least 6 characters'})
    }
    else{
      this.props.createUser(this.state)
      .then(resp => {
        this.props.stopLoading()
        if (resp.user && resp.jwt) {
          localStorage.setItem('token', resp.jwt)
          this.props.selectUser(resp)
        }else if(resp.error){
          this.setState({error: resp.error})
          // debugger
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
      <div className='modal' style={{display: `${ this.props.showSignup && !this.props.user.email ? 'block' : 'none'}`}}>
      <form onSubmit={this.handleSubmit} className='signupForm'>
        <li>
        <label>Username</label><br/>
        <input required value={this.state.username} name='username' onChange={this.handleChange} type='text' placeholder='username' />
        </li>
        <li>
          <label>Email</label><br/>
          <input required value={this.state.email} name='email' onChange={this.handleChange} type='email' placeholder='email' />
        </li>
        <li>
          <label>Password</label><br/>
          <input required value={this.state.password} minLength='6' name='password' onChange={this.handleChange} type='password' placeholder='6 characters'/>
        </li>
        <li>
          <label>Password</label><br/>
          <input required value={this.state.password2} minLength='6' name='password2' onChange={this.handleChange} type='password' placeholder='confirm'/>
        </li>
        {this.state.error ? <p className='errorMessage'>{this.state.error}</p> : null }
        <li>
          <input value='Sign Up' type='submit'/>
        </li>
      </form>
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
    createUser: user => dispatch(createUser(user)),
    stopLoading: () => dispatch({type: 'STOP_LOADING'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCard)