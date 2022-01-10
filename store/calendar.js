import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://hkfomhpjagnnioxqgane.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw')

export const state = () => ({
  events: []
})

export const mutations = {
  initEvents (state, payload) {
    state.events = payload.events
  }
}

export const actions = {
  async initEvents (context) {
    const events = await supabase.from('events')
    context.commit('initEvents', {
      events: events.data
    })
  }
}

export const getters = {
  calendarEvents (state) {
    return state.events
  }
}
