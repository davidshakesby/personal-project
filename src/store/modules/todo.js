/* This is where to declare the reactive state varibles to be used for the todo list */
const state = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [], // This is an array, it will load the array on intial load
  newTask: '',
  errorMessage: '',
  editingTaskIndex: null,
  editingTaskText: ''
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
  },
  /* This sets up the task for editing. The editingTaskIndex finds the position of the task in the array
  and the editingTaskText get the text from that task */
  SET_EDITING_TASK (state, { index, text }) {
    state.editingTaskIndex = index
    state.editingTaskText = text
  },
  /* This updates the editingTaskText with the input from the user */
  UPDATE_EDITING_TASK_TEXT (state, newText) {
    state.editingTaskText = newText
  },
  /* This checks if the user input it empty or repeats a task already there, if it does the show error message,
  if it passes both vailidation points, then update the array and add changes to localstorage.
  It also resets the editing state */
  UPDATE_TASK (state) {
    if (state.editingTaskIndex !== null) {
      const trimmedText = state.editingTaskText.trim()
      if (!trimmedText) {
        state.errorMessage = 'Task cannot be empty!'
        return // Exit early
      }
      if (state.tasks.some((task, i) => i !== state.editingTaskIndex && task.text.toLowerCase() === trimmedText.toLowerCase())) {
        state.errorMessage = 'Task already exists!'
        return
      }
      state.tasks[state.editingTaskIndex].text = trimmedText
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
      state.editingTaskIndex = null
      state.editingTaskText = ''
      state.errorMessage = ''
    }
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
  },
  setEditingTask ({ commit }, payload) {
    commit('SET_EDITING_TASK', payload)
  },
  updateEditingTaskText ({ commit }, newText) {
    commit('UPDATE_EDITING_TASK_TEXT', newText)
  },
  updateTask ({ commit }) {
    commit('UPDATE_TASK')
  }
}

/* The getters add the computed propertise for the state */
const getters = {
  tasks: state => state.tasks,
  newTask: state => state.newTask,
  errorMessage: state => state.errorMessage,
  editingTaskIndex: state => state.editingTaskIndex,
  editingTaskText: state => state.editingTaskText
}

export default {
  namespaced: true, // Ensures the module is properly namespaced
  state,
  mutations,
  actions,
  getters
}
