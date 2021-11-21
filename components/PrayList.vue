<template>
  <div>
    <Dialog v-if="showDialog" headline="Gebetsanliegen">
      <span class="w-full">{{ selectedRequest.username }}:</span>
      {{ selectedRequest.text }}<br>
      <div v-if="myUsername === selectedRequest.username" class="flex mt-4">
        <button v-if="selectedRequest.status !== 'answered'" class="p-2 rounded bg-green-400 text-white mr-2" @click="saveStatus('answered', selectedRequest)">Erhört</button>
        <button class="p-2 rounded bg-red-400 text-white" @click="deleteRequest(selectedRequest)">
          <fa
            :icon="['fas', 'trash']"
          />
        </button>
      </div>
    </Dialog>
    <h2 class="text-xl mb-2">Danken:</h2>
    <ul class="mb-4">
      <li
        v-for="(request, index) in thankRequest"
        :key="index"
        class="thought p-2 bg-gray-100 rounded my-2"
      >
        <div class="flex">
          <span class="w-full">{{ request.username }}:</span>
          <fa
            @click="infoDialog(request)"
            :icon="['fas', 'info-circle']"
            class="text-gray-400 text-lg"
          />
        </div>
        {{ request.text }}
      </li>
    </ul>
    <h2 class="text-xl mb-2">Bitten:</h2>
    <ul class="mb-4">
      <li
        v-for="(request, index) in requests"
        :key="index"
        class="thought p-2 bg-gray-100 rounded my-2"
      >
        <div class="flex">
          <span class="w-full">{{ request.username }}:</span>
          <fa
            @click="infoDialog(request)"
            :icon="['fas', 'info-circle']"
            class="text-gray-400 text-lg"
          />
        </div>
        {{ request.text }}
      </li>
    </ul>
    <h2 class="text-xl mb-2">Erhörte Gebete:</h2>
    <ul>
      <li
        v-for="(request, index) in answeredRequests"
        :key="index"
        class="thought p-2 bg-gray-100 rounded my-2"
      >
        <div class="flex">
          <span class="w-full">{{ request.username }}:</span>
          <fa
            @click="infoDialog(request)"
            :icon="['fas', 'info-circle']"
            class="text-gray-400 text-lg"
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
    allRequests: [],
    requests: [],
    thankRequest: [],
    answeredRequests: [],
    selectedRequest: {},
    showDialog: false
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
      this.allRequests = val
      this.allRequests.map(request => {
        if (request.status === 'thank') {
          this.thankRequest.push(request)
        } else if (request.status === 'answered') {
          this.answeredRequests.push(request)
        } else {
          this.requests.push(request)
        }
      })
    }
  },
  methods: {
    showRequest (request) {
      if (request.status === 'thank') {
        this.thankRequest.push(request)
      } else if (request.status === 'answered') {
        this.answeredRequests.push(request)
      } else {
        this.requests.push(request)
      }
    },
    async deleteRequest (request) {
      this.showDialog = false
      this.requests.filter(element => {
        if (element === request) {
          this.requests.splice(this.requests.indexOf(request), 1)
        }
      })
      this.thankRequest.filter(element => {
        if (element === request) {
          this.thankRequest.splice(this.thankRequest.indexOf(request), 1)
        }
      })
      this.answeredRequests.filter(element => {
        if (element === request) {
          this.answeredRequests.splice(this.answeredRequests.indexOf(request), 1)
        }
      })
      this.allRequests.splice(this.allRequests.indexOf(request), 1)
      await this.$supabase
        .from('prayer_requests')
        .delete()
        .match({ text: request.text, username: request.username })
    },
    infoDialog (request) {
      this.selectedRequest = request
      this.showDialog = true
    },
    async saveStatus (status, request) {
      this.showDialog = false
      this.requests.filter(element => {
        if (element === request) {
          this.requests.splice(this.requests.indexOf(request), 1)
        }
      })
      this.thankRequest.filter(element => {
        if (element === request) {
          this.thankRequest.splice(this.thankRequest.indexOf(request), 1)
        }
      })
      this.answeredRequests.push(request)
      request.status = status
      await this.$supabase
        .from('prayer_requests')
        .update({ status: status})
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