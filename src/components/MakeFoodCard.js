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
    upc: '',
    error: null
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
    }else{
      this.setState({error: 'Please fill required fields'})
    }
  }

  render(){
    return(
      <div className='createFoodContainer'>
      <form style={{display: this.props.addFood ? 'block' : 'none'}} onSubmit={this.handleSubmit} className='foodForm'>
        {this.state.error ? <p className='errorMessage'>{this.state.error}</p> : null }
        <ul className='newFoodGrid'>
          <li>
          <label>Food name</label>
          <input type='text' value={this.state.name} onChange={this.handleChange} name='name' placeholder='Food name' />
          </li>
          <li>
          <label>Brand (optional)</label>
          <input type='text' value={this.state.brand} onChange={this.handleChange} name='brand' placeholder='food brand (optional)' />
          </li>
          <li>
          <label>Serving Amount</label>
          <input type='number' step="any" min='1' value={this.state.serving_unit_amount} onChange={this.handleChange} name='serving_unit_amount' placeholder='serving amount' />
          </li>
          <li>
          <label>Serving Unit</label>
          <select name='serving_unit_name' value={this.state.serving_unit_name} onChange={this.handleChange} placeholder="unit">
              {['unit','tbsp','package','piece', 'small', 'medium', 'large'].map(measure => {
                return <option value={measure} name='measure' >{measure} </option>}
              )}
          </select>
          </li>
          <li>
            <label>Serving in Grams</label>
            <input type='number' step="any" min='1' value={this.state.serving_grams} onChange={this.handleChange} name='serving_grams' placeholder='grams/serving' />
          </li>
          {/* <li></li> */}
          <li>
            <label>Calories</label>
            <input type='number' step="any" min='0' value={this.state.calories} onChange={this.handleChange} name='calories' placeholder='Calories' />
          </li>
          <li>
            <label>Fat</label>
            <input type='number' step="any" min='0' value={this.state.fat} onChange={this.handleChange} name='fat' placeholder='fat' />
          </li>
          <li>
            <label>Carbs</label>
            <input type='number' step="any" min='0' value={this.state.carbs} onChange={this.handleChange} name='carbs' placeholder='carbs' />
          </li>
          <li>
            <label>Protein</label>
            <input type='number' step="any" min='0' value={this.state.protein} onChange={this.handleChange} name='protein' placeholder='protein' />
          </li>
          <li>
            <input type='submit' />
          </li>
        </ul>
        <a onClick={() => this.setState({moreInfoForm: !this.state.moreInfoForm})} className='showMore'>
          {this.state.moreInfoForm ? '⬆ Show Less Info (Optional) ⬆' : '⬇ Add More Info (Optional) ⬇'}
        </a>
        <ul className='newFoodGrid' style={{display: this.state.moreInfoForm ? 'grid' : 'none'}}>
          <li>
            <label>Saturated Fat</label>
            <input type='number' step="any" min='0' value={this.state.saturated_fat} onChange={this.handleChange} name='saturated_fat' placeholder='saturated fat' />
          </li>
          <li>
            <label>Sugars</label>
            <input type='number' step="any" min='0' value={this.state.sugars} onChange={this.handleChange} name='sugars' placeholder='sugars' />
          </li>
          <li>
            <label>Dietary Fiber</label>
            <input type='number' step="any" min='0' value={this.state.dietary_fiber} onChange={this.handleChange} name='dietary_fiber' placeholder='dietary fiber' />
          </li>
          <li>
            <label>Sodium</label>
            <input type='number' step="any" min='0' value={this.state.sodium} onChange={this.handleChange} name='sodium' placeholder='sodium' />
          </li>
          <li>
            <label>Cholesterol</label>
            <input type='number' step="any" min='0' value={this.state.cholesterol} onChange={this.handleChange} name='cholesterol' placeholder='cholesterol' />
          </li>
          <li>
            <label>Potassium</label>
            <input type='number' step="any" min='0' value={this.state.potassium} onChange={this.handleChange} name='potassium' placeholder='potassium' />
          </li>
          <li>
            <label>Unit Size</label>
            <input type='number' step="any" min='0' value={this.state.unit_size} onChange={this.handleChange} name='unit_size' placeholder='unit size' />
          </li>
          <li>
            <label>Bar Code / UPC</label>
            <input type='number' step="any" min='0' value={this.state.upc} onChange={this.handleChange} name='upc' placeholder='UPC code' />
          </li>
          <li></li>
          <li>
            <input type='submit' />
          </li>
        </ul>
      </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createFood: (food) => dispatch(createFood(food))
  }
}


export default connect(null, mapDispatchToProps)(MakeFoodCard)