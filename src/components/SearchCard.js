import React from 'react'

class SearchCard extends React.Component {

  state = {
    text: ''
  }

  handleChange = e => this.setState({text: e.target.value})

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.text){console.log('handle submit')}
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
      <input type='text' 
        value={this.state.text} 
        onChange={this.handleChange} >
      </input>
      <input type='submit'/>
      </form>
    )
  }
}

export default SearchCard