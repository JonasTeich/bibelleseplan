<template>
  <div class="p-4 pb-20">
    <nuxt-link to="/mission">
      <fa
        :icon="['fas', 'angle-left']"
        class="text-gray-700 text-3xl"
      />
    </nuxt-link>
    <h1 class="text-4xl py-4">{{ selectedMissionary.missionary }}, {{ selectedMissionary.location }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    selectedMissionary () {
      let data = this.$store.state.missions.filter(e => {
        if (e.id === parseInt(this.$route.params.id)) {
          return true
        }
      })
      return data[0]
    }
  },
  mounted () {
    this.$store.dispatch('getMissions')
  }
}
</script>
