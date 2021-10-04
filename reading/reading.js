const SUPABASE_URL = 'https://hkfomhpjagnnioxqgane.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjgzMDY5NCwiZXhwIjoxOTQ4NDA2Njk0fQ.uYldi0Q_JK7bfYYjG98YctlmxQ7MWZfKqnvW_yalSAw'
var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let data
let logedInUser

setUp()

async function setUp () {
  if (supabase.auth.user() === null) {
    document.location.href = '../signin'
  }
  await getLogedInUser()
  await getDataFromSupabase()
  window.scrollTo(0, 0)
}

document.querySelector('.footer input').addEventListener('click', async () => {
  const { data } = await supabase
    .from(localStorage.getItem('selectedPlan'))
    .select()
    .filter('id', 'eq', localStorage.getItem('selectedIndex'))
  
  if (document.querySelector('.footer input').checked) {
    data[0].read.push(logedInUser.data[0].username)
  } else {
    data[0].read.splice(data[0].read.indexOf(logedInUser.data[0].username), 1)
  }
  
  await supabase
    .from(localStorage.getItem('selectedPlan'))
    .update({ read: data[0].read })
    .eq('id', localStorage.getItem('selectedIndex'))
})

document.querySelector('header .back-btn').addEventListener('click', () => {
  document.location.href = '../plan'
})

document.querySelector('header .bible-btn').addEventListener('click', () => {
  localStorage.setItem('selectedBook', localStorage.getItem('selectedPlan'))
  localStorage.setItem('selectedChapter', 0)
  document.location.href = '../bible'
})

document.querySelector('.back').addEventListener('click', () => {
  if (localStorage.getItem('selectedIndex') > 1) {
    localStorage.setItem('selectedIndex', parseInt(localStorage.getItem('selectedIndex'), 10) - 1)
    location.reload()
  }
})

document.querySelector('.forward').addEventListener('click', () => {
  if (localStorage.getItem('selectedIndex') < count.count) {
    localStorage.setItem('selectedIndex', parseInt(localStorage.getItem('selectedIndex'), 10) + 1)
    location.reload()
  }
})

document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.selected-vers-wrapper').style.display = 'none'
    document.querySelector('body').style.overflowY = 'scroll'
})

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    saveThought()
  }
})
document.querySelector('.section .material-icons').addEventListener('click', saveThought)

async function saveThought () {
  const { data } = await supabase
    .from(localStorage.getItem('selectedPlan'))
    .select()
    .filter('id', 'eq', localStorage.getItem('selectedIndex'))
  
  const thoughtText = document.querySelector('.input input').value
  const username = logedInUser.data[0].username
  const thought = { text: thoughtText, username: username}
  if (thought.text.length > 3) {
    data[0].thoughts.push(thought)
    await supabase
      .from(localStorage.getItem('selectedPlan'))
      .update({ thoughts: data[0].thoughts })
      .filter('id', 'eq', localStorage.getItem('selectedIndex'))
    appendThought(thought)
    document.querySelector('.input input').value = ''
  }
}

async function getLogedInUser () {
  logedInUser = await supabase
    .from('users')
    .select()
    .filter('id', 'eq', supabase.auth.user().id)
}

