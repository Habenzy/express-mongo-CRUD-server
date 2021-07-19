let bookCont = document.getElementById('book-list')

fetch('/bookdata')
  .then(res => res.json())
  .then(bookList => {
    bookList.forEach(book => {
      let liEl = document.createElement('li')
      liEl.textContent = book.title

      bookCont.appendChild(liEl)
    })
  })