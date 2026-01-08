<template>
  <header :class="theme">
    <div class="flex items-center justify-between p-16">
      <!-- Toggle Switch -->
      <div class="flex items-center">
        <text class="mr-10">Theme</text>
        <button
          @click="toggleTheme"
          class= "bg-white text-gray-800 hover:opacity-80 font-bold py-2 px-4 border rounded-full"
        >
          {{ theme.charAt(0).toUpperCase() + theme.slice(1) }} Mode
        </button>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  props: {
    theme: String,
    toggleTheme: Function
  }
}
</script>
