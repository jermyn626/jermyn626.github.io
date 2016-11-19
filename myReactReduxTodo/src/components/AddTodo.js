import React, { Component, PropTypes } from 'react'

export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='text' onKeyUp={(e) => this.handleKeyUp(e)} ref='input' placeholder='please write some...' />
        <button onClick={this.handleClick.bind(this)}>
          Add
        </button>
      </div>
    )
  }

  handleKeyUp(e) {
    if (e.keyCode == 13) {
      const node = this.refs.input
      const text = node.value.trim()
      if (text == '') {
        return
      }
      console.log('adding with keyUp Enter...')
      this.props.onAddTodo(text)
      node.value = ''
    } 
  }

  handleClick() {
    const node = this.refs.input
    const text = node.value.trim()
    if (text == '') {
      return
    }
    console.log('adding with Button...')
    this.props.onAddTodo(text)
    node.value = ''
  }

}

AddTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired
}