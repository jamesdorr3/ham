import React from 'react'
import {connect} from 'react-redux'
import {selectSearchResult} from '../actions/searchActions'

class Footer extends React.Component {

  render(){
    // console.log(this.props.categoryId)
    return(
      <div className='footer' >
        <h2>Powered by Nutritionix</h2>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addChoice: (choice) => dispatch({ type: 'ADD_CHOICES', payload: [choice]}),
    selectSearchResult: prop => dispatch(selectSearchResult(prop))
  }
}

export default connect(null, mapDispatchToProps)(Footer)