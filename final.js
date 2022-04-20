// variable declaration
const bookList = document.querySelector('#list');
const form = document.querySelector('form');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

let arrOfBooks = [];

class BookStore {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    if (localStorage.getItem('localData') === null) {
      localStorage.setItem('localData', JSON.stringify([]));
      const book = { title: this.title, author: this.author };
      arrOfBooks.push(book);
      localStorage.setItem('localData', JSON.stringify(arrOfBooks));
      location.reload();
    } else {
      arrOfBooks = JSON.parse(localStorage.getItem('localData'));
      arrOfBooks.push({ title: this.title, author: this.author });
      localStorage.setItem('localData', JSON.stringify(arrOfBooks));
      location.reload();
    }
  }

  removeBook() {
    let arr = JSON.parse(localStorage.getItem('localData'));
    const allbtns = document.querySelectorAll('#list button');

    allbtns.forEach((a, i) => {
      a.addEventListener('click', () => {
        arr = arr.filter((object) => arr.indexOf(object) !== i);
        localStorage.setItem('localData', JSON.stringify(arr));

        location.reload();
      });
    });
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const books = new BookStore(titleInput.value, authorInput.value);
  books.addBook();
});

function ATLoad() {
  const arr = JSON.parse(localStorage.getItem('localData'));
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].title !== '' || arr[i].author !== '') {
      bookList.innerHTML += `<div class='bookWrapper'><p class='bookDetails'>${arr[i].title} by ${arr[i].author}</p><button id='${i}'>Remove</button></div>`;
    } else {
      bookList.innerHTML += '';
    }
  }

  const bookR = new BookStore();
  bookR.removeBook();
}

window.addEventListener('load', ATLoad);