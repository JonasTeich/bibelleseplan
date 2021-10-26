<template>
  <div class="flex flex-col p-4">
    <h2 class="text-3xl mb-6 font-bold">Melde dich an</h2>
    <div class="text-red-500">{{ errormessage }}</div>
    <label class="flex flex-col text-xl">
      Email
      <input v-model="email" type="email" class="rounded border p-2 my-2">
    </label>
    <label class="flex flex-col text-xl">
      Passwort
      <input v-model="password" type="password" class="rounded border p-2 my-2">
    </label>
    <button v-on:click="login" class="p-2 rounded bg-gray-700 text-white my-4 text-xl">Anmelden</button>
    <a href="../signin" class="w-full text-center hover:underline text-gray-400 text-xl">Account erstellen</a>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    errormessage: ''
  }),
  beforeCreate () {
    if (this.$supabase.auth.user()) {
      this.$router.push('/')
    }
  },
  methods: {
    async login () {
      const { error } = await this.$supabase.auth.signIn({
        email: this.email,
        password: this.password,
      })
      if (error) {
        this.errormessage = error.message
      } else {
        this.$router.push('/')
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
