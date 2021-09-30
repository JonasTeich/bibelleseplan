document.querySelector('.plan').addEventListener('click', () => {
  localStorage.setItem('selectedPlan', 'Jakobus')
  document.location.href = '../plan'
})