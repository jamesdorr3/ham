import React from 'react'
import {connect} from 'react-redux'
import {selectSearchResult} from '../actions/searchActions'

class SearchResultCard extends React.Component {

  handleAddChoice = () => {
    this.props.clearForm()
    const props = `id=${this.props.food.fdcId}&categoryId=${this.props.categoryId}`
    this.props.selectSearchResult(props)
  }

  render(){
    return(
      <li className='searchResult'>
        <button onClick={this.handleAddChoice} className='addButton'><img src='add-icon-circle.png' alt='choose search results' className='addButton' /></button>
        {this.props.food.description}{this.props.food.brandOwner ? `- ${this.props.food.brandOwner}` : null}
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