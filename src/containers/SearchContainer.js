import React from 'react'
import SearchResultCard from '../components/SearchResultCard'
import InternalSearchResultCard from '../components/InternalSearchResultCard'
import {URL, HEADERS} from '../constants.js'
import MakeFoodCard from '../components/MakeFoodCard'
import {connect} from 'react-redux'
import {internalSearch, externalSearch} from '../actions/searchActions'

class SearchContainer extends React.Component {

  state = {
    text: '',
    branded: [],
    common: [],
    internal: [],
    error: false,
    addFood: false
  }

  handleChange = e => {
    this.setState({text: e.target.value})
    if(e.target.value.length > 0){
      this.internalSearch(e.target.value)
    }else{
      this.setState({internal: [],common:[],error:false})
    }
  }
  
  internalSearch = (text) => {
    this.props.internalSearch(text)
    .then(r => r.json())
    .then(r => {
      if (r.internal.length > 0){
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
      this.props.startLoading()
      this.internalSearch(this.state.text)
      this.props.externalSearch(this.state.text)
      .then(r => r.json())
      .then(r => {
        // debugger
        this.props.stopLoading()
        // debugger
        // if (r.internal.length > 0){
        //   this.setState({internal: r.internal})
        // }
        if (r.common && r.common.length > 0){
          this.setState({common: r.common})
        }
        else{
          this.setState({error: 'No More Results'})
        }
        // if (r.branded.length > 0){
        //   this.setState({branded: r.branded})
        // }
      })
    }
  }

  clearResults = () => {
    this.setState({
      branded: [],
      common: [],
      internal: [],
      text: '',
      error: false
    })
  }

  render(){
    return(
      <div className='centered row foodSearchContainer' >
        <form onSubmit={this.handleSubmit} className='searchForm'>
          <input type='text' 
            value={this.state.text} 
            onChange={this.handleChange}
            placeholder='Search for any food...'
            className='searchText'
            >
          </input>
          <input type='image' src='search-icon.png' alt='Search' name='submit' className='searchButton'></input>
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
          {this.state.internal.map(food => (
            < InternalSearchResultCard 
            categoryId={this.props.categoryId}
            key={food.food_name} 
            food={food} 
            addChoice={this.props.addChoice}
            clearForm={this.clearResults}
            />)
          )}
          {this.state.common.map(food => (
            < SearchResultCard 
            categoryId={this.props.categoryId}
            key={food.fdcId} 
            food={food} 
            addChoice={this.props.addChoice}
            clearForm={this.clearResults}
            />)
          )}
          {/* {this.state.branded.map(food =>(
            < SearchResultCard 
            categoryId={this.props.categoryId}
            key={food.nix_item_id} 
            food={food} 
            addChoice={this.props.addChoice}
            clearForm={this.clearResults}
            />
          ))} */}
          {this.state.error ? <li>{this.state.error}</li> : null}
          {/* {this.state.error ? <li>No Results</li> : null} */}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startLoading: () => dispatch({type: 'START_LOADING'}),
    stopLoading: () => dispatch({type: 'STOP_LOADING'}),
    internalSearch: (searchTerm) => dispatch(internalSearch(searchTerm)),
    externalSearch: (searchTerm) => dispatch(externalSearch(searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)