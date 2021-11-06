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
            class="p-2 rounded border bg-gray-700 text-white"
            @click="enterDay"
          >Eintragen</button>
        </div>
        <div v-else>
          <h3 class="text-2xl text-gray-700">{{ title }}</h3>
          <p v-if="description.length > 0" class="mt-2">{{ description }}</p>
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
    description: '',
    showDialog: false
  }),
  computed: {
    calendarEvents() {
      return JSON.parse(JSON.stringify(this.$store.state.calendar))
    },
    selectedDate() {
      if (this.selectedDay === '') return 
      const date = new Date(this.selectedDay)
      console.log(this.selectedDay.date)
      return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
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
        description: this.description
      }
      this.events.push({
        start: this.selectedDay,
        end: this.selectedDay,
        title: this.title,
        description: this.description
      })
      this.showDialog = false
      await this.$supabase
        .from('events')
        .insert([entry])
    }
  },
  mounted() {
    this.$store.dispatch('getCalendar')
  },
  created() {
    this.$calendar.eventBus.$on('show-all', events => this.showAll(events));
    this.$calendar.eventBus.$on('day-clicked', day =>  this.dayClicked(day));
    this.$calendar.eventBus.$on('event-clicked', event => this.eventClicked(event));
    this.$calendar.eventBus.$on('month-changed', (start, end) => this.monthChanged(start, end));
  }
}
</script>