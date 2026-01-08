<template>
  <footer :class="theme">
    <p class="text-center p-16">© 2024 David Shakesby</p>
  </footer>
</template>

<script>

export default {
  props: {
    theme: String,
    toggleTheme: Function
  }
}
</script>
