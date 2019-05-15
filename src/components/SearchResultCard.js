import React from 'react'

class SearchResultCard extends React.Component {

  handleAddCommon = () => {
    fetch(`http://localhost:3001/search?q=${this.props.food.food_name}`)
    .then(r => r.json())
    .then(choice => this.props.addChoice(choice))
    .then(r => console.log('search results card'))
  }

  handleAddBranded = () => {
    console.log('branded')
  }

  render(){
    return(
      <li>
        {this.props.food.food_name}{this.props.food.brand_name ? `- ${this.props.food.brand_name}` : null}
        <button onClick={this.props.food.nix_item_id ? this.handleAddBranded : this.handleAddCommon }>+</button>
      </li>
    )
  }
}

export default SearchResultCard