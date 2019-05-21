import React from 'react';
import './App.css';
import SearchContainer from './containers/SearchContainer'
import ChoiceContainer from './containers/ChoiceContainer'
import Header from './containers/Header'
import {DragDropContext} from 'react-beautiful-dnd';
import {connect} from 'react-redux'

class App extends React.Component {

  onDragEnd = result => {
    const {destination, source, draggableId} = result;
    if (!destination) {
      return;
    }
    const choicesIds = []
    document.querySelectorAll('tr.choice').forEach(x => choicesIds.push(x.id))
    const movedId = choicesIds.splice(source.index, 1)[0]
    choicesIds.splice(destination.index, 0, movedId)
    this.props.updateIndex({choicesIds: choicesIds})
  };

  render(){
    return (
      <div className="App">
        < Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
          < ChoiceContainer />
        </DragDropContext>
        < SearchContainer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    updateIndex: choicesIds => dispatch({ type: 'UPDATE_INDEX', payload: choicesIds})
  }
}

export default connect(null, mapDispatchToProps)(App);
