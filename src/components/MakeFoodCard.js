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
      <form style={{display: this.props.addFood ? 'block' : 'none'}} onSubmit={this.handleSubmit}>
      <input type='text' value={this.state.name} onChange={this.handleChange} name='name' placeholder='Food name' /> by 
      <input type='text' value={this.state.brand} onChange={this.handleChange} name='brand' placeholder='food brand (optional)' /> has a serving size of
      <input type='number' value={this.state.serving_unit_amount} onChange={this.handleChange} name='serving_unit_amount' placeholder='X' />
      <select name='serving_unit_name' value={this.state.serving_unit_name} onChange={this.handleChange} placeholder="units">
        <option value='unit' name='unit' >unit</option>
        <option value='package' name='package' >package</option>
        <option value='piece' name='piece' >piece</option>
      </select> which equals
      <input type='number' value={this.state.serving_grams} onChange={this.handleChange} name='serving_grams' placeholder='X' /> grams
      <br/>
      Per serving, it has
      <input type='number' value={this.state.calories} onChange={this.handleChange} name='calories' placeholder='X' />calories,
      <input type='number' value={this.state.fat} onChange={this.handleChange} name='fat' placeholder='X' />fat,
      <input type='number' value={this.state.carbs} onChange={this.handleChange} name='carbs' placeholder='X' />carbs, and
      <input type='number' value={this.state.protein} onChange={this.handleChange} name='protein' placeholder='X' /> protein
      <br/>
      (Optional) and
      <input type='number' value={this.state.cholesterol} onChange={this.handleChange} name='cholesterol' placeholder='X' />cholesterol,
      <input type='number' value={this.state.dietary_fiber} onChange={this.handleChange} name='dietary_fiber' placeholder='X' />dietary_fiber,
      <input type='number' value={this.state.potassium} onChange={this.handleChange} name='potassium' placeholder='X' />potassium,
      <br/>
      <input type='number' value={this.state.saturated_fat} onChange={this.handleChange} name='saturated_fat' placeholder='X' />saturated_fat,
      <input type='number' value={this.state.sodium} onChange={this.handleChange} name='sodium' placeholder='X' />sodium, and
      <input type='number' value={this.state.sugars} onChange={this.handleChange} name='sugars' placeholder='X' />sugars
      <br/>
      (Optional) - the whole package is this many
      <input type='number' value={this.state.unit_size} onChange={this.handleChange} name='unit_size' placeholder='grams' />, and the UPC is
      <input type='number' value={this.state.upc} onChange={this.handleChange} name='upc' placeholder='UPC' />
      <input type='submit' />
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