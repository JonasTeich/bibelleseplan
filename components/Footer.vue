<template>
  <div
    class="transition-opacity opacity-1 fixed bottom-24 left-1/2 transform -translate-x-1/2 flex max-w-800 px-4 py-2 text-xl leading-5 bg-white mx-auto w-min rounded-full shadow-lg"
    :class="{ 'opacity-0': !showBox }"
  >
    <fa
      :icon="['fas', 'angle-left']"
      class="text-gray-700 text-3xl"
      :class="{ 'opacity-40': parseInt($route.params.day, 10) === 1 }"
      @click="lastDay()"
    />
    <CheckBox :check="check" :day="parseInt($route.params.day, 10) - 1" class="mx-10" />
    <fa
      :icon="['fas', 'angle-right']"
      class="text-gray-700 text-3xl"
      :class="{ 'opacity-40': parseInt($route.params.day, 10) === count }"
      @click="nextDay()"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    isChecked: false,
    showBox: true,
    lastScrollPosition: 0
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
    },
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.showBox = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
