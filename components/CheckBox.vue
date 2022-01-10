<template>
  <div class="p-2">
    <input @click.stop="check" v-model="isChecked" type="checkbox">
  </div>
</template>

<script>
export default {
  props: {
    day: Number
  },
  data: () => ({
    isChecked: false
  }),
  mounted () {
    console.log(this.selectedPlanData);
    this.isChecked = this.selectedPlanData[this.day].read.includes(this.logedInUser.username)
  },
  computed: {
    selectedPlanData () {
      return this.$store.getters['plans/selectedPlanData']
    },
    logedInUser () {
      return this.$store.getters['users/logedInUser']
    }
  },
  methods: {
    check (e) {
      this.$store.dispatch('plans/changeState', {
        index: this.day,
        check: e.target.checked,
        username: this.logedInUser.username,
        planName: this.$route.params.plan
      })
    }
  }
}
</script>

<style scoped>
input {
  transform: scale(1.55);
}
</style>