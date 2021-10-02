const emailInput = document.querySelector('.emailInput')
const usernameInput = document.querySelector('.usernameInput')
const passwordInput = document.querySelector('.passwordInput')
const passwordRetype = document.getElementById('passwordRetype')
const signUpBtn = document.querySelector('.signUpBtn')
const loginBtn = document.querySelector('.loginBtn')
const errorSection = document.querySelector('.errorMessage')
let errorThrown = false;

const SUPABASE_URL = 'https://hkfomhpjagnnioxqgane.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw'
var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../service-worker.js')
// }
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
   registration.unregister()
  }
})

signUpBtn.addEventListener('click', () => {
  signUpProcess()
})

// enter to submit
passwordRetype.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    signUpProcess()
  }
});

loginBtn.addEventListener('click', () => {
  document.location.href = "../signin"
})

async function getUser () {
  const { data } = await supabase
    .from('users')
    .select()
    .filter('id', 'eq', supabase.auth.user().id)
  return data[0]
}

async function signUpProcess() {
  // is passwords ok? then signUp request
  if (checkPasswordHealth()) {
    const signUpRequest = await supabase.auth.signUp({
      email: emailInput.value,
      password: passwordInput.value
    })
    // error? then append error message
    if (signUpRequest.error != null) {
      appendErrorMessage(signUpRequest.error.message)
    } else {
      await supabase
        .from('users')
        .update({ username: usernameInput.value })
        .match(getUser())
      document.location.href = '../selectplan'
    }
  }
}

// check if pasword is equal and has at least 8 chars
function checkPasswordHealth() {
  if (passwordRetype.value != passwordInput.value) {
    appendErrorMessage("Passwords not equal!")
    return false
  } else if (passwordInput.value.length < 8) {
    appendErrorMessage("Password to weak")
    return false
  }
  return true
}

function appendErrorMessage(errorMessage) {
  if (errorThrown) {
    errorSection.removeChild(errorSection.firstChild)
  }
  const errorMessageField = document.createElement('p')
  errorMessageField.innerText = errorMessage
  document.querySelector('.errorMessage').append(errorMessageField)
  errorThrown = true
}