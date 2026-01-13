<template>
  <div ref="menuRef" class="md:hidden">
    <button
      @click="toggleMenu"
      class="flex flex-col justify-around h-8 w-8 p-1 rounded hover:bg-gray-400"
    >
      <span class="h-0.5 rounded bg-gray-600 w-full"></span>
      <span class="h-0.5 rounded bg-gray-600 w-full"></span>
      <span class="h-0.5 rounded bg-gray-600 w-full"></span>
    </button>

    <div
      v-if="isMenuOpen"
      :class="theme"
      class="absolute left-0 right-0 top-full flex flex-col"
    >
      <RouterLink class="px-4 py-2 nav--button" to="/" @click="isMenuOpen = false">Home</RouterLink>
      <RouterLink class="px-4 py-2 nav--button" to="/portfoilo" @click="isMenuOpen = false">Portfolio</RouterLink>
      <RouterLink class="px-4 py-2 nav--button" to="/about" @click="isMenuOpen = false">About Me</RouterLink>
      <RouterLink class="px-4 py-2 nav--button" to="/todo" @click="isMenuOpen = false">Todo List</RouterLink>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  props: {
    theme: { type: String, required: true }
  },
  setup () {
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const menuRef = ref(null)

    const handleClickOutside = (event) => {
      if (isMenuOpen.value && menuRef.value && !menuRef.value.contains(event.target)) {
        isMenuOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isMenuOpen,
      toggleMenu,
      menuRef
    }
  }
}
</script>

<style scoped>
@keyframes itemanim {
    from {
        scale: 0%
    }

    to {
        scale: 100%
    }
}

.item-animation {
    animation-name: itemanim;
}

.item-animation:nth-child(4) {
    animation-duration: 0.8s;
}

.item-animation:nth-child(2) {
    animation-duration: 0.4s;
}

.item-animation:nth-child(3) {
    animation-duration: 1.2s;
}
</style>
