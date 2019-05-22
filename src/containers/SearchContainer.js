import React from 'react'
import SearchResultCard from '../components/SearchResultCard'
import {URL, HEADERS} from '../constants.js'

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
      fetch(`${URL}search/many?q=${this.state.text}`, {headers: HEADERS()})
      .then(r => r.json())
      .then(r => {
        // console.log(r)
        if (r.common || r.branded) {
          this.setState({branded: r.branded, common: r.common})
        }else{
          this.setState({error: 'No Results'})
        }
      })
    }
  }

  clearResults = () => {
    this.setState({
      branded: [],
      common: []
    })
  }

  render(){
    return(
      <tr>
        <td>
          <form onSubmit={this.handleSubmit}>
            <input type='text' 
              value={this.state.text} 
              onChange={this.handleChange}
              placeholder='Search for any food!'
              >
            </input>
            <input type='submit' value='search' />
            {this.state.common.length > 0 || this.state.branded.length > 0 ? <button onClick={this.clearResults}>X</button> : null}
          </form>
          <ul>
            {this.state.common.map(food => (
              < SearchResultCard 
              categoryId={this.props.categoryId}
              key={food.food_name} 
              food={food} 
              addChoice={this.props.addChoice}
              clearForm={() => this.setState({text: '', branded: [], common: []})}
              />)
            )}
            {this.state.branded.map(food =>(
              < SearchResultCard 
              categoryId={this.props.categoryId}
              key={food.nix_item_id} 
              food={food} 
              addChoice={this.props.addChoice}
              clearForm={() => this.setState({text: '', branded: [], common: []})}
              />
            ))}
            {/* {this.state.error ? <li>No Results</li> : null} */}
          </ul>
        </td>
      </tr>
    )
  }
}

export default SearchContainer