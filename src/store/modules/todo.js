/* This is where to declare the reactive state varibles to be used for the todo list */
const state = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [], // This is an array, it will load the array on intial load
  newTask: '',
  errorMessage: ''
}

const mutations = {
  /* Updates the newTask varible with user input */
  SET_NEW_TASK (state, task) {
    state.newTask = task.trim() // Trim to avoid empty spaces being considered as input
  },
  /* Sets the errorMessage varible for any validation feedback */
  SET_ERROR (state, message) {
    state.errorMessage = message
  },
  /* Add task if it passes the conditionals, then clears the input field, newTask and errorMessage varibles */
  ADD_TASK (state) {
    const trimmedTask = state.newTask.trim()

    // This checks if the input field empty
    if (!trimmedTask) { // Ensure it's not empty or just spaces
      state.errorMessage = 'Task cannot be empty!'
      state.newTask = ''
      return
    }

    // This checks if what the user input is already in the array
    if (state.tasks.some(task => task.text.toLowerCase() === trimmedTask.toLowerCase())) {
      state.errorMessage = 'Task already exists!'
      state.newTask = ''
      return
    }

    state.tasks.push({ text: trimmedTask, completed: false })
    state.newTask = '' // Clear input field
    state.errorMessage = ''
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },
  /* This removes the task from the array and updated the localstorage */
  REMOVE_TASK (state, index) {
    state.tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },
  /* This adds the .compelete style class if the task has been marked as done */
  TOGGLE_TASK (state, index) {
    state.tasks[index].completed = !state.tasks[index].completed
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },
  /* This fetches the tasks array from localstorage when the page is refreshed */
  LOAD_TASKS (state) {
    state.tasks = JSON.parse(localStorage.getItem('tasks')) || []
  }
}

/* the actions call the mutations above */
const actions = {
  addTask ({ commit }) {
    commit('ADD_TASK')
  },
  removeTask ({ commit }, index) {
    commit('REMOVE_TASK', index)
  },
  toggleTask ({ commit }, index) {
    commit('TOGGLE_TASK', index)
  },
  loadTasks ({ commit }) {
    commit('LOAD_TASKS')
  }
}

/* The getters add the computed propertise for the state */
const getters = {
  tasks: state => state.tasks,
  newTask: state => state.newTask,
  errorMessage: state => state.errorMessage
}

export default {
  namespaced: true, // Ensures the module is properly namespaced
  state,
  mutations,
  actions,
  getters
}
