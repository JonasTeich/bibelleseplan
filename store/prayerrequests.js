import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://hkfomhpjagnnioxqgane.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw')

export const state = () => ({
  prayerRequests: []
})

export const mutations = {
  initRequests (state, payload) {
    state.prayerRequests = payload.requests
  }
}

export const actions = {
  async initRequests (context) {
    const requests = await supabase.from('prayer_requests')
    context.commit('initRequests', {
      requests: requests.data
    })
  }
}

export const getters = {
  prayerRequests (state) {
    return state.prayerRequests
  }
}
