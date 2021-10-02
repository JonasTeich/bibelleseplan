const SUPABASE_URL = 'https://hkfomhpjagnnioxqgane.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw'
var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let selected
let users
let plan

displayDays()

async function displayDays () {
  if (supabase.auth.user() === null) {
    document.location.href = '../signin'
  }
  plan = await supabase
    .from(localStorage.getItem('selectedPlan'))
    .select()
  users = await supabase
    .from('users')
    .select('*', { count: 'exact'})
  for (let i = 0; i < plan.data.length; i++) {
    const div = document.createElement('div')
    const day = document.createElement('p')
    const progress = document.createElement('div')
    const info = document.createElement('span')
    info.innerText = 'info'
    info.classList.add('material-icons')
    progress.classList.add('progress')
    div.classList.add('day-entry')
    div.id = plan.data[i].id
    day.innerText = 'Tag ' + plan.data[i].id
    div.appendChild(progress)
    if (plan.data[i].read.length > 0) progress.style.width = (plan.data[i].read.length / users.count * 100) + '%'
    div.appendChild(day)
    div.appendChild(info)
    div.addEventListener('click', (e) => {
      if (e.target.classList.contains('material-icons')) {
        openInfoBox(e.target.parentElement.id, i)
      } else {
        localStorage.setItem('selectedIndex', e.target.id)
        document.location.href = '../reading'
      }
    })
    document.querySelector('.content').appendChild(div)
    document.querySelector('.content').insertChildAtIndex()
  }
}

document.querySelector('.close-btn').addEventListener('click', () => {
  document.querySelector('.info-box-wrapper').style.display = 'none'
  document.querySelector('body').style.overflow = 'scroll'
})

document.querySelector('header .material-icons').addEventListener('click', () => {
  document.location.href = '../selectplan'
})

Element.prototype.insertChildAtIndex = function () {
  var items = this.childNodes;
  var itemsArr = [];
  for (var i in items) {
    if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
      itemsArr.push(items[i]);
    }
  }

  itemsArr.sort(function(a, b) {
    console.log(parseInt(a.children[1].innerText.replace('Tag ', ''), 10))
    return parseInt(a.children[1].innerText.replace('Tag ', ''), 10) == parseInt(b.children[1].innerText.replace('Tag ', ''), 10)
    ? 0
    : (parseInt(a.children[1].innerText.replace('Tag ', ''), 10) > parseInt(b.children[1].innerText.replace('Tag ', ''), 10) ? 1 : -1);
  });

  for (i = 0; i < itemsArr.length; ++i) {
    this.appendChild(itemsArr[i]);
  }
}

const openInfoBox = (day, i) => {
  document.querySelector('.read').innerHTML = ''
  document.querySelector('.not-read').innerHTML = ''
  users.data.map((user) => {
    if (plan.data[i].read.includes(user.username)) {
      const li = document.createElement('li')
      li.innerHTML = user.username + '<span class="material-icons green">check_circle</span>'
      document.querySelector('.read').appendChild(li)
    } else {
      const li = document.createElement('li')
      li.innerHTML = user.username + '<span class="material-icons">dangerous</span>'
      document.querySelector('.not-read').appendChild(li)
    }
  })
  document.querySelector('.info-box-wrapper').style.display = 'flex'
  document.querySelector('.info-box h3').innerText = 'Tag ' + day
  document.querySelector('body').style.overflow = 'hidden'
}
