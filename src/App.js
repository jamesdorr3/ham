import React from 'react';
import './App.css';
import SearchContainer from './containers/SearchContainer'
import ChoiceContainer from './containers/ChoiceContainer'

class App extends React.Component {

  state = {
    choices: []
  }

  componentDidMount(){
    fetch('http://localhost:3001/choices')
    .then(r => r.json())
    .then(choices => this.setState({choices: choices}))
    .then(r => console.log(this.state.choices))
  }

  addChoice = (choice) => {
    // console.log('app add choice')
    const newChoices = [...this.state.choices]
    newChoices.push(choice)
    this.setState({choices: newChoices})
  }

  render(){
    return (
      <div className="App">
        < SearchContainer addChoice={this.addChoice} />
        < ChoiceContainer choices={this.state.choices} />
      </div>
    );
  }
}

export default App;
