import React from 'react'
import {connect} from 'react-redux'
import {selectSearchResult} from '../actions/searchActions'

class Footer extends React.Component {

  render(){
    // console.log(this.props.categoryId)
    return(
      <div className='footer' >
        <h2>Powered by the USDA</h2>
        <span className='hidden'>Powered by the U.S. Department of Agriculture, Agricultural Research Service, 2019 <br/> USDA Branded Food Products Database - Nutrient Data Laboratory Home Page http://ndb.nal.usda.gov</span>
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