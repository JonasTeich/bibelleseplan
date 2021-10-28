<template>
  <div>
    <h2 class="text-lg font-bold">Lies {{ buildVersName(verses) }}</h2>
    <p v-html="buildVersString(verses)" class="vers-text"></p>
  </div>
</template>

<script>
import bible from 'assets/de_schlachter'

export default {
  props: {
    verses: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  methods: {
    buildVersString (versObject) {
      let string = ''
      for (let i = 0; i < (versObject.endVers - versObject.startVers + 1); i++) {
        bible.filter(book => {
          if (versObject.book === book.name) {
            book.chapters.map(chapter => {
              if (versObject.chapter === (book.chapters.indexOf(chapter) + 1)) {
                chapter.map(vers => {
                  if (versObject.startVers === (chapter.indexOf(vers) + 1 + i)) {
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
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gideon+Roman&display=swap');

.vers-text {
  font-family: 'Gideon Roman', cursive;
}
</style>