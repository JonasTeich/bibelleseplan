<template>
  <div>
    <NavBar :title="title"/>
    <Container>
      <div class="flex mb-6">
        <select v-on:change="displayChapter" v-model="selectedBook" class="p-2 bg-gray-200 rounded-l w-full">
          <option disabled value="">Wähle ein Buch</option>
          <option v-for="book in bible" :key="book.abbrev" :value="book.name">
            {{ book.name }}
          </option>
        </select>
        <input v-on:change="displayChapter" :max="maxChapters" v-model.number="selectedChapter" class="p-2 bg-gray-700 text-white rounded-r w-14" type="number">
      </div>
      <div class="bible-text">
        <p v-for="(vers, index) in chapter" :key="vers">
          <span class="text-sm">{{ (index + 1) }}</span> {{ vers }}
        </p>
      </div>
    </Container>
  </div>
</template>

<script>
import bible from 'assets/de_schlachter';

export default {
  data: () => ({
    titleText: 'Bibel',
    bible: bible,
    selectedBook: '',
    selectedChapter: 1,
    chapter: [],
    maxChapters: 1
  }),
  computed: {
    title() {
      return this.titleText
    }
  },
  methods: {
    displayChapter () {
      bible.filter(book => {
        if (this.selectedBook === book.name) {
          this.maxChapters = book.chapters.length
          book.chapters.map(chapter => {
            if (this.selectedChapter === (book.chapters.indexOf(chapter) + 1)) {
              this.chapter = chapter.map(vers => {
                return vers
              })
            }
          })
        }
      })
    }
  },
  mounted() {
    if (this.$route.params.book) {
      this.selectedBook = this.$route.params.book
      this.selectedChapter = this.$route.params.chapter
      this.displayChapter()
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gideon+Roman&display=swap');;

* {
  font-family: 'Montserrat', sans-serif;
}

.bible-text p, .bible-text span {
  font-family: 'Gideon Roman', cursive;
}
</style>
