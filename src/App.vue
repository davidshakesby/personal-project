<template>
  <Header :theme="theme" :toggleTheme="toggleTheme" />
  <router-view />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from './components/Header.vue'

export default {
  components: {
    Header
  },
  computed: {
    ...mapState(['theme']) // Access theme from Vuex state
  },
  methods: {
    ...mapActions(['asyncToggleTheme']), // Dispatch Vuex action
    toggleTheme () {
      this.asyncToggleTheme() // Centralized toggle logic
    }
  }
}
</script>
