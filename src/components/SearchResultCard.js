import React from 'react'
import {connect} from 'react-redux'
import {selectSearchResult} from '../actions/searchActions'

const SearchResultCard = props => {

  const handleAddChoice = () => {
    props.clearForm()
    props.selectSearchResult({fdcId: props.food.fdcId, categoryId: props.categoryId, dayId: props.day.id})
  }


  return(
    <li className='searchResult' onClick={handleAddChoice}>
      <span className='resultName'>{props.food.description}</span>
      {props.food.brandOwner ? <span className='brandName'> - {props.food.brandOwner}</span> : null}
    </li>
  )
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