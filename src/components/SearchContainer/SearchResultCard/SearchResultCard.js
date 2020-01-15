import React from 'react'
import {connect} from 'react-redux'
import {selectInternalSearchResult, selectSearchResult} from '../../../actions/searchActions'

const SearchResultCard = props => {

  const handleAddChoice = () => {
    // debugger
    props.hideResults()
    props.clearForm()
    if(props.food.id){
      props.selectInternalSearchResult({foodId: props.food.id, categoryId: props.categoryId, dayId: props.day.id})
    }else{
      props.selectSearchResult({fdcId: props.food.fdcId, categoryId: props.categoryId, dayId: props.day.id})
    }
  }

  return(
    <li className='searchResult' onClick={handleAddChoice}>
      <span className='resultName'>{props.food.name || props.food.description}</span>
      {props.food.brand ? <span className='brandName'> - {props.food.brand}</span> : null}
      {props.food.brandOwner ? <span className='brandName'> - {props.food.brandOwner}</span> : null}
      {props.food.fat || props.food.carbs || props.food.protein ? 
      <ul className='resultMacros'>
        <li>fat: {props.food.fat.toFixed()}</li>
        <li>carbs: {props.food.carbs.toFixed()}</li>
        <li>protein: {props.food.protein.toFixed()}</li>
      </ul>
      : null
      }
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
    selectInternalSearchResult: prop => dispatch(selectInternalSearchResult(prop)),
    selectSearchResult: prop => dispatch(selectSearchResult(prop))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultCard)