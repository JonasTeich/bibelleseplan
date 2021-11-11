<template>
  <div class="p-2">
    <input v-on:click.stop="callParentMethode" v-model="isChecked" type="checkbox">
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: Number,
      required: true,
      default: 0
    },
    check: Function
  },
  computed: {
    selectedDayData() {
      return JSON.parse(JSON.stringify(this.$store.state.plan)).sort((a, b) => parseFloat(a.id) - parseFloat(b.id))[this.day]
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
    isChecked: {
      get() {
        if (this.selectedDayData) {
          return this.selectedDayData.read.includes(this.myUsername)
        }
      },
      set() {

      }
    }
  },
  methods: {
    callParentMethode () {
      this.check(this.day + 1)
    }
  }
}
</script>

<style scoped>
input {
  transform: scale(1.55);
}
</style>