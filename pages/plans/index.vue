<template>
  <div>
    <NavBar :title="title"/>
    <Container>
      <div 
        class="h-20 w-full bg-gray-200 rounded flex justify-center items-center text-2xl mb-2"
        v-on:click="openPlan('Jakobus')"
      >
        Jakobus
      </div>
      <div 
        class="h-20 w-full bg-gray-200 rounded flex justify-center items-center text-2xl"
        v-on:click="openPlan('Kolosser')"
      >
        Kolosser
      </div>
    </Container>
  </div>
</template>

<script>
export default {
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
      window.location.pathname = '/plan/' + selectedPlan
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
