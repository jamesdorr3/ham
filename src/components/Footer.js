import React from 'react'
import {connect} from 'react-redux'
import {selectSearchResult} from '../actions/searchActions'

const Footer = props =>  {

  return(
    <div className='footer' >
      
      <a href='http://ndb.nal.usda.gov' className='attribution'>
        <div className='small'>Powered by the</div>
        <h2>USDA</h2>
      </a>
      <span className='hidden'>Powered by the U.S. Department of Agriculture, Agricultural Research Service, 2019 <br/> USDA Branded Food Products Database - Nutrient Data Laboratory Home Page http://ndb.nal.usda.gov</span>
    </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    addChoice: (choice) => dispatch({ type: 'ADD_CHOICES', payload: [choice]}),
    selectSearchResult: prop => dispatch(selectSearchResult(prop))
  }
}

export default connect(null, mapDispatchToProps)(Footer)