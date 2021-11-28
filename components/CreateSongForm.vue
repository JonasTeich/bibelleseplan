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
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item, i) in newSong.verses"
          :key="i"
        >
          <v-expansion-panel-header>
            <h1 class="text-left" v-if="item.type === 0">{{ item.number }}. Strophe</h1>
            <h1 class="text-left" v-else>Refrain</h1>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs v-model="item.type">
              <v-tab @click="item.number = newSong.verses[i - 1].number + 1">Strophe</v-tab>
              <v-tab @click="/*Alle Nachfolgenden - 1*/">Refrain</v-tab>
            </v-tabs>
            <textarea class="mt-4 w-full border-2 bg-gray-100 rounded p-2" cols="30" rows="10" v-model="newSong.text"></textarea>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <button class="p-2 rounded bg-gray-400 text-white w-full mt-4" @click="addVers">Vers hinzufügen</button>
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
    countOfVerses: 0,
    newSong: {
      verses: [],
      title: '',
      number: 0
    }
  }),
  methods: {
    openForm () {
      this.isOpen = true
    },
    async saveSong () {
      this.isOpen = false
    },
    addVers () {
      const prevVers = this.newSong.verses[this.newSong.verses.length - 1]
      let type = 0
      if (prevVers) {
        if (prevVers.type === 0) {
          type = 1
        } else {
          type = 0
          this.countOfVerses++
        }
      } else {
        this.countOfVerses++
      }
      this.newSong.verses.push({
        number: this.countOfVerses,
        type: type
      })
    }
  }
}
</script>
