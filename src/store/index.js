import { createStore } from 'vuex'

const store = createStore({
  state: {
    themes: ['light', 'dark', 'blue', 'green'], // List of available themes
    theme: localStorage.getItem('theme') || 'light' // Default theme
  },
  mutations: {
    // Mutation to set a specific theme
    setTheme (state, theme) {
      if (state.themes.includes(theme)) {
        state.theme = theme
        localStorage.setItem('theme', theme)
      } else {
        console.warn(`Theme "${theme}" is not valid.`)
      }
    },
    // Mutation to toggle to the next theme in the list
    toggleTheme (state) {
      const currentIndex = state.themes.indexOf(state.theme)
      const nextIndex = (currentIndex + 1) % state.themes.length
      state.theme = state.themes[nextIndex]
      localStorage.setItem('theme', state.theme)
    }
  },
  actions: {
    // Action to asynchronously toggle theme
    asyncToggleTheme ({ commit }) {
      setTimeout(() => {
        commit('toggleTheme')
      }, 500)
    },
    // Action to set a specific theme
    asyncSetTheme ({ commit }, theme) {
      setTimeout(() => {
        commit('setTheme', theme)
      }, 500)
    }
  }
})

export default store
