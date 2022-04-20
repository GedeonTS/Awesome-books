//variable declaration
const bookList = document.querySelector('#list');
const addBtn = document.querySelector('#btn');
const form = document.querySelector('form');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

let arrOfBooks = [];

class BookStore {
    constructor(title, author) {
        this.title = title,
            this.author = author

    }

    addBook() {
        if (localStorage.getItem('localData') === null) {

            localStorage.setItem('localData', JSON.stringify([]));
            let book = { title: this.title, author: this.author };
            arrOfBooks.push(book);
            localStorage.setItem('localData', JSON.stringify(arrOfBooks))
            location.reload()

        } else {
            arrOfBooks = JSON.parse(localStorage.getItem('localData'));
            arrOfBooks.push({ title: this.title, author: this.author });
            localStorage.setItem('localData', JSON.stringify(arrOfBooks));
            location.reload()
        }
    }


}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const books = new BookStore(titleInput.value, authorInput.value);
    books.addBook();
});

let arr = JSON.parse(localStorage.getItem('localData'))

function ATLoad() {

    for (let i = 0; i < arr.length; i += 1) {

        bookList.innerHTML += `<p>${arr[i].title} by ${arr[i].author}</p><button id='${i}'>Remove</button><hr>`;
    }

    const allbtns = document.querySelectorAll('#list button');

    allbtns.forEach((a, i) => {
        a.addEventListener('click', () => {

            arr = arr.filter(object => arr.indexOf(object) !== i);




            localStorage.setItem('localData', JSON.stringify(arr));

            location.reload();
        });


    });
}

window.addEventListener('load', ATLoad)