import React from 'react'
import {connect} from 'react-redux'
import {selectInternalSearchResult} from '../actions/searchActions'

class InternalSearchResultCard extends React.Component {

  handleAddChoice = () => {
    this.props.clearForm()
    this.props.selectInternalSearchResult({foodId: this.props.food.id, categoryId: this.props.categoryId})
  }

  render(){
    // console.log(this.props)
    return(
      <li className='searchResult'>
        <button onClick={this.handleAddChoice} className='addButton'><img src='add-icon-circle.png' alt='choose search results' className='addButton' /></button>
        {this.props.food.name}{this.props.food.brand ? ` - ${this.props.food.brand} - ` : null}
        {` calories: ${this.props.food.calories}, fat: ${this.props.food.fat}, carbs: ${this.props.food.carbs}, protein: ${this.props.food.protein}`}
      </li>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectInternalSearchResult: idAndCategory => dispatch(selectInternalSearchResult(idAndCategory))
  }
}

export default connect(null, mapDispatchToProps)(InternalSearchResultCard)