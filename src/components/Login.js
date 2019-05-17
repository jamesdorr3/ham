import React from 'react'
import { URL, HEADERS } from '../constants.js'
import { connect } from 'react-redux'

class Login extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.placeholder]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${URL}/auth`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
    })
    .then(r => r.json())
    .then(jwtAndUser => this.props.selectUser(jwtAndUser))
    // {jwt: 'blah',
    //  user: { erythang }}
  }

  render(){
    console.log(this.props)
    return(
      <table>
        <tbody>
          <tr>
            <td>
              {this.props.user.email ? this.props.user.email : 'Feel free to use HAM without signing in. To save your foods, days, and goals, login or sign up!'}
            </td>
            <td>
              <form onSubmit={this.handleSubmit}>
                <input value={this.state.email} onChange={this.handleChange} type='text' placeholder='email' />
                <input value={this.state.password} onChange={this.handleChange} type='password' placeholder='password'/>
                <input type='submit' value='Login'/>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return{
    selectUser: (user) => dispatch({ type: 'SELECT_USER', payload: user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)