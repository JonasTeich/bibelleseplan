<template>
  <div>
    <ul>
      <li
        v-for="(request, index) in requests"
        :key="index"
        class="thought p-2 bg-gray-100 rounded my-2"
      >
        <div class="flex">
          <span class="w-full">{{ request.username }}:</span>
          <fa
            @click="deleteRequest(request)"
            v-if="request.username === myUsername"
            :icon="['fas', 'trash']"
            class="text-gray-400 text-lg transition"
          />
        </div>
        {{ request.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    requests: []
  }),
  mounted() {
    this.$store.dispatch('getUsers')
    this.$store.dispatch('getPrayRequests')
  },
  computed: {
    prayRequests() {
      return JSON.parse(JSON.stringify(this.$store.state.prayRequests))
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
  },
  watch: {
    prayRequests: function (val) {
      this.requests = val
    }
  },
  methods: {
    showRequest (request) {
      this.requests.push(request)
    },
    async deleteRequest (request) {
      this.requests.splice(this.requests.indexOf(request), 1)
      await this.$supabase
        .from('prayer_requests')
        .delete()
        .match({ text: request.text, username: request.username })
    }
  }
}
</script>

<style scoped>
.thought:last-child {
  margin-bottom: 0;
}
.thought:first-child {
  margin-top: 0;
}
</style>