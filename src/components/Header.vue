<template>
  <header :class="theme">
    <div class="fl ai-c jc-sb">
      <!-- Toggle Switch -->
      <div class="fl ai-c">
        <text class="mr-10">Theme</text>
        <label class="switch">
          <input type="checkbox" @change="toggleTheme" :checked="theme === 'dark'" />
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    // Map state to component
    ...mapState(['theme'])
  },
  methods: {
    // Map mutation to method
    ...mapMutations(['toggleTheme'])
  }
}
</script>

<style scoped>
  header {
    padding: 1em;
    text-align: center;
  }
</style>
