const bookSelect = document.querySelector('#book-select')
const chapterSelect = document.querySelector('#chapter-select')

document.addEventListener('DOMContentLoaded', () => {
  bibleJSON.map(book => {
    const bookOption = document.createElement('option')
    bookOption.innerText = book.name
    bookOption.value = book.name
    bookSelect.appendChild(bookOption)
  })
  selectSelected()
  showChapter()
})
bookSelect.addEventListener('change', showChapter)
chapterSelect.addEventListener('change', showChapter)
document.querySelector('header .material-icons').addEventListener('click', () => {
  document.location.href = '../reading'
})

function selectSelected () {
  if (localStorage.getItem('selectedBook')) {
    bookSelect.value = localStorage.getItem('selectedBook')
    if (localStorage.getItem('selectedChapter')) {
      chapterSelect.value = parseInt(localStorage.getItem('selectedChapter'),10) + 1
    }
  }
}

function showChapter () {
  document.querySelector('.content').lastChild.remove()
  bibleJSON.filter(book => {
    if (bookSelect.value === book.name) {
      chapterSelect.max = book.chapters.length
      const textDiv = document.createElement('div')
      textDiv.classList.add('text')
      book.chapters.map(chapter => {
        if (parseInt(chapterSelect.value, 10) === (book.chapters.indexOf(chapter) + 1)) {
          chapter.map(vers => {
            const versP = document.createElement('p')
            versP.innerHTML = '<span class="vers-number">' + (chapter.indexOf(vers) + 1) + '</span> ' + vers
            textDiv.appendChild(versP)
          })
        }
      })
      document.querySelector('.content').appendChild(textDiv)
    }
  })
}