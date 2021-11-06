<template>
  <div class="p-4 pb-24">
    <Dialog
      v-if="showDialog"
      :headline="dialogHeadline"
    >
      <p class="mb-4" v-html="dialogVers"></p>
      <nuxt-link v-on:click.native="closeDialog()" :to="{name: 'bible', params: {book: dialogBook, chapter: dialogChapter}}" class="hover:underline text-blue-900">
        Im Kontext lesen
      </nuxt-link>
    </Dialog>
    <nuxt-link :to="'/' + $route.params.plan">
      <fa
        :icon="['fas', 'angle-left']"
        class="text-gray-700 text-3xl"
      />
    </nuxt-link>
    <h1 class="text-4xl py-4">{{ $route.params.plan }} Tag {{ $route.params.day }}</h1>
    <div v-if="selectedDayData">
      <Introduction v-on:childToParent="openDialog" class="section my-6" :text="selectedDayData.introduction" v-if="selectedDayData.introduction" />
      <BibleText class="section my-6" :verses="selectedDayData.vers" />
      <ReadText v-on:childToParent="openDialog" class="section my-6" :text="selectedDayData.text" v-if="selectedDayData.text" />
      <Think v-on:childToParent="openDialog" class="section my-6" :think="selectedDayData.think" />
      <Pray v-on:childToParent="openDialog" class="section my-6" :pray="selectedDayData.pray" />
      <Challenge v-on:childToParent="openDialog" class="section my-6" :challenge="selectedDayData.challenge" />
      <Thoughts class="section my-6" :thoughts="selectedDayData.thoughts" />
    </div>
    <Footer :check="check" :count="count" />
    <TabBar />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    showDialog: false,
    dialogVers: '',
    dialogHeadline: '',
    dialogBook: '',
    dialogChapter: 0,
    count: 0
  }),
  computed: {
    selectedDayData() {
      let data = JSON.parse(JSON.stringify(this.$store.state.plan)).sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
      this.count = data.length
      data = data[this.$route.params.day - 1]
      return data
    },
    users() {
      return JSON.parse(JSON.stringify(this.$store.state.users))
    },
    me() {
      return this.$supabase.auth.user()
    },
    myUsername() {
      let username = ''
      this.users.map(user => {
        if (user.id === this.me.id) {
          username = user.username
        }
      })
      return username
    },
    title() {
      return 'Tag ' + this.$route.params.day
    },
    selectedPlanName() {
      return this.$route.params.plan
    }
  },
  mounted() {
    this.$store.dispatch('get' + this.$route.params.plan)
    this.$store.dispatch('getUsers')
  },
  methods: {
    async check (selectedDay) {
      if (this.selectedDayData.read.includes(this.myUsername)) {
        this.selectedDayData.read.splice(this.selectedDayData.read.indexOf(this.myUsername), 1)
      } else {
        this.selectedDayData.read.push(this.myUsername)
      }
      await this.$supabase
        .from(this.$route.params.plan)
        .update({ read: this.selectedDayData.read })
        .filter('id', 'eq', selectedDay)
    },
    openDialog (value) {
      document.body.classList.add('overflow-hidden')
      document.body.classList.remove('overflow-y-scroll')
      this.showDialog = true
      this.dialogVers = value.vers
      this.dialogHeadline = value.headline
      this.dialogBook = value.book
      this.dialogChapter = value.chapter
    },
    closeDialog () {
      document.body.classList.add('overflow-y-scroll')
      document.body.classList.remove('overflow-hidden')
      this.showDialog = false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
* {
  font-family: 'Montserrat', sans-serif;
}
.section:last-child {
  margin-bottom: 0;
}
.section:first-child {
  margin-top: 0;
}
</style>
