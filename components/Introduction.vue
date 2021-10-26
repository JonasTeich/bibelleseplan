<template>
  <div>
    <h2 class="text-xl font-bold">Einleitung</h2>
    <p v-html="text" class="text-lg"></p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      requirede: false,
      default: ''
    }
  }
}
</script>