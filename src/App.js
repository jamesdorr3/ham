import React from 'react';
import './App.css';
import SearchContainer from './containers/SearchContainer'
import ChoiceContainer from './containers/ChoiceContainer'
import LoginContainer from './containers/LoginContainer'
// import './constants.js'

class App extends React.Component {

  render(){
    return (
      <div className="App">
        < LoginContainer />
        < SearchContainer />
        < ChoiceContainer />
      </div>
    );
  }
}

export default App;
