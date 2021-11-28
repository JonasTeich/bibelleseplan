<template>
  <div class="p-4 pb-20">
    <div v-if="songSelected" class="fixed top-0 left-0 w-full h-full z-30 bg-white p-4 overflow-scroll">
      <div class="flex text-1xl w-full justify-between mb-4">
        <h3 class="text-2xl">{{ selectedSong.title }}</h3>
        <fa :icon="['fas', 'times']" class="text-gray-700 text-2xl" @click="closeSong" />
      </div>
      <div v-for="(vers, index) in selectedSong.verses" :key="index">
        <div class="mb-4">
          <span class="font-bold">Strophe {{ index + 1 }}</span>
          <p v-html="vers"></p>
        </div>
        <div class="mb-4" v-if="index === 0 && selectedSong.refrain">
          <span class="font-bold">Refrain:</span>
          <p v-html="selectedSong.refrain"></p>
        </div>
      </div>
    </div>
    <h1 class="text-4xl py-4">Lieder</h1>
    <div>
      <div class="song border-b py-4" v-for="song in songs" :key="song.id" @click="selectSong(song)">
        <span class="pr-2">{{ song.number }}</span>
        <span>{{ song.title }}</span>
      </div>
    </div>
    <create-song-form :number="counter"/>
  </div>
</template>

<script>
export default {
  data: () => ({
    songs: [],
    songSelected: false,
    selectedSong: {},
    counter: 0
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
      this.songs.map(song => {
        if (song.number > this.counter) {
          this.counter = song.number
        }
      })
    }
  },
  methods: {
    selectSong (song) {
      this.songSelected = true
      song.refrain = song.refrain.replace(/\r?\n/g, "<br/>")
      this.selectedSong = song
      this.selectedSong.verses = this.selectedSong.verses.map(element => {
        return element.replace(/\r?\n/g, "<br/>")
      })
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