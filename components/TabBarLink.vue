<template>
  <nuxt-link :to="to" :class="{ 'text-gray-700': isActive }" class="text-gray-400 flex flex-col justify-center items-center">
    <fa :icon="['fas', icon]" class="text-xl" />
    <span class="text-sm">
      <slot />
    </span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    isActive () {
      const route = this.$route.path
      if (Object.keys(this.$route.params).length > 0 && this.to === '/plans') {
        return true
      }
      return route === this.to
    }
  }
}
</script>