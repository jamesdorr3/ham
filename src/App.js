import React from 'react';
import './App.css';
import SearchContainer from './containers/SearchContainer'
import ChoiceContainer from './containers/ChoiceContainer'
import LoginContainer from './containers/LoginContainer'
import {DragDropContext} from 'react-beautiful-dnd';
import {connect} from 'react-redux'

class App extends React.Component {

  onDragEnd = result => {
    const {destination, source, draggableId} = result;
    // console.log(' from ', source.index, ' to ', destination.index, ' with id ', draggableId)
    if (!destination) {
      return;
    }
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    //   ) {
    //   return;
    // }
    this.props.updateIndex({id: draggableId, index: destination.index})
  };

  render(){
    return (
      <div className="App">
        < LoginContainer />
        < SearchContainer />
        <DragDropContext onDragEnd={this.onDragEnd}>
          < ChoiceContainer />
        </DragDropContext>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    updateIndex: choiceIdAndIndex => dispatch({ type: 'UPDATE_INDEX', payload: choiceIdAndIndex})
  }
}

export default connect(null, mapDispatchToProps)(App);
