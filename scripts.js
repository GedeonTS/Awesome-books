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
    function assignClass() {
      if (i % 2 === 0) { return 'grey'; } return 'white';
    }
    if (arr[i].title !== '' || arr[i].author !== '') {
      bookList.innerHTML += `<div class='bookWrapper ${assignClass()}'><p class='bookDetails'>"${arr[i].title}" by ${arr[i].author}</p><button id='${i}'>Remove</button></div>`;
    } else {
      bookList.innerHTML += '';
    }
  }

  const bookR = new BookStore();
  bookR.removeBook();
}

window.addEventListener('load', ATLoad);

const date = new Date().getDate().toString();
const hour = new Date().getHours().toString();
const min = new Date().getMinutes().toString();
const y = new Date().getFullYear().toString();
const sec = new Date().getSeconds().toString();

const year = ['january', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const monthIndex = new Date().getMonth().toString();

const month = year[monthIndex];

const DateSection = document.querySelector('.date');
DateSection.innerHTML = `<p>${month} ${date}th ${y},${hour}:${min}:${sec}</p>`;

const firstSection = document.querySelector('.first');
const secondSection = document.querySelector('.second');
const lastSection = document.querySelector('.last');

const menu1 = document.querySelector('.menu1');
const menu2 = document.querySelector('.menu2');
const menu3 = document.querySelector('.menu3');

function firstOnly() {
  firstSection.classList.add('show');
  firstSection.classList.remove('hide');

  secondSection.classList.add('hide');
  secondSection.classList.remove('show');

  lastSection.classList.add('hide');
  lastSection.classList.remove('show');
}

function secondOnly() {
  firstSection.classList.add('hide');
  firstSection.classList.remove('show');

  secondSection.classList.add('show');
  secondSection.classList.remove('hide');

  lastSection.classList.add('hide');
  lastSection.classList.remove('show');
}

function lasttOnly() {
  firstSection.classList.add('hide');
  firstSection.classList.remove('show');

  secondSection.classList.add('hide');
  secondSection.classList.remove('show');

  lastSection.classList.add('show');
  lastSection.classList.remove('hide');
}

menu1.addEventListener('click', firstOnly);
menu2.addEventListener('click', secondOnly);
menu3.addEventListener('click', lasttOnly);
