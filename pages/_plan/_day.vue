<template>
  <div>
    <Dialog
      v-if="showDialog"
      :headline="dialogHeadline"
    >
      <p class="mb-4">{{ dialogVers }}</p>
      <NuxtLink to="../bible" class="hover:underline text-blue-900">
        Im Kontext lesen
      </NuxtLink>
    </Dialog>
    <NavBar :title="title"/>
    <Container v-if="selectedDayData" :isDay="true">
      <Introduction v-on:childToParent="openDialog" class="section my-6" :text="selectedDayData.introduction" v-if="selectedDayData.introduction" />
      <BibleText class="section my-6" :verses="selectedDayData.vers" />
      <ReadText v-on:childToParent="openDialog" class="section my-6" :text="selectedDayData.text" v-if="selectedDayData.text" />
      <Think v-on:childToParent="openDialog" class="section my-6" :think="selectedDayData.think" />
      <Pray v-on:childToParent="openDialog" class="section my-6" :pray="selectedDayData.pray" />
      <Challenge v-on:childToParent="openDialog" class="section my-6" :challenge="selectedDayData.challenge" />
      <Thoughts class="section my-6" :thoughts="selectedDayData.thoughts" />
    </Container>
    <Footer :check="check" :count="count" />
  </div>
</template>

<script>
export default {
  data: () => ({
    showDialog: false,
    dialogVers: '',
    dialogHeadline: '',
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
    myUserId() {
      return this.$supabase.auth.user().id
    },
    myUsername() {
      let username = ''
      this.users.map(user => {
        if (user.id === this.myUserId) {
          username = user.username
        }
      })
      return username
    },
    title() {
      return 'Tag ' + this.$route.params.day
    }
  },
  async mounted() {
    const me = await this.$supabase.auth.user()
    if (me === null) {
      window.location.pathname = '/login'
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
      this.showDialog = true
      this.dialogVers = value.vers
      this.dialogHeadline = value.headline
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
