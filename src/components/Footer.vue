<template>
  <footer :class="theme">
    <p>© 2024 David Shakesby</p>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['theme']) // Maps Vuex state to 'theme'
  }
}
</script>

<style scoped>
footer {
  text-align: center;
  padding: 1em;
}
</style>