async function getDataFromSupabase () {
  data = await supabase
    .from(localStorage.getItem('selectedPlan'))
    .select()
    .filter('id', 'eq', localStorage.getItem('selectedIndex'))

  count = await supabase
    .from(localStorage.getItem('selectedPlan'))
    .select('*', { count: 'exact' })
  
  if (data.data[0].read.includes(logedInUser.data[0].username)) {
    document.querySelector('.footer input').checked = true
  }
  
  if (data.data[0].introduction !== null) {
    const introduction = document.querySelector('.introduction')
    document.querySelector('.introduction-text').innerText = data.data[0].introduction
    introduction.style.display = 'block'
  }
  
  if (parseInt(localStorage.getItem('selectedIndex'), 10) === count.count) {
    document.querySelector('.forward').style.opacity = .3
    document.querySelector('.foward').style.cursor = 'not-allowed'
  }
  if (parseInt(localStorage.getItem('selectedIndex'), 10) === 1) {
    document.querySelector('.back').style.opacity = .3
    document.querySelector('.back').style.cursor = 'not-allowed'
  }
    
  const point = document.querySelectorAll('.book-chapter-vers')
  document.title = buildPointString(data.data[0].vers)
  point.forEach((element) => {
    element.innerText = buildPointString(data.data[0].vers)
  })
  data.data[0].vers.map((vers) => {
    document.querySelector('.vers-text').innerHTML += bibleVers(vers) + '<br>'
  })
  document.querySelector('.text').innerHTML = data.data[0].text
  if (data.data[0].think.length < 1) {
    document.querySelector('.think-list').parentElement.style.display = 'none'
  }
  data.data[0].think.map((item) => {
    const li = document.createElement('li')
    li.innerHTML = item
    document.querySelector('.think-list').appendChild(li)
  })
  if (data.data[0].pray.length < 1) {
    document.querySelector('.pray-list').parentElement.style.display = 'none'
  }
  data.data[0].pray.map((item) => {
    const li = document.createElement('li')
    li.innerText = item
    document.querySelector('.pray-list').appendChild(li)
  })
  if (data.data[0].challenge.length < 1) {
    document.querySelector('.challenge-list').parentElement.style.display = 'none'
  }
  data.data[0].challenge.map((item) => {
    const li = document.createElement('li')
    li.innerText = item
    document.querySelector('.challenge-list').appendChild(li)
  })
  data.data[0].thoughts.map((item) => {
    appendThought(item)
  })

  const list = document.querySelectorAll('.vers')
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', () => {
      showVers(list[i].classList[2], list[i].classList[3], list[i].classList[4], list[i].innerText, parseInt(list[i].classList[1].replace('f', '')))
    })
  }
}

function bibleVers (vers) {
  let verses
  bibleJSON.filter((element) => {
    if (element.abbrev === vers[0]) {
      verses = '<span class="number">' + (parseInt(vers[2], 10) + 1) + '</span> ' + element.chapters[vers[1]][vers[2]]
      return true
    }
  })
  return verses
}

function buildPointString (point) {
  if (point.length > 1) {
    return localStorage.getItem('selectedPlan') + ' ' + (parseInt(point[0][1], 10) + 1) + ', ' + (parseInt(point[0][2], 10) + 1) + '-' + (parseInt(point[point.length - 1][2], 10) + 1)
  }
  return localStorage.getItem('selectedPlan') + ' ' + (parseInt(point[0][1], 10) + 1)+ ', ' + (parseInt(point[0][2], 10) + 1)
}

function appendThought (element) {
  const li = document.createElement('li')
  li.innerHTML = element.username + ':<br>' + element.text
  document.querySelector('.thoughts-list').appendChild(li)
}

function showVers (book, chapter, vers, point, number) {
  if (vers === undefined) {
    vers = chapter
  }
  document.querySelector('.selected-vers-wrapper').style.display = 'flex'
  document.querySelector('body').style.overflowY = 'hidden'
  document.querySelector('.selected-vers-box h3').innerText = point
  document.querySelector('.selected-vers-box p').innerText = ''
  document.querySelector('.selected-vers-wrapper button').addEventListener('click', () => {
    bibleJSON.filter(books => {
      if (books.abbrev === book) {
        localStorage.setItem('selectedBook', books.name)
        localStorage.setItem('selectedChapter', chapter)
      }
    })
    document.location.href = '../bible'
  })
  bibleJSON.filter((element) => {
    if (element.abbrev === book) {
      for (let i = 0; i < number; i++) {
        document.querySelector('.selected-vers-box p').innerHTML += '<span class="number">' + (parseInt(vers, 10) + i + 1) + '</span> ' + element.chapters[parseInt(chapter, 10)][parseInt(vers, 10) + i] + '<br>'
      }
      return true
    }
  })
}
