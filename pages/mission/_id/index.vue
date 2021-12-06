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
      const data = this.$store.state.missions.filter(e => {
        if (e.id === parseInt(this.$route.params.id)) {
          return true
        }
      })
      console.log(data);
      return data[0]
    }
  },
  mounted () {
    this.$store.dispatch('getMissions')
    const { data, error } = this.$supabase.storage
      .from('missions')
      .list('arthur')
      .then(response => {
        response.data.map(element => {
          this.$supabase.storage
            .from('missions')
            .download('arthur/' + element.name)
            .then(response => {
              this.blobToImg(response.data)
            })
        })
      })
  },
  methods: {
    blobToImg (blob) {
      return new Promise(resolve => {
        this.images.push(URL.createObjectURL(blob))
      })
    }
  }
}
</script>
