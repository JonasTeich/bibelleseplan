<template>
  <div class="w-full h-16 bg-gray-700 fixed top-0 left-0 text-white flex items-center z-20">
    <div class="flex max-w-800 m-auto w-full items-center p-4 text-xl leading-5">
      <fa
        v-if="showArrow"
        @click="goBack"
        :icon="['fas', 'arrow-left']"
        class="text-2xl mr-4"
      />
      <span>{{ title }}</span>
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
    },
    showArrow: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
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
