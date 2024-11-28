<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import styles from './assets/styles/styles.scss'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      styles
    }
  }
}
</script>
