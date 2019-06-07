import React from 'react'
import {connect} from 'react-redux'
import {selectSearchResult} from '../actions/searchActions'

class SearchResultCard extends React.Component {

  handleAddChoice = () => {
    this.props.clearForm()
    this.props.selectSearchResult({fdcId: this.props.food.fdcId, categoryId: this.props.categoryId, dayId: this.props.day.id})
  }

  render(){
    return(
      <li className='searchResult' onClick={this.handleAddChoice}>
        <span className='resultName'>{this.props.food.description}</span>
        {this.props.food.brandOwner ? <span className='brandName'> - {this.props.food.brandOwner}</span> : null}
      </li>
    )
  }
}

const mapStateToProps = state => {
  return {
    day: state.day
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectSearchResult: prop => dispatch(selectSearchResult(prop))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultCard)