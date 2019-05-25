import React from 'react'
import {connect} from 'react-redux'
import {selectSearchResult} from '../actions/searchActions'

class SearchResultCard extends React.Component {

  handleAddChoice = () => {
    this.props.clearForm()
    const props = (this.props.food.nix_item_id) ? 
      `id=${this.props.food.nix_item_id}&categoryId=${this.props.categoryId}`: 
      `name=${this.props.food.food_name}&categoryId=${this.props.categoryId}`
    this.props.selectSearchResult(props)
  }

  render(){
    // console.log(this.props)
    return(
      <li className='searchResult'>
        <button onClick={this.handleAddChoice} className='addButton'><img src='add-icon-circle.png' alt='choose search results' className='addButton' /></button>
        {this.props.food.food_name}{this.props.food.brand_name ? `- ${this.props.food.brand_name}` : null}
      </li>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectSearchResult: prop => dispatch(selectSearchResult(prop))
  }
}

export default connect(null, mapDispatchToProps)(SearchResultCard)