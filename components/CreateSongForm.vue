<template>
  <div>
    <div v-if="isOpen" class="fixed top-0 left-0 w-full h-full z-30 bg-white p-4 overflow-scroll">
      <div class="flex text-1xl w-full justify-between mb-4">
        <h3 class="text-2xl">Neues Lied erstellen</h3>
        <fa
          :icon="['fas', 'times']"
          class="text-gray-700 text-2xl"
          @click="isOpen = false"
        />
      </div>
      <div class="flex flex-col">
        <label class="font-bold mb-4">
          Titel<br>
          <input class="w-full border rounded p-2" type="text" v-model="title">
        </label>
        <label class="font-bold mb-4">
          Anzahl der Strophen<br>
          <input class="w-full border rounded p-2" type="number" v-model="countOfVerses">
        </label>
        <label class="font-bold mb-4">
          Refrain<br>
          <textarea class="w-full border rounded p-2" cols="30" rows="10" v-model="refrain"></textarea>
        </label>
        <div v-for="(e, i) in verses" :key="i">
          <label class="font-bold">
            {{ i + 1 }}. Strophe
            <textarea class="w-full border rounded p-2" cols="30" rows="10" v-model="verses[i]"></textarea>
          </label>
        </div>
        <button @click="saveSong" class="p-2 rounded bg-green-400 text-white">Hochladen</button>
      </div>
    </div>
    <div @click="openForm" class="fixed bottom-20 right-4 rounded-full bg-gray-700 h-12 w-12 flex items-center justify-center">
      <fa :icon="['fas', 'plus']" class="text-2xl text-white" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    number: Number
  },
  data: () => ({
    isOpen: false,
    title: '',
    countOfVerses: 0,
    verses: [],
    refrain: ''
  }),
  watch: {
    countOfVerses: function (val) {
      this.verses.length = val
    }
  },
  methods: {
    openForm () {
      this.isOpen = true
    },
    async saveSong () {
      this.isOpen = false
      await this.$supabase
        .from('songs')
        .insert([{ title: this.title, verses: this.verses, refrain: this.refrain, number: this.number + 1 }])
    }
  }
}
</script>

<style>

</style>