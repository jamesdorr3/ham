import React from 'react'
import {connect} from 'react-redux'
import '../constants.js'
import {URL, HEADERS} from '../constants.js'

class SearchResultCard extends React.Component {

  handleAddChoice = () => {
    this.props.clearForm()
    const props = (this.props.food.nix_item_id) ? 
      `id=${this.props.food.nix_item_id}`: 
      `name=${this.props.food.food_name}`
    console.log(props)
    fetch(`${URL}search?${props}`, {headers: HEADERS()})
    .then(r => r.json())
    .then(choice => this.props.addChoice(choice))
  }

  render(){
    return(
      <li>
        {this.props.food.food_name}{this.props.food.brand_name ? `- ${this.props.food.brand_name}` : null}
        <button onClick={this.handleAddChoice}>+</button>
      </li>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addChoice: (choice) => dispatch({ type: 'ADD_CHOICES', payload: [choice]})
  }
}

export default connect(null, mapDispatchToProps)(SearchResultCard)