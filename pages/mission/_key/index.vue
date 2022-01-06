<template>
  <v-app class="p-4 pb-20">
    <nuxt-link to="/mission">
      <fa
        :icon="['fas', 'angle-left']"
        class="text-gray-700 text-3xl"
      />
    </nuxt-link>
    <div v-if="selectedMissionary">
      <h1 class="text-4xl py-4">{{ selectedMissionary.missionary }}, {{ selectedMissionary.location }}</h1>
      <v-carousel
        cycle
        hide-delimiter-background
        height="250"
      >
        <v-carousel-item
          v-for="(item, i) in images"
          :key="i"
          :src="item"
        ></v-carousel-item>
      </v-carousel>
      <p class="mt-6">{{ selectedMissionary.text }}</p>
      <h2 class="text-lg font-bold">Gebetsanliegen:</h2>
      <ul class="list-disc">
        <li v-for="(item, i) in selectedMissionary.pray_list" :key="i">{{ item }}</li>
      </ul>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    images: []
  }),
  computed: {
    selectedMissionary () {
      return this.$store.state.missions.filter(e => e.key === this.selectedKey)[0]
    },
    selectedKey () {
      return this.$route.params.key
    }
  },
  mounted () {
    this.$store.dispatch('getMissions')
    const { data, error } = this.$supabase.storage
      .from('missions')
      .list(this.selectedKey)
      .then(response => {
        response.data.map(element => {
          this.$supabase.storage
            .from('missions')
            .download(this.selectedKey + '/' + element.name)
            .then(response => {
              this.images.push(URL.createObjectURL(response.data))
            })
        })
      })
  }
}
</script>
