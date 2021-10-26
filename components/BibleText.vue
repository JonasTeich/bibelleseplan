<template>
  <div>
    <h2 class="text-2xl font-bold">Lies {{ verses.text }}</h2>
    <p v-html="buildVersString(verses)" class="vers-text text-xl"></p>
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
      for (let i = 0; i < versObject.count; i++) {
        bible.filter(book => {
          if (versObject.book === book.abbrev) {
            book.chapters.map(chapter => {
              if (parseInt(versObject.chapter, 10) === (book.chapters.indexOf(chapter) + 1)) {
                chapter.map(vers => {
                  if (parseInt(versObject.vers, 10) === (chapter.indexOf(vers) + 1 + i)) {
                    string += vers + '<br>'
                  }
                })
              }
            })
          }
        })
      }
      return string
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text&display=swap');

.vers-text {
  font-family: 'DM Serif Text', serif;
}
</style>