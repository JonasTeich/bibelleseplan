<template>
  <div class="p-4 pb-20">
    <Dialog v-if="showDialog" headline="Gebetsanliegen">
      <select v-model="selectedType" class="w-full p-2 rounded bg-gray-200">
        <option value="thank">Dank</option>
        <option value="request">Bitte</option>
        <option value="answered">Erhörung</option>
      </select>
      <button @click="saveRequest" class="rounded p-2 bg-green-400 text-white mt-4">Senden</button>
    </Dialog>
    <h1 class="text-4xl py-4">Gebetsanliegen</h1>
    <div class="flex py-4 items-center overflow-y-auto">
      <input
        v-model="prayRequest"
        @keypress.enter="openDialog"
        type="text"
        class="border rounded w-full p-2"
        placeholder="Schreibe dein Gebetsanliegen..."
      >
      <fa
        @click="openDialog"
        :icon="['fas', 'chevron-circle-right']"
        class="text-4xl text-gray-700 ml-4"
      />
    </div>
    <pray-list ref="list" />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    prayRequest: '',
    requests: [],
    showDialog: false,
    selectedType: 'thank'
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
      this.showDialog = false
      document.body.classList.add('overflow-scroll')
      document.body.classList.remove('overflow-hidden')
      const request = { text: this.prayRequest, username: this.myUsername, status: this.selectedType }
      if (request.text.length > 3) {
        await this.$supabase.from('prayer_requests').insert([request])
        this.$refs.list.showRequest(request)
        this.prayRequest = ''
      }
    },
    openDialog() {
      this.showDialog = true
    }
  }
}
</script>