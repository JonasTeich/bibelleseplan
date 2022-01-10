import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://hkfomhpjagnnioxqgane.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw')

export const state = () => ({
  selectedPlan: []
})

export const mutations = {
  initPlan (state, payload) {
    state.selectedPlan = payload.plan.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
  },
  changeState (state, payload) {
    if (payload.check) {
      state.selectedPlan[payload.index].read.push(payload.username)
    } else {
      const index = state.selectedPlan[payload.index].read.indexOf(payload.username)
      state.selectedPlan[payload.index].read.splice(index, 1)
    }
  }
}

export const actions = {
  async initPlan (context, payload) {
    const plan = await supabase.from(payload.planName)
    context.commit('initPlan', {
      plan: plan.data
    })
  },
  async changeState (context, payload) {
    context.commit('changeState', {
      index: payload.index,
      check: payload.check,
      username: payload.username
    })
    await supabase
      .from(payload.planName)
      .update({ read: context.getters.selectedPlanData[payload.index].read })
      .filter('id', 'eq', payload.index + 1)
  }
}

export const getters = {
  selectedPlanData (state) {
    return JSON.parse(JSON.stringify(state.selectedPlan))
  }
}
