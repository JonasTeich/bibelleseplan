<template>
  <div v-if="pray.length > 0">
    <h2 class="text-2xl font-bold">Zum Beten</h2>
    <ul class="pl-6">
      <li ref="textElement" v-for="item in prayText" v-html="item" :key="item" class="list-disc text-xl"></li>
    </ul>
  </div>
</template>

<script>
import bible from 'assets/de_schlachter'

export default {
  data: () => ({
    selectedVerse: [],
    prayText: ''
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
  mounted() {
    // Filter all verses from text and push to selectedVerse
    const re = new RegExp('[{].+[}]', 'g')
    this.prayText = this.pray.map(point => {
      const match = point.match(re)
      let newString = point
      if (match !== null) {
        const versesJSON = JSON.parse('[' + match[0].replace(/}.+{/g, '},{') + ']')
        let i = 0
        versesJSON.map(vers => {
          this.selectedVerse.push(vers) 
          newString = point.replace(JSON.stringify(vers), '<span id="' + i + '" class="underline text-blue-900">' + vers.text + '</span>')
          i++
        })
      }
      return newString
    })
  },
  updated() {
    // Add eventlistener to all verses in text
    for (let j = 0; j < this.pray.length; j++) {
      for (let i = 0; i < this.$refs.textElement[j].children.length; i++) {
        this.$refs.textElement[j].children[i].addEventListener('click', e => {
          const dialogVers = this.buildVersString(this.selectedVerse[parseInt(e.target.id, 10)])
          this.$emit('childToParent', { "vers": dialogVers, "headline": this.selectedVerse[parseInt(e.target.id, 10)].text })
        })
      }
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