<template>
  <div class="flex justify-between fixed left-0 bottom-0 w-full bg-gray-100 h-16 p-4 px-2 z-20">
    <tab-bar-link to="/home" icon="home">Home</tab-bar-link>
    <!-- <tab-bar-link to="/mission" icon="compass">Mission</tab-bar-link> -->
    <tab-bar-link to="/plans" icon="book-reader">Pläne</tab-bar-link>
    <tab-bar-link to="/bible" icon="bible">Bibel</tab-bar-link>
    <tab-bar-link to="/pray" icon="praying-hands">Gebet</tab-bar-link>
    <tab-bar-link to="/calendar" icon="calendar">Kalender</tab-bar-link>
    <!-- <tab-bar-link to="/songs" icon="music">Lieder</tab-bar-link> -->
  </div>
</template>

<script>
export default {
  beforeMount () {
    if (this.$route.pathname === undefined) {
      this.$router.push('/home')
    }
  }
}
</script>
