import React from 'react'
import SearchResultCard from '../components/SearchResultCard'

import {connect} from 'react-redux'
import {internalSearch, externalSearch} from '../actions/searchActions'
import {foodsIndex} from '../actions/foodsActions'

class SearchContainer extends React.Component {

  state = {
    text: '',
    favorites: [],
    filteredFavorites: [],
    common: [],
    internal: [],
    error: false,
    addFood: false,
    currentPage: 0,
    totalPages: 0,
    showResults: false
  }

  componentDidMount = () => {
    this.props.foodsIndex('')
    .then(r => r.json())
    .then(r => {
      // debugger
      this.setState({favorites: r.favorites})
    })
  }

  foodsIndex = (text) => {
    this.props.foodsIndex(text)
    .then(r => r.json())
    .then(r => {
      // debugger
      this.setState({filteredFavorites: r.favorites})
    })
  }

  handleChange = e => {
    this.setState({text: e.target.value})
    // this.favoriteSearch(e.target.value)
    if(e.target.value.length === 0) {
      this.foodsIndex('')
      this.clearResults()
    }else{
      this.setState({
        filteredFavorites: this.state.favorites.filter(food=>{
          const searchTerm = this.state.text.toLowerCase()
          return food.name.toLowerCase().includes(searchTerm) || (food.brand && food.brand.toLowerCase().includes(searchTerm))
        })
      })
    }
  }

  internalSearch = (text) => {
    this.props.internalSearch(text)
    .then(r => r.json())
    .then(r => {
      if (r.internal.length > 0){
        // debugger
        this.setState({
          internal: r.internal,
          // common: [{description: 'More results are loading'}]
        })
      }else{
        this.setState({
          internal: []
        })
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const searchTerm = this.state.text.replace('%','%25')
    if (searchTerm){
      // console.log('submit')
      this.setState({common: []})
      this.props.startLoading()
      this.foodsIndex(searchTerm)
      this.externalSearch(searchTerm, 1)
    }
  }

  externalSearch(searchPhrase, pageNumber = 1){
    this.props.externalSearch(searchPhrase, pageNumber)
    .then(r => r.json())
    .then(r => {
      // console.log(this.state)
      this.props.stopLoading()
      if (r.common && r.common.length > 0){
        this.setState({common: this.state.common.concat(r.common), currentPage: r.current_page, totalPages: r.total_pages})
      }
      else{
        this.setState({error: 'No More Results'})
      }
      // if (r.branded.length > 0){
      //   this.setState({branded: r.branded})
      // }
    })
  }

  clearResults = () => {
    this.setState({
      filteredFavorites: [],
      branded: [],
      common: [],
      internal: [],
      text: '',
      error: false,
      currentPage: 0,
      totalPages: 0
    })
    // this.foodsIndex('')
  }

  categoryByTime = () => {
    const hour = new Date().getHours()
    if (hour < 9){return this.props.categories.find(x => x.name === 'Breakfast').id}
    else if (hour < 16){return this.props.categories.find(x => x.name === 'Lunch').id}
    else{return this.props.categories.find(x => x.name === 'Dinner').id}
  }

  makeSearchResultCard = (food) => {
    return < SearchResultCard
    categoryId={this.categoryByTime()} // i
    key={food.id} // 
    food={food}  //  // i
    clearForm={this.clearResults} // i
    hideResults={this.hideResults}
    />
  }

  showResults = () => {
    this.setState({showResults: true})
  }

  hideResults = () => {
    this.setState({showResults: false})
  }

  render(){
    return(
      <>
      <div className='arrow' style={{display: this.props.choiceFoods.length > 0 ? 'none' : 'block'}}>
        <span className='rectangle'>Start Here</span>
      </div>
      <div className='centered row foodSearchContainer' onFocus={this.showResults}>
        <form onSubmit={this.handleSubmit} className='searchForm'>
          <input type='search' 
            // list='popularSearches'
            value={this.state.text} 
            onChange={this.handleChange}
            placeholder='Search for any food...'
            className='searchText'
            >
          </input>
          <input type='image' src='search-icon.png' alt='Search' name='submit' className='searchButton searchIcon'></input>
        </form>
        <ul className={this.state.showResults ? 'searchResultContainer' : 'searchResultContainerHidden'} >
          <h5>Favorites</h5>
          {this.state[this.state.filteredFavorites.length > 0 || this.state.text !== '' ? 'filteredFavorites' : 'favorites'].map(food => this.makeSearchResultCard(food))}

          <h5>More Results</h5>
          {this.state.internal.map(food => this.makeSearchResultCard(food))}
          {this.state.common.map(food => this.makeSearchResultCard(food))}

          {this.state.currentPage < this.state.totalPages
          ?
          <li 
          className='searchResult loadMore'
          onClick={()=>this.externalSearch(this.state.text, this.state.currentPage + 1)}
          >
            Load More - Showing {(this.state.currentPage/this.state.totalPages*100).toFixed()}% of results
          </li>
          :
          null
          }

          {this.props.removed.length > 0 
            ? 
            <>
            <h5>Recently Deleted</h5>
            {this.props.removed.map(food => this.makeSearchResultCard(food))}
            </>
            : null
          }
          {this.state.error ? <li>{this.state.error}</li> : null}
          {/* {this.state.error ? <li>No Results</li> : null} */}
        </ul>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    startLoading: () => dispatch({type: 'START_LOADING'}),
    stopLoading: () => dispatch({type: 'STOP_LOADING'}),
    internalSearch: (searchTerm) => dispatch(internalSearch(searchTerm)),
    // favoriteSearch: (searchTerm) => dispatch(favoriteSearch(searchTerm)),
    externalSearch: (searchTerm, pageNumber = 1) => dispatch(externalSearch(searchTerm, pageNumber)),
    foodsIndex: (searchTerm) => dispatch(foodsIndex(searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)