import React, { Component, PropTypes } from 'react'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'
import Footer from '../components/Footer'

import { connect } from 'react-redux';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from '../actions/actions';

import { creactTodoId } from '../util/index'

class App extends Component {
  render() {
		const { dispatch, visibleTodos, visibilityFilter } = this.props
		return (
			<div>
				<AddTodo onAddTodo={(text) => dispatch(addTodo(text))} />
				<TodoList todos={visibleTodos} onTodoClick={(id) => dispatch(toggleTodo(id))} />
				<Footer filter={visibilityFilter} onFilterChange={(filter) => dispatch(setVisibilityFilter(filter))} />
			</div>
		)
	}
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })),
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function filterTodos(todos, filter) {
  switch (filter) {
  case VisibilityFilters.SHOW_ALL:
    return todos;
  case VisibilityFilters.SHOW_COMPLETED:
    return todos.filter(todo => todo.completed);
  case VisibilityFilters.SHOW_ACTIVE:
    return todos.filter(todo => !todo.completed);
  }
}

function select(state) {
  return {
    visibleTodos: filterTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App);