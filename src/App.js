import React from 'react';
import './App.css';
import SearchContainer from './containers/SearchContainer'
import ChoiceContainer from './containers/ChoiceContainer'
import './constants.js'

class App extends React.Component {

  state = {
    choices: []
  }

  componentDidMount(){
    fetch(`${URL}/choices`)
    .then(r => r.json())
    .then(choices => this.setState({choices: choices}))
  }

  addChoice = (choice) => {
    const newChoices = [...this.state.choices]
    newChoices.push(choice)
    this.setState({choices: newChoices})
  }

  deleteChoice = (choiceId) => {
    this.setState({choices: this.state.choices.filter(choice => choice.id !== choiceId)})
    fetch(`${URL}/choices/${choiceId}`, {method: 'DELETE'})
  }

  render(){
    return (
      <div className="App">
        < SearchContainer addChoice={this.addChoice} />
        < ChoiceContainer choices={this.state.choices} deleteChoice={this.deleteChoice} />
      </div>
    );
  }
}

export default App;
