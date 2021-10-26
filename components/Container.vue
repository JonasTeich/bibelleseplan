<template>
  <div class="max-w-800 m-auto min-h-screen p-4 pt-20" :class="{ 'pb-20': isDay }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    isDay: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style>
.max-w-800 {
  max-width: 800px;
}
</style>
