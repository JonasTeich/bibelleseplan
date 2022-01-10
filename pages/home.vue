<template>
  <div class="p-4 pb-20">
    <div v-if="logedInUser" class="text-4xl flex w-full justify-between items-center">
      Hallo {{ logedInUser.username }}!
      <img src="~/static/icon.png" class="logo" />
    </div>
    <div class="w-full bg-gray-100 p-4 rounded mt-6">
      <h2 class="text-xl font-semibold mb-2">Heute</h2>
      <div class="h-24 w-full rounded bg-gray-400 text-white flex">
        <nuxt-link :to="'/Kolosser/' + currentDay" class="h-full w-full flex justify-center items-center text-center text-lg">
          Kolosser Tag {{ currentDay }}
        </nuxt-link>
      </div>
    </div>
    <div class="w-full bg-gray-100 p-4 rounded mt-6">
      <h2 class="text-xl font-semibold mb-2">Gebetsanliegen</h2>
      <ul class="list-disc pl-6 mb-2">
        <li
          v-for="request in requests"
          :key="request.text"
        >
          {{ request.text }}
        </li>
      </ul>
      <nuxt-link v-if="requests.length > 0" to="./pray" class="text-gray-700 underline">Alle anzeigen</nuxt-link>
      <nuxt-link v-else to="./pray" class="text-gray-700">Gebetsanliegen teilen</nuxt-link>
    </div>
    <div class="w-full bg-gray-100 p-4 rounded mt-6">
      <h2 class="text-xl font-semibold mb-2">Kalender</h2>
      <calendar/>
    </div>
    <div class="flex items-center justify-center">
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    requests: []
  }),
  mounted() {
    this.$store.dispatch('plans/initPlan', {
      planName: 'Kolosser'
    })
  },
  computed: {
    prayRequests () {
      return JSON.parse(JSON.stringify(this.$store.getters['prayerrequests/prayerRequests'])).sort(function(){return 0.5 - Math.random()}).slice(0,3)
    },
    logedInUser () {
      return this.$store.getters['users/logedInUser']
    },
    firstDay() {
      return this.$store.getters['plans/selectedPlanData'][0]
    },
    currentDay() {
      if (!this.firstDay) return
      const date1 = new Date(this.firstDay.created_at)
      const date2 = new Date()
      const diffTime = Math.abs(date2 - date1)
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
  },
  watch: {
    prayRequests: function (val) {
      this.requests = val
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
* {
  font-family: 'Montserrat', sans-serif;
}

.logo {
  max-width: 60px;
}
</style>
