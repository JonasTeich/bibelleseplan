<template>
  <div class="p-4 pb-20">
    <div v-if="songSelected" class="fixed top-0 left-0 w-full h-full z-30 bg-white p-4 overflow-scroll">
      <div class="flex text-1xl w-full justify-between mb-4">
        <h3 class="text-2xl">{{ selectedSong.title }}</h3>
        <fa
          :icon="['fas', 'times']"
          class="text-gray-700 text-2xl"
          @click="closeSong"
        />
      </div>
      <p class="overflow-scroll" v-html="selectedSong.text"></p>
    </div>
    <h1 class="text-4xl py-4">Lieder</h1>
    <div>
      <div class="song border-b py-4" v-for="song in songs" :key="song.id" @click="selectSong(song)">
        <span class="pr-2">{{ song.id }}</span>
        <span>{{ song.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    songs: [],
    songSelected: false,
    selectedSong: {}
  }),
  mounted () {
    this.$store.dispatch('getSongs')
  },
  computed: {
    getSongs () {
      return JSON.parse(JSON.stringify(this.$store.state.songs))
    }
  },
  watch: {
    getSongs: function (val) {
      this.songs = val
    }
  },
  methods: {
    selectSong (song) {
      this.songSelected = true
      this.selectedSong = song
    },
    closeSong () {
      this.songSelected = false
    }
  }
}
</script>

<style>
.song:last-child {
  border: none;
}
</style>