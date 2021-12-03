<template>
  <div class="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-30">
    <div class="absolute w-full h-5/6 bottom-0 rounded bg-white p-4 pb-0 flex flex-col">
      <div class="flex text-1xl w-full justify-between mb-4">
        <h3 class="text-2xl">{{ headline }}</h3>
        <fa
          :icon="['fas', 'times']"
          class="text-gray-700 text-2xl"
          @click.stop="closeDialog()"
        />
      </div>
      <div class="h-full overflow-y-auto pb-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headline: {
      type: String,
      required: true,
      default: ''
    }
  },
  created () {
    window.addEventListener('scroll', () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    })
  },
  mounted () {
    const scrollY = document.documentElement.scrollTop
    const body = document.body
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
  },
  methods: {
    closeDialog () {
      const body = document.body
      const scrollY = body.style.top
      body.style.position = ''
      body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
      this.$parent.showDialog = false
    }
  }
}
</script>

<style scoped>
.w-800 {
  max-width: 800px;
  min-width: 100%;
}
</style>