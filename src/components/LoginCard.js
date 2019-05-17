import React from 'react'
import {connect} from 'react-redux'
import '../constants.js'
import {URL, HEADERS} from '../constants.js'

class LoginCard extends React.Component {

  render(){
    return(
      <form onSubmit={this.props.handleSubmit}>
        <input value={this.props.usernameOrEmail} name='usernameOrEmail' onChange={this.props.handleChange} type='text' placeholder='username or email' />
        <input value={this.props.password} name='password' onChange={this.props.handleChange} type='password' placeholder='password'/>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect()(LoginCard)