<template>
  <div>
    <p v-html="editText" ref="textElement" class="text-lg"></p>
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
      versesJSON.map(vers => {
        this.selectedVerse.push(vers) 
        this.editText = this.editText.replace(JSON.stringify(vers), '<span id="' + i + '" class="underline text-blue-900">' + vers.text + '</span>')
        i++
      })
    }
  },
  updated() {
    // Add eventlistener to all verses in text
    for (let i = 0; i < this.$refs.textElement.children.length; i++) {
      this.$refs.textElement.children[i].addEventListener('click', e => {
        const dialogVers = this.buildVersString(this.selectedVerse[parseInt(e.target.id, 10)])
        this.$emit('childToParent', { "vers": dialogVers, "headline": this.selectedVerse[parseInt(e.target.id, 10)].text })
      })
    }
  },
  methods: {
    // returns vers as String
    buildVersString (versObject) {
      let string = ''
      for (let i = 0; i < versObject.count; i++) {
        bible.filter(book => {
          if (versObject.book === book.abbrev) {
            book.chapters.map(chapter => {
              if (parseInt(versObject.chapter, 10) === (book.chapters.indexOf(chapter) + 1)) {
                chapter.map(vers => {
                  if (parseInt(versObject.vers, 10) === (chapter.indexOf(vers) + 1 + i)) {
                    string += vers
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