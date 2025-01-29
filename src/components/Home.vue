<template>
  <div class="sm:w-450 ml-6 mr-6 sm:mx-auto text-center mt-20 mb-20">
    <h1 class="text-4xl mb-5">Vue To-Do List</h1>

    <div class="flex justify-center gap-1 mb-1 p-1">
      <input
      class="p-2"
      :value="newTask"
        @input="SET_NEW_TASK($event.target.value)"
        @keyup.enter="addTask"
        placeholder="Add a new task"
      />
      <button class="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addTask">Add</button>
    </div>

    <!-- Error message -->
    <p v-if="errorMessage" class="text-warning">{{ errorMessage }}</p>
    <ul>
      <li class="flex justify-between items-center p-10 border-b border-b-gray cursor-pointer hover:bg-gray-50" v-for="(task, index) in tasks" :key="index" @click="toggleTask(index)">
      <span :class="{ completed: task.completed }">
        {{ task.text }}
      </span>
    <button class="text-warning text-3xl" @click.stop="removeTask(index)">&#215;</button>
  </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('todo', ['tasks', 'newTask', 'errorMessage'])
  },
  methods: {
    ...mapMutations('todo', ['SET_NEW_TASK', 'SET_ERROR']),
    ...mapActions('todo', ['addTask', 'removeTask', 'toggleTask', 'loadTasks'])
  },
  mounted () {
    this.loadTasks()
  }
}
</script>
