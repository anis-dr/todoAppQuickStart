/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Platform, FlatList} from 'react-native';
import Header from './components/Header';
import InputBar from './components/InputBar';
import TodoItem from './components/TodoItem';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: '',
      todos: [
        {id: 0, title: 'take our the trash', done: false},
        {id: 1, title: 'Cook dinner', done: false},
      ],
    };
  }
  toggleDone(item) {
    let todos = this.state.todos;

    todos = todos.map(todo => {
      if (todo.id == item.id) {
        todo.done = !todo.done;
      }
      return todo;
    });

    this.setState(todos);
  }

  addNewTodo() {
    let todos = this.state.todos;
    todos.unshift({
      id: todos.length + 1,
      title: this.state.todoInput,
      done: false,
    });

    this.setState({
      todos,
      todoInput: '',
    });
  }

  render() {
    const statusbar =
      Platform.OS === 'ios' ? <View style={styles.statusbar} /> : <View />;

    return (
      <View style={styles.container}>
        {statusbar}
        <Header title={'todoapp'} />

        <InputBar
          textChange={todoInput => this.setState({todoInput})}
          addNewTodo={() => this.addNewTodo()}
          todoInput={this.state.todoInput}
        />
        <FlatList
          data={this.state.todos}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
          renderItem={({item, index}) => {
            return (
              <TodoItem
                todoItem={item}
                toggleDone={() => this.toggleDone(item)}
              />
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusbar: {
    color: '#FFCE00',
    height: 40,
  },
});
