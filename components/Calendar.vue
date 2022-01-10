<template>
  <div>
    <Dialog v-if="showDialog" :headline="selectedDate">
        <div v-if="!isEntry">
          <input
            class="p-2 rounded border w-full mb-2"
            type="text"
            placeholder="Titel"
            v-model="title"
          >
          <textarea
            cols="15"
            rows="5"
            class="p-2 rounded border w-full"
            placeholder="Beschreibung"
            v-model="description"
          ></textarea>
          <button
            class="p-2 rounded border bg-gray-400 text-white"
            @click="enterDay"
          >Eintragen</button>
        </div>
        <div v-else>
          <h3 class="text-2xl text-gray-700">{{ title }}</h3>
          <p v-if="description.length > 0" class="my-2">{{ description }}</p>
          <button
            v-if="username === myUsername"
            @click="deleteEvent"
            :icon="['fas', 'trash']"
            class="bg-gray-400 text-white p-2 rounded"
          >Eintrag löschen</button>
        </div>
      </Dialog>
      <vue-calendar
        :show-limit="3"
        :events="calendarEvents"
        @show-all="showAll"
        @event-clicked="eventClicked"
        @month-changed="monthChanged"
    ></vue-calendar>
  </div>
</template>

<script>
export default {
  data: () => ({
    isEntry: false,
    events: [],
    selectedDay: '',
    title: '',
    username: '',
    description: '',
    showDialog: false
  }),
  computed: {
    calendarEvents() {
      return this.$store.getters['calendar/calendarEvents']
    },
    selectedDate() {
      if (this.selectedDay === '') return 
      const date = new Date(this.selectedDay)
      return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    },
    logedInUser () {
      return this.$store.getters['users/logedInUser']
    }
  },
  watch: {
    calendarEvents: function (val) {
      this.events = val
    }
  },
  methods: {
    showAll(events) {
      // Do something...
    },
    dayClicked(day) {
      this.description = ''
      this.title = ''
      this.username = this.logedInUser.username
      this.isEntry = false
      this.selectedDay = day.date
      this.showDialog = true
    },
    eventClicked(event) {
      this.isEntry = true
      this.selectedDay = event.start
      this.showDialog = true
      this.title = event.title
      this.description = event.description
      this.username = event.username
    },
    monthChanged(start, end) {
      // Do something...
    },
    async enterDay() {
      let date = new Date(this.selectedDay)
      date.setDate(date.getDate() + 1)
      const entry = {
        start: date,
        end: date,
        title: this.title,
        description: this.description,
        username: this.logedInUser.username
      }
      this.events.push({
        start: this.selectedDay,
        end: this.selectedDay,
        title: this.title,
        description: this.description,
        username: this.logedInUser.username
      })
      this.showDialog = false
      await this.$supabase
        .from('events')
        .insert([entry])
    },
    async deleteEvent() {
      await this.$supabase
        .from('events')
        .delete()
        .match({ title: this.title, description: this.description, username: this.username })
      const index = this.events.findIndex(x => x.title === this.title && x.description === this.description && x.username === this.username)
      this.events.splice(index, 1)
      this.showDialog = false
    }
  },
  mounted() {
    this.$store.dispatch('calendar/initEvents')
  },
  created() {
    this.$calendar.eventBus.$on('show-all', events => this.showAll(events));
    this.$calendar.eventBus.$on('day-clicked', day =>  this.dayClicked(day));
    this.$calendar.eventBus.$on('event-clicked', event => this.eventClicked(event));
    this.$calendar.eventBus.$on('month-changed', (start, end) => this.monthChanged(start, end));
  }
}
</script>