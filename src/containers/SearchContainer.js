import React from 'react'
import SearchResultCard from '../components/SearchResultCard'
import InternalSearchResultCard from '../components/InternalSearchResultCard'
import {URL, HEADERS} from '../constants.js'
import MakeFoodCard from '../components/MakeFoodCard'
import {connect} from 'react-redux'
import {internalSearch, externalSearch, favoriteSearch} from '../actions/searchActions'
import {foodsIndex} from '../actions/foodsActions'

class SearchContainer extends React.Component {

  state = {
    text: '',
    favorites: [],
    common: [],
    internal: [],
    error: false,
    addFood: false,
    currentPage: 0,
    totalPages: 0
  }

  componentDidMount = () => {
    this.foodsIndex('')
  }

  foodsIndex = (text) => {
    this.props.foodsIndex(text)
    .then(r => r.json())
    .then(r => {
      // console.log(r)
      this.setState(r)
    })
  }

  handleChange = e => {
    this.setState({text: e.target.value})
    // this.favoriteSearch(e.target.value)
    if(e.target.value.length === 0) {
      this.foodsIndex('')
      this.clearResults()
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
    if (this.state.text){
      // console.log('submit')
      this.setState({common: []})
      this.props.startLoading()
      this.foodsIndex(this.state.text)
      this.externalSearch(this.state.text, 1)
    }
  }

  externalSearch(searchPhrase, pageNumber = 1){
    this.props.externalSearch(searchPhrase, pageNumber)
    .then(r => r.json())
    .then(r => {
      console.log(r)
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
      branded: [],
      common: [],
      internal: [],
      text: '',
      error: false,
      currentPage: 0,
      totalPages: 0
    })
    this.foodsIndex('')
  }

  categoryByTime = () => {
    const hour = new Date().getHours()
    if (hour < 9){return this.props.categories.find(x => x.name == 'Breakfast').id}
    else if (hour < 16){return this.props.categories.find(x => x.name == 'Lunch').id}
    else{return this.props.categories.find(x => x.name == 'Dinner').id}
  }

  render(){
    return(
      <>
      <div className='arrow' style={{display: this.props.choiceFoods.length > 0 ? 'none' : 'block'}}>
        <span className='rectangle'>Start Here</span>
      </div>
      <div className='centered row foodSearchContainer' >
        <form onSubmit={this.handleSubmit} className='searchForm'>
          <input type='search' 
            list='popularSearches'
            value={this.state.text} 
            onChange={this.handleChange}
            placeholder='Search for any food...'
            className='searchText'
            >
          </input>
          {/* <datalist id='popularSearches'>
            <option>poo</option>
          </datalist> */}
          <input type='image' src='search-icon.png' alt='Search' name='submit' className='searchButton searchIcon'></input>
          {/* <span className='tooltip'><input type='image' src='search-icon.png' alt='Search' name='submit' className='searchButton'></input><span className='tooltiptext'>Search</span></span>
          <button onClick={() => this.setState({addFood: !this.state.addFood})} className='iconButton' style={{display: this.props.user.email ? 'inline' : 'none'}}>
            {this.state.addFood ?
            <>
            <img src='close-icon.png' alt='close new food form' className='closeButton' />
            <span className='tooltiptext'>Close Form</span>
            </>
            :
            <>
            <img src='add-icon-circle.png' alt='open new food form' className='addButton'/>
            <span className='tooltiptext'>Add Your Own</span>
            </>
          }
          </button> */}
        </form>
        {/* < MakeFoodCard addFood={this.state.addFood} categoryId={this.props.categoryId} closeAddFood={() => this.setState({addFood: false})} /> */}
        <ul className='searchResultContainer'>
          {/* {this.state.common.length > 0 || this.state.branded.length > 0 || this.state.internal.length > 0 || this.state.error ? 
          <button onClick={this.clearResults} className='closeButton'><span className='tooltiptext'>Close</span><img src='close-icon.png' alt='close search results' className='closeButton' /></button> 
          : null} */}
          <h5>Favorites</h5>
          {this.state.favorites.map(food => (
            < InternalSearchResultCard 
            categoryId={this.categoryByTime()}
            key={food.id} 
            food={food} 
            addChoice={this.props.addChoice}
            clearForm={this.clearResults}
            />)
          )}
          <h5>More Results</h5>
          {this.state.internal.map(food => (
            < InternalSearchResultCard 
            categoryId={this.categoryByTime()}
            key={food.food_name} 
            food={food} 
            addChoice={this.props.addChoice}
            clearForm={this.clearResults}
            />)
          )}
          {this.state.common.map(food => (
            < SearchResultCard 
            categoryId={this.categoryByTime()}
            key={food.fdcId} 
            food={food} 
            addChoice={this.props.addChoice}
            clearForm={this.clearResults}
            />)
          )}

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
            {this.props.removed.map(food => (
              < InternalSearchResultCard 
              categoryId={this.categoryByTime()}
              key={food.food_name} 
              food={food} 
              addChoice={this.props.addChoice}
              clearForm={this.clearResults}
              />)
            )}
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