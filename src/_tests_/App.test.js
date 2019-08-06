
import ChoiceCard from './components/ChoiceCard'
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

const choiceFood = {
  choice: {
    amount: 1,
    category_id: 35,
    created_at: "2019-08-06T17:31:55.665Z",
    day_id: 138,
    food_id: 45,
    id: 533,
    index: 1565112715,
    measure_id: 153,
    updated_at: "2019-08-06T17:31:55.665Z",
  },
  food: {
    brand: null,
    calories: 71.5,
    carbs: 0.36,
    choice_count: 14,
    cholesterol: 186,
    created_at: "2019-06-09T04:55:52.921Z",
    dietary_fiber: 0,
    fat: 4.755,
    fdcId: 171287,
    id: 45,
    name: "Egg, whole, raw, fresh",
    potassium: 69,
    protein: 6.28,
    saturated_fat: 1.563,
    serving_grams: 50,
    serving_unit_amount: null,
    serving_unit_name: null,
    sodium: 71,
    sugars: 0.185,
    unit_size: null,
    upc: null,
    updated_at: "2019-08-06T17:31:55.644Z",
    user_id: 26,
  },
  measures: [
    {
      amount: 1,
      created_at: "2019-06-09T04:55:52.928Z",
      food_id: 45,
      grams: 50,
      id: 153,
      name: "large",
      updated_at: "2019-06-09T04:55:52.928Z",
    }
  ]
}

describe('Choice', () => {
  it('should render a new choice correctly', () => {
    const output = shallow(
      <ChoiceCard
        choiceFood={choiceFood} 
        key={choiceFood.choice.id} 
        index={1}
        deleteChoice='' 
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});