<template>
<div>
  <input v-model="newTd" 
        @keyup.enter="addTds" 
        placeholder="add todos">
  <todo-list :todos="todos"></todo-list>
</div>
</template>

<script>
import TodoList from './componets/todoList.vue'
import Store from './store/store'

export default {
  data () {
    return {
      todos: Store.fetch(),
      newTd:''
    }
  },
  methods: {
    addTds () {
      if (this.newTd.trim() == '') {
        return
      }
      let todo = {
        title: this.newTd,
        completed: false
      }
      this.todos.push(todo);
      this.newTd = '';
    }
  },
  components: { TodoList },
  watch: {
    todos: {
      handler: function (val, oldVal) {
        Store.save(val)
      },
      deep: true
    }
  }
}
</script>

<style>
</style>