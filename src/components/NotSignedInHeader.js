import React from 'react'
import { connect } from 'react-redux'
import LoginCard from './LoginCard'
import SignUpCard from './SignUpCard'
import ResetPasswordCard from './ResetPasswordCard'
import {reauth} from '../actions/authActions'
import {saveAll} from '../actions/saveAllAction'

class NotSignedInHeader extends React.Component {

  state = {
    email: '',
    signup: false,
    showSignup: false,
    showPasswordReset: false,
    token: '',
    showAuth: false
  }

  componentDidMount(){
    if (localStorage.getItem('token')){this.props.reauth()} // thunk
    let params = window.location.search
    if (params.includes('token') && params.includes("email")){
      params = params.split(/(\?token=|&email=)/)
      const token = params[2]
      const email = decodeURIComponent(params[4])
      this.setState({showPasswordReset: true, email: email, token: token})
    }
  }

  handleSignOut = () => {
    this.setState({
      email: '',
      signup: false,
      showSignup: false,
      showPasswordReset: false,
      token: '',
      showAuth: false
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

  closeResetPassword = () => {this.setState({showPasswordReset: false})}

  toggleShowAuth = () => this.setState({showAuth: !this.state.showAuth})

  render(){
    return(
      <div className='notSignedInHeader'>
        <div className='notSignedInMessage'><p>Use HAM free. Log in to record data</p></div>
        <div className='login'>
          <button onClick={()=>this.setState({showAuth:true})} className="loginSignupButton">Login<br/>Sign Up</button>
          {this.state.showAuth ? 
            <div className="loginModal">
              <button onClick={()=>this.setState({showAuth:false})}>X</button>
              < LoginCard showSignup={this.state.showSignup} toggleSignup={this.toggleSignup} handleChange={this.handleChange} login={this.login} />
              < SignUpCard showSignup={this.state.showSignup} toggleSignup={this.toggleSignup} />
            </div>
            :
            null
          }
          {this.state.showPasswordReset? < ResetPasswordCard closePasswordReset={this.toggleSignup} email={this.state.email} token={this.state.token} closeResetPassword={this.closeResetPassword} /> : null }
          
        </div>
      </div>
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
    saveAll: (state) => dispatch(saveAll(state)),
    startLoading: () => dispatch({type: 'START_LOADING'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotSignedInHeader)