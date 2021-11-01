<template>
  <div>
    <p v-html="editText" ref="textElement"></p>
  </div>
</template>

<script>
import bible from 'assets/de_schlachter'

export default {
  data: () => ({
    editText: '',
    selectedVerse: []
  }),
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted() {
    // Filter all verses from text and push to selectedVerse
    const re = new RegExp('[{].+[}]', 'g')
    const match = this.text.match(re)
    this.editText = this.text
    if (match !== null) {
      const versesJSON = JSON.parse('[' + match[0].replace(/}.+{/g, '},{') + ']')
      let i = 0
      this.selectedVerse = []
      versesJSON.forEach(vers => {
        this.selectedVerse.push(vers)
        this.editText = this.editText.replace(JSON.stringify(vers), '<span id="' + i + '" class="underline text-blue-900">' + this.buildVersName(vers) + '</span>')
        i++
      })
    }
  },
  updated() {
    // Add eventlistener to all verses in text
    for (let i = 0; i < this.$refs.textElement.children.length; i++) {
      this.$refs.textElement.children[i].addEventListener('click', e => {
        const dialogVers = this.buildVersString(this.selectedVerse[parseInt(e.target.id, 10)])
        this.$emit('childToParent', { vers: dialogVers, headline: this.buildVersName(this.selectedVerse[parseInt(e.target.id, 10)]), book: this.selectedVerse[parseInt(e.target.id, 10)].book, chapter: this.selectedVerse[parseInt(e.target.id, 10)].chapter })
      })
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