import React from 'react';
import './App.css';
import SearchContainer from './containers/SearchContainer'
import ChoiceContainer from './containers/ChoiceContainer'
// import './constants.js'

class App extends React.Component {

  render(){
    return (
      <div className="App">
        < SearchContainer />
        < ChoiceContainer />
      </div>
    );
  }
}

export default App;
