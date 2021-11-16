<template>
  <div class="p-4">
    <h1 class="text-4xl py-4">Bibellesepläne</h1>
    <div 
      class="h-20 w-full bg-gray-100 rounded flex justify-center items-center text-2xl mb-2 mt-4"
      v-on:click="openPlan('Jakobus')"
    >
      Jakobus
    </div>
    <div 
      class="h-20 w-full bg-gray-100 rounded flex justify-center items-center text-2xl opacity-50"
    >
      Kolosser
    </div>
    <TabBar />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    titleText: 'Bibellesepläne'
  }),
  computed: {
    title () {
      return this.titleText
    }
  },
  methods: {
    openPlan (selectedPlan) {
      this.$router.push('/' + selectedPlan)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
* {
  font-family: 'Montserrat', sans-serif;
}
</style>
