<template>
  <Header :theme="theme" :toggleTheme="toggleTheme" />
  <router-view />
  <Footer :theme="theme" />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
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
