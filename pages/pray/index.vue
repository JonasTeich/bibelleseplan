<template>
  <div class="p-4 pb-24">
    <h1 class="text-4xl py-4">Gebetsanliegen</h1>
      <div class="flex py-4 items-center overflow-y-auto">
        <input
          v-model="prayRequest"
          type="text"
          class="border rounded w-full p-2"
          placeholder="Schreibe dein Gebetsanliegen..."
        >
        <fa
          @click="saveRequest"
          :icon="['fas', 'chevron-circle-right']"
          class="text-4xl text-gray-700 ml-4"
        />
      </div>
      <PrayList ref="list" />
    <TabBar />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    prayRequest: '',
    requests: []
  }),
  computed: {
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
  },
  methods: {
    async saveRequest () {
      const request = { text: this.prayRequest, username: this.myUsername }
      if (request.text.length > 3) {
        this.requests.push(request)
        await this.$supabase.from('prayer_requests').insert([request])
        this.$refs.list.showRequest(request)
        this.prayRequest = ''
      }
    }
  }
}
</script>