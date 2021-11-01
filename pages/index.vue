<template>
  <div>
    <NavBar :title="title" />
    <div class="min-h-screen max-w-full flex flex-col justify-center items-center">
      <Logo class="fill-current text-gray-700" />
      <h1 class="text-5xl mb-10">Missionsteam</h1>
      <div class="flex mb-2">
        <NuxtLink
          to="/plans"
          class="rounded p-2 bg-gray-700 text-white mx-1"
        >
          Bibellesepläne
        </NuxtLink>
        <NuxtLink
          to="/bible"
          class="rounded p-2 bg-gray-700 text-white mx-1"
        >
          Bibel
        </NuxtLink>
      </div>
      <NuxtLink
        to="/signup"
        class="text-gray-500 hover:underline"
      >
        Registrieren
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  mounted() {
    this.$store.dispatch('getUsers')
  },
  computed: {
    title () {
      return 'Willkommen ' + this.myUsername
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
        if (user.id === this.$supabase.auth.user().id) {
          username = user.username
        }
      })
      return username
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
* {
  font-family: 'Montserrat', sans-serif;
}
</style>
