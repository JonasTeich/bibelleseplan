const SUPABASE_URL = 'https://hkfomhpjagnnioxqgane.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw'
var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.querySelector('.plan').addEventListener('click', () => {
  localStorage.setItem('selectedPlan', 'Jakobus')
  document.location.href = '../plan'
})

setUp()

function setUp () {
  if (supabase.auth.user() === null) {
    document.location.href = '../signin'
  }
}