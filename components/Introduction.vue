<template>
  <div>
    <h2 class="text-lg font-bold">Einleitung</h2>
    <p v-html="text"></p>
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