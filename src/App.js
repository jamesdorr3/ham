import React from 'react';
import './App.css';
import SearchContainer from './containers/SearchContainer'
import Table from './containers/Table'
import Header from './containers/Header'
import {DragDropContext} from 'react-beautiful-dnd';
import {connect} from 'react-redux'
import Footer from './components/Footer'
import {saveAll} from './actions/saveAllAction'

class App extends React.Component {

  onDragEnd = result => {
    const {destination, draggableId} = result;
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
    const choiceFoods = orderedIds.map((id, i) => {
      this.props.editChoice({choice: {id: id, index: i, category_id: categoryId}})
      return({choice: {id: id, index: i, category_id: categoryId}})
    })
    this.props.saveAll({choiceFoods: choiceFoods})
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
        <div  className='search'>
          < SearchContainer />
        </div>
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
    editChoice: info => dispatch({ type: 'EDIT_CHOICE', payload: info}),
    saveAll: info => dispatch(saveAll(info)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
