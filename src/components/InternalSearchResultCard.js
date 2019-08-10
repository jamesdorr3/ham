import React from 'react'
import {connect} from 'react-redux'
import {selectInternalSearchResult} from '../actions/searchActions'

const InternalSearchResultCard = props => {

  const handleAddChoice = () => {
    props.clearForm()
    props.selectInternalSearchResult({foodId: props.food.id, categoryId: props.categoryId, dayId: props.day.id})
  }

  return(
    <li className='searchResult' onClick={handleAddChoice}>
      <span className='resultName'>{props.food.name}</span>
      {props.food.brand ? <span className='brandName'> - {props.food.brand}</span> : null}
      <ul className='resultMacros'>
        <li>fat: {props.food.fat.toFixed()}</li>
        <li>carbs: {props.food.carbs.toFixed()}</li>
        <li>protein: {props.food.protein.toFixed()}</li>
      </ul>
    </li>
  )
}

const mapStateToProps = state => {
  return {
    day: state.day,
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectInternalSearchResult: idAndCategory => dispatch(selectInternalSearchResult(idAndCategory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InternalSearchResultCard)