<template>
  <ul>
    <div v-for="(todo, index) in todos">
      <li @click="toggleCompleted(todo)" 
        :class="{ 'completed': todo.completed }"
        class="todo"
        v-text="todo.title">
      </li>
      <span @click="deleteTd(index)" class="delete">✘</span>
    </div>
  </ul>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    toggleCompleted (todo) {
      todo.completed = !todo.completed;
    },
    deleteTd (index) {
      this.todos.splice(index, 1)
    }
  },
  props: ['todos']
}
</script>

<style>
.todo {
  display: inline-block;
  cursor: pointer;
  transition: all 0.25s;
  color: red;
}
.completed {
  /*text-decoration: line-through;*/
	color: blue;
}
.delete {
  cursor: pointer;
}
</style>