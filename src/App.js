import React from 'react';
import './App.css';
import SearchContainer from './containers/SearchContainer'
import ChoiceContainer from './containers/ChoiceContainer'
import LoginContainer from './containers/LoginContainer'
import {DragDropContext} from 'react-beautiful-dnd';

class App extends React.Component {

  render(){
    return (
      <div className="App">
        < LoginContainer />
        < SearchContainer />
        <DragDropContext>
          < ChoiceContainer />
        </DragDropContext>
      </div>
    );
  }
}

export default App;
