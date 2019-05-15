import React from 'react';
import './App.css';
import SearchCard from './components/SearchCard'
import ChoiceContainer from './containers/ChoiceContainer'

class App extends React.Component {

  state = {
    foods: []
  }
  render(){
    return (
      <div className="App">
        < SearchCard />
        < ChoiceContainer />
      </div>
    );
  }
}

export default App;
