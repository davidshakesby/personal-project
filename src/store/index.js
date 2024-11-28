import { createStore } from 'vuex'

// Define the initial state
const store = createStore({
  state: {
    theme: localStorage.getItem('theme') || 'light'
  },
  mutations: {
    // Mutation to toggle theme
    toggleTheme (state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    }
  },
  actions: {
    asyncToggleTheme ({ commit }) {
      setTimeout(() => {
        commit('toggleTheme')
      }, 500)
    }
  }
})

export default store
