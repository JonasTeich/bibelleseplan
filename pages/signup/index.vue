<template>
  <div class="flex items-center justify-center h-screen w-full">
    <div class="max-w-800 flex flex-col p-5 w-full">
      <h2 class="text-3xl mb-6 font-bold">Erstelle einen Account</h2>
      <div class="text-red-500">{{ errormessage }}</div>
      <label class="flex flex-col text-xl">
        Benutzername
        <input v-model="username" type="email" class="rounded border p-2 my-2">
      </label>
      <label class="flex flex-col text-xl">
        Email
        <input v-model="email" type="email" class="rounded border p-2 my-2">
      </label>
      <label class="flex flex-col text-xl">
        Passwort
        <input v-model="password" type="password" class="rounded border p-2 my-2">
      </label>
      <button @click="signup" class="p-2 rounded bg-gray-700 text-white my-4 text-xl">Account erstellen</button>
      <nuxt-link to="../login" class="w-full text-center hover:underline text-gray-400 text-xl">Schon registriert</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: '',
    email: '',
    password: '',
    errormessage: ''
  }),
  methods: {
    async signup () {
      const { user, error } = await this.$supabase.auth.signUp({
        email: this.email,
        password: this.password,
      })
      if (error) {
        this.errormessage = error.message
      } else {
        this.$supabase
          .from('users')
          .update({ username: this.username })
          .match({ username: user.email })
          .then(() => {
            this.$router.push('/')
          })
      }
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
