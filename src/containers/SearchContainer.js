import React from 'react'
import SearchResultCard from '../components/SearchResultCard'

class SearchContainer extends React.Component {

  state = {
    text: '',
    branded: [],
    common: [],
    internal: [],
    error: false
  }

  handleChange = e => this.setState({text: e.target.value})

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.text){
      // console.log('submit')
      fetch(`http://localhost:3001/auto?q=${this.state.text}`)
      .then(r => r.json())
      .then(r => {
        console.log(r)
        if (r.common || r.branded) {
          this.setState({branded: r.branded, common: r.common})
        }else{
          this.setState({error: 'No Results'})
        }
      })
    }
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' 
            value={this.state.text} 
            onChange={this.handleChange} >
          </input>
          <input type='submit' value='search' />
        </form>
        <ul>
          {this.state.common.map(food => (
            < SearchResultCard 
            key={food.food_name} 
            food={food} 
            addChoice={this.props.addChoice}
            clearForm={() => this.setState({text: '', branded: [], common: []})}
            />)
          )}
          {this.state.branded.map(food =>(
            < SearchResultCard 
            key={food.nix_item_id} 
            food={food} 
            addChoice={this.props.addChoice}
            clearForm={() => this.setState({text: '', branded: [], common: []})}
            />
          ))}
          {/* {this.state.error ? <li>No Results</li> : null} */}
        </ul>
      </div>
    )
  }
}

export default SearchContainer