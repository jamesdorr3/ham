import React from 'react';
import './App.css';
import SearchContainer from './containers/SearchContainer'
import Table from './containers/Table'
import Header from './containers/Header'
import {DragDropContext} from 'react-beautiful-dnd';
import {connect} from 'react-redux'
import Footer from './components/Footer'

class App extends React.Component {

  onDragEnd = result => {
    const {destination, source, draggableId} = result;
    console.log(result)
    if (!destination) {
      return;
    }
    const choicesIds = []
    document.querySelectorAll('.choice').forEach(x => choicesIds.push(parseInt(x.id)))
    // const movedId = choicesIds.splice(source.index, 1)[0]
    // choicesIds.splice(destination.index, 0, movedId)
    const fromIndex = choicesIds.indexOf(draggableId)
    const toIndex = destination.index
    const toCategory = destination.droppableId
    const id = choicesIds.splice(fromIndex, 1)[0]
    choicesIds.splice(toIndex, 0, id)
    // debugger
    // this.props.updateIndex({choicesIds: choicesIds})
    this.props.handleDrop(choicesIds, draggableId, destination.droppableId)
  };

  render(){
    return (
      <div className="App">
        < Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
          < Table />
        </DragDropContext>
        < Footer />
        {/* < SearchContainer /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    handleDrop: (choicesIds, choiceId, categoryId) => dispatch({ type: 'HANDLE_DROP', payload: {choicesIds: choicesIds, choiceId: choiceId, categoryId: categoryId}}),
    updateIndex: choicesIds => dispatch({ type: 'UPDATE_INDEX', payload: choicesIds}),
    updateCategory: (choiceId, categoryId) => dispatch({ type: 'UPDATE_CATEGORY', payload: {choiceId: choiceId, categoryId: categoryId}})
  }
}

export default connect(null, mapDispatchToProps)(App);
