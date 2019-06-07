import React from 'react'
import {connect} from 'react-redux'
import {selectInternalSearchResult} from '../actions/searchActions'

class InternalSearchResultCard extends React.Component {

  handleAddChoice = () => {
    this.props.clearForm()
    this.props.selectInternalSearchResult({foodId: this.props.food.id, categoryId: this.props.categoryId, dayId: this.props.day.id})
  }

  render(){
    // console.log(this.props)
    return(
      <li className='searchResult' onClick={this.handleAddChoice}>
        <span className='resultName'>{this.props.food.name}</span>
        {this.props.food.brand ? <span className='brandName'> - {this.props.food.brand}</span> : null}
        <span className='resultMacros'> - calories: {this.props.food.calories.toFixed()}, fat: {this.props.food.fat.toFixed()}, carbs: {this.props.food.carbs.toFixed()}, protein: {this.props.food.protein.toFixed()}</span>
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
    selectInternalSearchResult: idAndCategory => dispatch(selectInternalSearchResult(idAndCategory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InternalSearchResultCard)