<template>
  <div>
    <Dialog v-if="showDialog" headline="Gebetsanliegen">
      <span class="w-full">{{ selectedRequest.username }}:</span>
      {{ selectedRequest.text }}<br>
      <div v-if="logedInUser.username === selectedRequest.username" class="flex mt-4">
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
    // TODO: Remove allRequests. You can find all request on the prayRequests already.
    allRequests: [],
    selectedRequest: {},
    showDialog: false
  }),
  computed: {
    prayRequests() {
      return this.$store.state.prayerrequests.prayerRequests
    },
    thankRequest () {
      return this.prayRequests.filter(request => request.status === 'thank')
    },
    answeredRequests () {
      console.log(this.prayRequests.filter(request => request.status !== 'thank'))
      return this.prayRequests.filter(request => request.status === 'answered')
    },
    requests () {
      return this.prayRequests.filter(request => request.status === 'request')
    },
    users() {
      // TODO: You dont need to use getters, but you can. I find it better for me to directly compute on $store.state.[...]
      return this.$store.getters['users/allUsers']
    },
    logedInUser () {
      return this.$store.getters['users/logedInUser']
    }
  },
  methods: {
    async deleteRequest (request) {
      // TODO: Move this into state actions
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
      // TODO: Move this into state actions
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
