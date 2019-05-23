import React from 'react'
import SearchResultCard from '../components/SearchResultCard'
import {URL, HEADERS} from '../constants.js'
import MakeFoodCard from '../components/MakeFoodCard'

class SearchContainer extends React.Component {

  state = {
    text: '',
    branded: [],
    common: [],
    internal: [],
    error: false,
    addFood: false
  }

  handleChange = e => this.setState({text: e.target.value})

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.text){
      // console.log('submit')
      fetch(`${URL}search/many?q=${this.state.text}`, {headers: HEADERS()})
      .then(r => r.json())
      .then(r => {
        // debugger
        if (r.common.length > 0 || r.branded.length > 0) {
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
      common: [],
      error: false
    })
  }

  render(){
    return(
      <div className='centered row' >
        <span colSpan='8' >
          <form onSubmit={this.handleSubmit}>
            <input type='text' 
              value={this.state.text} 
              onChange={this.handleChange}
              placeholder='search for any food'
              >
            </input>
            <input type='submit' value='search' />
            {this.state.common.length > 0 || this.state.branded.length > 0  || this.state.error ? <button onClick={this.clearResults}>X</button> : null}
            <button onClick={() => this.setState({addFood: !this.state.addFood})}>{this.state.addFood ? 'Close Form' : 'Add Your Own'}</button>
          </form>
          < MakeFoodCard addFood={this.state.addFood} categoryId={this.props.categoryId} closeAddFood={() => this.setState({addFood: false})} />
          <ul className='searchResultContainer'>
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
            {this.state.error ? <li>{this.state.error}</li> : null}
            {/* {this.state.error ? <li>No Results</li> : null} */}
          </ul>
        </span>
      </div>
    )
  }
}

export default SearchContainer