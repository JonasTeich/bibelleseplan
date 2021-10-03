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

if (supabase.auth.user() !== null) {
  document.location.href = '../selectplan'
}

signUpBtn.addEventListener('click', () => {
  signUpProcess()
})

passwordRetype.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    signUpProcess()
  }
});

loginBtn.addEventListener('click', () => {
  // navigator.serviceWorker.getRegistration().then(result => {
  //   errorSection.innerText = result[0]
    // if (result !== undefined) {
    //   for(let registration of result) {
    //     registration.unregister()
    //   }
    // }
  // })
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
  if (checkPasswordHealth()) {
    const signUpRequest = await supabase.auth.signUp({
      email: emailInput.value,
      password: passwordInput.value
    })
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

function checkPasswordHealth() {
  if (passwordRetype.value != passwordInput.value) {
    appendErrorMessage("Passworter nicht gleich!")
    return false
  } else if (passwordInput.value.length < 8) {
    appendErrorMessage("Passwort zu schwach")
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