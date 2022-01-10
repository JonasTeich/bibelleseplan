<template>
  <div class="p-4 pb-20">
    <Dialog v-if="showDialog" :headline="'Tag ' + clickedDay">
      <ul>
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
        <div v-if="notReadUser.length > 0" class="w-full height-1 bg-gray-700 my-4"></div>
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
    <nuxt-link to="/plans">
      <fa
        :icon="['fas', 'angle-left']"
        class="text-gray-700 text-3xl"
      />
    </nuxt-link>
    <h1 class="text-4xl py-4">{{ $route.params.plan }}</h1>
    <div 
      v-for="day in selectedPlanData"
      :key="day.id"
      class="day relative w-full h-20 bg-gray-100 flex items-center px-6 rounded my-2 text-xl justify-between overflow-hidden"
      :class="{ 'today': day.id === currentDay }"
      @click="openDay(day.id)"
    >
      <div v-if="readUsers[day.id - 1]" class="absolute top-0 left-0 h-full bg-gray-700 bg-opacity-20" :style="{ width: (readUsers[day.id - 1].length / users.length * 100) + '%' }"></div>
      <span class="w-full">Tag {{ day.id }}</span>
      <fa
        :icon="['fas', 'info-circle']"
        class="text-gray-700 text-2xl mr-4 z-10"
        @click.stop="openDialog(day.id)"
      />
      <CheckBox class="z-10" :day="day.id - 1"/>
    </div>
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
  mounted () {
    this.$store.dispatch('plans/initPlan', {
      planName: this.selectedPlanName
    })
  },
  computed: {
    users() {
      return this.$store.getters['users/allUsers']
    },
    selectedPlanName() {
      return this.$route.params.plan
    },
    selectedPlanData() {
      const data = this.$store.getters['plans/selectedPlanData']
      this.readUsers = []
      data.map(day => {
        this.readUsers.push(day.read)
      })
      return data
    },
    logedInUser () {
      return this.$store.getters['users/logedInUser']
    },
    currentDay() {
      const date1 = new Date(this.selectedPlanData[0].created_at)
      const date2 = new Date()
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
  },
  methods: {
    openDay (selectedDay) {
      this.$router.push('/' + this.selectedPlanName + '/' + selectedDay)
    },
    openDialog (selectedDay) {
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
body::-webkit-scrollbar, :-webkit-scrollbar {
  display: none;
}
.today {
  outline: solid #374151;
  outline-width: thick;
}
</style>
