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

    const choiceFood = this.props.choiceFoods.find(x => x.choice.id === draggableId)
    const categoryId = destination.droppableId
    const thisCatsChoices = this.props.choiceFoods.filter(x => x.choice.category_id === categoryId)
    const orderedChoices = thisCatsChoices.sort((x, y) => x.choice.index - y.choice.index)
    const orderedIds = orderedChoices.map(x => x.choice.id)
    if (choiceFood.choice.category_id === categoryId){
      const index = orderedIds.indexOf(choiceFood.choice.id)
      orderedIds.splice(index, 1)
    }
    orderedIds.splice(destination.index, 0, choiceFood.choice.id)
    orderedIds.forEach((id, i) => {
      this.props.editChoice({id: id, choice: {index: i, category_id: categoryId}})
    })
  };

  render(){
    return (
      <div className="App">
        < Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
          < Table />
        </DragDropContext>
        <div className='loading'
          style={{display: this.props.loading ? 'block' : 'none'}}
        ></div>
        < Footer />
        {/* < SearchContainer /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return{
    handleDrop: (choicesIds, choiceId, categoryId) => dispatch({ type: 'HANDLE_DROP', payload: {choicesIds: choicesIds, choiceId: choiceId, categoryId: categoryId}}),
    updateIndex: choicesIds => dispatch({ type: 'UPDATE_INDEX', payload: choicesIds}),
    updateCategory: (choiceId, categoryId) => dispatch({ type: 'UPDATE_CATEGORY', payload: {choiceId: choiceId, categoryId: categoryId}}),
    editChoice: info => dispatch({ type: 'EDIT_CHOICE', payload: info})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
