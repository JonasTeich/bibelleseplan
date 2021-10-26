<template>
  <div class="h-16 bg-gray-300 fixed left-0 bottom-0 right-0 text-white flex items-center z-10">
    <div class="flex max-w-800 m-auto w-full justify-between p-4 text-xl leading-5">
      <fa
        :icon="['fas', 'angle-left']"
        class="text-gray-700 text-3xl"
        :class="{ 'opacity-40': parseInt($route.params.day, 10) === 1 }"
        v-on:click="lastDay()"
      />
      <CheckBox :check="check" :day="parseInt($route.params.day, 10) - 1" />
      <fa
        :icon="['fas', 'angle-right']"
        class="text-gray-700 text-3xl"
        :class="{ 'opacity-40': parseInt($route.params.day, 10) === count }"
        v-on:click="nextDay()"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isChecked: false
  }),
  props: {
    count: {
      type: Number,
      required: true,
      default: 0
    },
    check: Function
  },
  methods: {
    lastDay () {
      if (this.$route.params.day > 1) {
        this.$router.push('/' + this.$route.params.plan + '/' + (parseInt(this.$route.params.day, 10) - 1))
      }
    },
    nextDay () {
      if (this.$route.params.day < this.count) {
        this.$router.push('/' + this.$route.params.plan + '/' + (parseInt(this.$route.params.day, 10) + 1))
      }
    }
  }
}
</script>

<style scoped>
.max-w-800 {
  max-width: 800px;
}
</style>