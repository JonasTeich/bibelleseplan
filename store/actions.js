import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://hkfomhpjagnnioxqgane.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw')

export const getJakobus = ({ commit }) => {
  supabase
    .from('Jakobus')
    .select()
    .then(response => {
      commit('SET_JAKOBUS', response.data)
    })
}

export const getKolosser = ({ commit }) => {
  supabase
    .from('Kolosser')
    .select()
    .then(response => {
      commit('SET_KOLOSSER', response.data)
    })
}

export const getUsers = ({ commit }) => {
  supabase
    .from('users')
    .select()
    .then(response => {
      commit('SET_USERS', response.data)
    })
}

export const getPrayRequests = ({ commit }) => {
  supabase
    .from('prayer_requests')
    .select()
    .then(response => {
      commit('SET_REQUESTS', response.data)
    })
}