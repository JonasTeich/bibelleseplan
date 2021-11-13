<template>
  <div>
    <Dialog v-if="showDialog" headline="Alle Gebetsanliegen">
      <ul class="list-disc pl-6 mb-2">
        <li
          v-for="request in requests"
          :key="request.text"
        >
          {{ request.text }}
        </li>
      </ul>
    </Dialog>
    <h2 class="text-lg font-bold">Zum Beten</h2>
    <ul class="pl-6">
      <li ref="textElement" v-for="item in prayText" v-html="item" :key="item" class="list-disc"></li>
      <li class="list-disc text-gray-700 underline" @click="openDialog">Unsere Gebetsanliegen</li>
    </ul>
  </div>
</template>

<script>
import bible from 'assets/de_schlachter'

export default {
  data: () => ({
    selectedVerse: [],
    prayText: '',
    requests: [],
    showDialog: false
  }),
  props: {
    pray: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  computed: {
    prayRequests() {
      return JSON.parse(JSON.stringify(this.$store.state.prayRequests)).sort(function(){return 0.5 - Math.random()})
    }
  },
  watch: {
    prayRequests: function (val) {
      this.requests = val
    }
  },
  mounted() {
    this.$store.dispatch('getPrayRequests')
    // Filter all verses from text and push to selectedVerse
    const re = new RegExp('\{(.*?)\}', 'g')
    this.prayText = this.pray.map(point => {
      const match = point.match(re)
      let newString = point
      if (match !== null) {
        const versesJSON = match.map(element => {
          return JSON.parse(element)
        })
        let i = 0
        versesJSON.map(vers => {
          this.selectedVerse.push(vers) 
          newString = point.replace(JSON.stringify(vers), '<span id="' + i + '" class="underline text-gray-700">' + this.buildVersName(vers) + '</span>')
          i++
        })
      }
      return newString
    })
  },
  updated() {
    // Add eventlistener to all verses in text
    if (this.$refs.textElement) {
      for (let j = 0; j < this.pray.length; j++) {
        for (let i = 0; i < this.$refs.textElement[j].children.length; i++) {
          this.$refs.textElement[j].children[i].addEventListener('click', e => {
            const dialogVers = this.buildVersString(this.selectedVerse[parseInt(e.target.id, 10)])
            this.$emit('childToParent', { vers: dialogVers, headline: this.buildVersName(this.selectedVerse[parseInt(e.target.id, 10)]), book: this.selectedVerse[parseInt(e.target.id, 10)].book, chapter: this.selectedVerse[parseInt(e.target.id, 10)].chapter })
          })
        }
      }
    }
  },
  methods: {
    // returns vers as String
    buildVersString (versObject) {
      let string = ''
      for (let i = 0; i < (versObject.endVers - versObject.startVers + 1); i++) {
        bible.filter(book => {
          if (versObject.book === book.name) {
            book.chapters.map(chapter => {
              if (versObject.chapter === (book.chapters.indexOf(chapter) + 1)) {
                chapter.map(vers => {
                  if (versObject.startVers + i === (chapter.indexOf(vers) + 1)) {
                    string += (versObject.startVers + i) + ' ' + vers + '<br>'
                  }
                })
              }
            })
          }
        })
      }
      return string
    },
    buildVersName(versObject) {
      let string = versObject.book + ' ' + versObject.chapter + ', ' + versObject.startVers
      if (versObject.startVers !== versObject.endVers) {
        string += '-' + versObject.endVers
      }
      return string
    },
    openDialog() {
      this.showDialog = true
    }
  }
}
</script>