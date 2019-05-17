import React from 'react'
import {connect} from 'react-redux'
import '../constants.js'
import {URL, HEADERS} from '../constants.js'

class SignUpCard extends React.Component {

  render(){
    return(
      <form onSubmit={this.props.handleSubmit}>
        <input value={this.props.username} name='username' onChange={this.props.handleChange} type='text' placeholder='username' />
        <input value={this.props.email} name='email' onChange={this.props.handleChange} type='text' placeholder='email' />
        <input value={this.props.password} name='password' onChange={this.props.handleChange} type='password' placeholder='password'/>
      </form>
    )
  }
}

export default connect()(SignUpCard)