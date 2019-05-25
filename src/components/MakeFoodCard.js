import React from 'react'
import {createFood} from '../actions/foodsActions'
import {connect} from 'react-redux'

class MakeFoodCard extends React.Component {

  state = {
    name: '',
    brand: '',
    serving_unit_amount: '',
    serving_unit_name: '',
    serving_grams: '',
    calories: '',
    serving_unit_name: 'unit',
    fat: '',
    carbs: '',
    protein: '',
    cholesterol: '',
    dietary_fiber: '',
    potassium: '',
    saturated_fat: '',
    sodium: '',
    sugars: '',
    unit_size: '',
    upc: ''
  }

  handleChange = (e) => {
    // console.log(e.target.name, e.target.value)
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const s = this.state
    if (s.name && s.serving_unit_amount && s.serving_unit_name && s.serving_grams && s.calories && s.fat && s.carbs && s.protein) {
      this.props.createFood({...this.state, categoryId: this.props.categoryId})
      this.props.closeAddFood()
      this.setState({
        name: '',
        brand: '',
        serving_unit_amount: '',
        serving_unit_name: '',
        serving_grams: '',
        calories: '',
        serving_unit_name: 'unit',
        fat: '',
        carbs: '',
        protein: '',
        cholesterol: '',
        dietary_fiber: '',
        potassium: '',
        saturated_fat: '',
        sodium: '',
        sugars: '',
        unit_size: '',
        upc: ''
      })
    }
  }

  render(){
    return(
      <form style={{display: this.props.addFood ? 'block' : 'none'}} onSubmit={this.handleSubmit} className='foodForm'>
        <ul className='newFoodGrid'>
          <input type='text' value={this.state.name} onChange={this.handleChange} name='name' placeholder='Food name' />
          <input type='text' value={this.state.brand} onChange={this.handleChange} name='brand' placeholder='food brand (optional)' />
          <input type='number' value={this.state.serving_unit_amount} onChange={this.handleChange} name='serving_unit_amount' placeholder='serving amount' />
          <select name='serving_unit_name' value={this.state.serving_unit_name} onChange={this.handleChange} placeholder="unit">
              {['unit','package','piece'].map(measure => {
                return <option value={measure} name='measure' >{measure} </option>}
              )}
          </select>
          <input type='number' value={this.state.serving_grams} onChange={this.handleChange} name='serving_grams' placeholder='grams/serving' />
          <input type='number' value={this.state.calories} onChange={this.handleChange} name='calories' placeholder='calories' />
          <input type='number' value={this.state.fat} onChange={this.handleChange} name='fat' placeholder='fat' />
          <input type='number' value={this.state.carbs} onChange={this.handleChange} name='carbs' placeholder='carbs' />
          <input type='number' value={this.state.protein} onChange={this.handleChange} name='protein' placeholder='protein' />
          <input type='number' value={this.state.cholesterol} onChange={this.handleChange} name='cholesterol' placeholder='cholesterol' />
          <input type='number' value={this.state.dietary_fiber} onChange={this.handleChange} name='dietary_fiber' placeholder='dietary fiber' />
          <input type='number' value={this.state.potassium} onChange={this.handleChange} name='potassium' placeholder='potassium' />
          <input type='number' value={this.state.saturated_fat} onChange={this.handleChange} name='saturated_fat' placeholder='saturated fat' />
          <input type='number' value={this.state.sodium} onChange={this.handleChange} name='sodium' placeholder='sodium' />
          <input type='number' value={this.state.sugars} onChange={this.handleChange} name='sugars' placeholder='sugars' />
          <input type='number' value={this.state.unit_size} onChange={this.handleChange} name='unit_size' placeholder='unit size' />
          <input type='number' value={this.state.upc} onChange={this.handleChange} name='upc' placeholder='UPC code' />
          <input type='submit' />
        </ul>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createFood: (food) => dispatch(createFood(food))
  }
}


export default connect(null, mapDispatchToProps)(MakeFoodCard)