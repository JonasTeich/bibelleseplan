<template>
  <div class="w-full h-16 bg-gray-700 fixed top-0 left-0 text-white flex items-center z-20">
    <div class="flex max-w-800 m-auto w-full justify-between p-4 text-xl leading-5">
      <fa
        v-if="$router.currentRoute.fullPath !== '/'"
        v-on:click="goBack"
        :icon="['fas', 'arrow-left']"
        class="text-2xl"
      />
      <span>{{ title }}</span>
      <fa
        v-on:click="openBible"
        :icon="['fas', 'bible']"
        class="text-2xl"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title : {
      type: String,
      required: true,
      default: 'Title'
    },
    pathname: {
      type: String,
      required: false,
      default: undefined
    }
  },
  methods: {
    openBible () {
      this.$router.push('/bible')
    },
    goBack () {
      if (this.pathname !== undefined) {
        this.$router.push('/' + this.pathname)
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style>
.max-w-800 {
  max-width: 800px;
}
</style>
