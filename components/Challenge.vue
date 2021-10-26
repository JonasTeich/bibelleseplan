<template>
  <div v-if="challenge.length > 0">
    <h2 class="text-2xl font-bold">Challenge</h2>
    <ul class="pl-6">
      <li ref="textElement" v-for="item in challengeText" v-html="item" :key="item" class="list-disc text-xl"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedVerse: [],
    challengeText: ''
  }),
  props: {
    challenge: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  },
  mounted() {
    // Filter all verses from text and push to selectedVerse
    const re = new RegExp('[{].+[}]', 'g')
    this.challengeText = this.challenge.map(point => {
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
    for (let j = 0; j < this.$refs.textElement.length; j++) {
      for (let i = 0; i < this.$refs.textElement[j].children.length; i++) {
        this.$refs.textElement[j].children[i].addEventListener('click', e => {
          const dialogVers = this.buildVersString(this.selectedVerse[parseInt(e.target.id, 10)])
          this.$emit('childToParent', { "vers": dialogVers, "headline": this.selectedVerse[parseInt(e.target.id, 10)].text })
        })
      }
    }
  }
}
</script>