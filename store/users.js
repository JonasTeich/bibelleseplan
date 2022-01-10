/*
  - alle User
  - der eingeloggte User
*/
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://hkfomhpjagnnioxqgane.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw')

export const state = () => ({
  allUsers: [],
  logedInUser: null
})

export const mutations = {
  initData (state, payload) {
    state.allUsers = payload.allUsers
    state.logedInUser = payload.logedInUser
  }
}

export const actions = {
  async initData (context) {
    const allUserData = await supabase.from('users').select()
    const logedInUser = await supabase.auth.user()
    context.commit('initData', {
      allUsers: allUserData.data,
      logedInUser: logedInUser
    })
  }
}

export const getters = {
  logedInUserId (state) {
    return state.logedInUser.id
  },
  logedInUser (state, getters) {
    return JSON.parse(JSON.stringify(state.allUsers)).find(user => user.id === getters.logedInUserId)
  },
  allUsers (state) {
    return state.allUsers
  }
}
