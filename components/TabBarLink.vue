<template>
  <nuxt-link :to="to" :class="{ 'text-gray-700': isActive }" class="text-gray-400 flex flex-col justify-center items-center">
    <fa :icon="['fas', icon]" class="text-2xl" />
    <span>
      <slot />
    </span>
  </nuxt-link>
</template>

<script>
export default {
  data: () => ({
    isActive: false
  }),
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
  mounted() {
    const route = this.$route.path
    this.isActive = route === this.to
    if (Object.keys(this.$route.params).length > 0 && this.to === '/plans') {
      this.isActive = true
    }
  },
}
</script>