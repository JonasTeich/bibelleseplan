const emailInput = document.querySelector('.emailInput')
const passwordInput = document.querySelector('.passwordInput')
const signUpBtn = document.querySelector('.signUpBtn')
const loginBtn = document.querySelector('.loginBtn')
const errorMessageField = document.querySelector('.errorMessage')

const SUPABASE_URL = 'https://hkfomhpjagnnioxqgane.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw'
var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

signUpBtn.addEventListener('click', () => {
  document.location.href = "../signup"
})

loginBtn.addEventListener('click', () => {
  loginAndVerifiy()
});

passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    loginAndVerifiy()
  }
});

function loginAndVerifiy() {
  supabase.auth.signIn({
    email: emailInput.value,
    password: passwordInput.value
  }).then((response => {
    if (checkForResponseError(response)) {
      // deleteOldErrorsIfAny
      if (errorMessageField.firstChild != null) {
        errorMessageField.removeChild(errorMessageField.firstChild);
      }
      const errorMessage = document.createElement('p');
      errorMessage.innerText = response.error.message;
      errorMessageField.append(errorMessage);
    }
    else {
      document.location.href = '../selectplan';
    }
  }))
}

function checkForResponseError(response) {
  if (response.error != null) {
    return true
  } 
}
