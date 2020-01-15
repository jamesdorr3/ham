import React from 'react'
import {connect} from 'react-redux'
import '../../../../constants.js'
import {resetPassword} from '../../../../actions/passwordActions'

class SignUpCard extends React.Component {

  state = {
    email: this.props.email,
    password: '',
    password2: '',
    token: this.props.token,
    error: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.password || !this.state.email) {
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
      this.props.resetPassword(this.state)
      .then(resp => {
        // debugger
        switch(resp.status){
          case 200:
            this.setState({error: "Successful! Please Sign In"})
            break;
          case 422:
            this.setState({error: "Something went wrong"})
            break;
          case 412:
            this.setState({error: "Link expired or incorrect"})
            break;
          case 404:
            this.setState({error: "Email does not match"})
            break;
          default:
            this.setState({error: "Are you trying to hack this app right now?"})
            break;
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
      <div className="password-reset-background">
      <div className='password-reset'>
      <button onClick={this.props.closeResetPassword} style={{position:"absolute",right:"0px"}}>X</button>
      <h2 style={{textAlign:"center"}}>RESET PASSWORD</h2>
      <form onSubmit={this.handleSubmit} className='signupForm'>
        <li>
          <label>Email</label><br/>
          <input required autoComplete="true" value={this.state.email} name='email' onChange={this.handleChange} type='email' placeholder='email' />
        </li>
        <li>
          <label>Password</label><br/>
          <input required autoComplete="false" value={this.state.password} minLength='6' name='password' onChange={this.handleChange} type='password' placeholder='6 characters'/>
        </li>
        <li>
          <label>Repeat Password</label><br/>
          <input required autoComplete="false" value={this.state.password2} minLength='6' name='password2' onChange={this.handleChange} type='password' placeholder='confirm'/>
        </li>
        <li>
          <input value='Reset Password' type='submit'/>
        </li>
        {this.state.error ? <p style={{color:"red",textAlign:"center",fontWeight:"bold"}}>{this.state.error}</p> : null }
      </form>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: user => dispatch(resetPassword(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCard)