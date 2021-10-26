<template>
  <div>
    <h2 class="text-2xl font-bold">Einleitung</h2>
    <p v-html="text" class="text-xl"></p>
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