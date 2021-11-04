<template>
  <div>
    <Dialog v-if="showDialog" :headline="'Tag ' + clickedDay">
      <ul class="max-h-56 overflow-y-scroll">
        <li
          v-for="user in selectedPlanData[clickedDay - 1].read"
          :key="user"
          class="flex"
        >
          <span class="w-full">{{ user }}</span>
          <fa
            :icon="['fas', 'check']"
            class="text-green-400 text-xl"
          />
        </li>
        <div class="w-full height-1 bg-gray-700 my-4"></div>
        <li
          v-for="user in notReadUser"
          :key="user"
          class="flex"
        >
          <span class="w-full">{{ user }}</span>
          <fa
            :icon="['fas', 'times']"
            class="text-red-400 text-xl"
          />
        </li>
      </ul>
    </Dialog>
    <NavBar pathname="plans" :title="selectedPlanName + ' Leseplan'"/>
    <Container>
      <div 
        v-for="day in selectedPlanData"
        :key="day.id"
        class="relative day h-20 w-full bg-gray-100 flex items-center px-6 rounded my-2 text-xl justify-between overflow-hidden"
        :class="{ 'today': day.id === currentDay }"
        v-on:click="openDay(day.id)"
      >
        <div v-if="readUsers[day.id - 1]" class="absolute top-0 left-0 h-full bg-gray-700 bg-opacity-20" :style="{ width: (readUsers[day.id - 1].length / users.length * 100) + '%' }"></div>
        <span class="w-full">Tag {{ day.id }}</span>
        <fa
          :icon="['fas', 'info-circle']"
          class="text-gray-700 text-2xl mr-4 z-10"
          v-on:click.stop="openDialog(day.id)"
        />
        <CheckBox class="z-10" :check="check" :day="day.id - 1"/>
      </div>
    </Container>
    <TabBar />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    readUsers: [],
    notReadUser: [],
    showDialog: false,
    clickedDay: 0,
  }),
  computed: {
    users() {
      return JSON.parse(JSON.stringify(this.$store.state.users))
    },
    selectedPlanName() {
      return this.$route.params.plan
    },
    selectedPlanData() {
      const data = JSON.parse(JSON.stringify(this.$store.state.plan)).sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
      this.readUsers = []
      data.map(day => {
        this.readUsers.push(day.read)
      })
      return data
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
    currentDay() {
      const date1 = new Date(this.selectedPlanData[0].created_at)
      const date2 = new Date()
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
  },
  mounted() {
    this.$store.dispatch('get' + this.$route.params.plan)
    this.$store.dispatch('getUsers')
  },
  methods: {
    openDay (selectedDay) {
      this.$router.push('/' + this.selectedPlanName + '/' + selectedDay)
    },
    openDialog (selectedDay) {
      document.body.classList.add('overflow-hidden')
      document.body.classList.remove('overflow-y-scroll')
      this.notReadUser = this.getNotReadUser(this.selectedPlanData[selectedDay - 1].read)
      this.clickedDay = selectedDay
      this.showDialog = true
    },
    getNotReadUser (userarray) {
      let notReadUser = []
      this.users.map(user => {
        if (!userarray.includes(user.username)) {
          notReadUser.push(user.username)
        }
      })
      return notReadUser
    },
    async check (selectedDay) {
      if (this.readUsers[selectedDay - 1].includes(this.myUsername)) {
        this.readUsers[selectedDay - 1].splice(this.readUsers[selectedDay - 1].indexOf(this.myUsername), 1)
      } else {
        this.readUsers[selectedDay - 1].push(this.myUsername)
      }
      await this.$supabase
        .from(this.$route.params.plan)
        .update({ read: this.readUsers[selectedDay - 1] })
        .filter('id', 'eq', selectedDay)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
* {
  font-family: 'Montserrat', sans-serif;
}
.day:first-child {
  margin-top: 0;
}
.day:last-child {
  margin-bottom: 0;
}
.height-1 {
  height: 1px;
}
body::-webkit-scrollbar, .max-h-56::-webkit-scrollbar {
  display: none;
}
.max-h-56 {
  -ms-overflow-style: none;
  scrollbar-width: none; 
}
.today {
  outline: solid #374151;
  outline-width: thick;
}
</style>
