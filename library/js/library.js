/* eslint-env browser */

let myLibrary = JSON.parse(window.localStorage.getItem('library'));
if (myLibrary == null) {
  myLibrary = [];
}

function Book(title, author, pages, readAlready) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readAlready = readAlready;
}

Book.prototype = {
  constructor: Book, // define the constructor property
  updateReadStatus() {
    if (this.readAlready === 'been read') {
      this.readAlready = 'not been read';
    } else {
      this.readAlready = 'been read';
    }
  },
};

myLibrary.forEach((book) => { Object.setPrototypeOf(book, Book.prototype); });
function updateLocalStorage(array) {
  window.localStorage.setItem('library', JSON.stringify(array));
}

function render() {
  document.getElementById('books-list').innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookList = document.getElementById('books-list');

    const div = document.createElement('div');
    div.className = 'col-12 col-md-3 col-lg-4';

    const ul = document.createElement('ul');
    div.appendChild(ul);

    const liTitle = document.createElement('li');
    liTitle.id = 'title';
    liTitle.innerHTML = `<b>Title</b>: ${book.title}`;
    ul.appendChild(liTitle);

    const liAuthor = document.createElement('li');
    liAuthor.id = 'author';
    liAuthor.innerHTML = `<b>By</b>: ${book.author}`;
    ul.appendChild(liAuthor);

    const liPages = document.createElement('li');
    liPages.id = 'pages';
    liPages.innerHTML = `<b>No of Pages</b>: ${book.pages}`;
    ul.appendChild(liPages);

    const liRead = document.createElement('li');
    liRead.id = 'read';
    liRead.innerHTML = `<b>Has</b> ${book.readAlready}`;
    ul.appendChild(liRead);

    const btnUpdate = document.createElement('button');
    btnUpdate.className = 'updateBtn';
    btnUpdate.setAttribute('data-attributes', index);
    btnUpdate.innerHTML = 'Update Read Status';
    btnUpdate.addEventListener('click', (event) => {
      const bookToUpdate = event.target.getAttribute('data-attributes');
      myLibrary[bookToUpdate].updateReadStatus();
      updateLocalStorage(myLibrary);
      render();
    });
    ul.appendChild(btnUpdate);

    const btnRemove = document.createElement('button');
    btnRemove.className = 'removeBtn';
    btnRemove.setAttribute('data-attributes', index);
    btnRemove.innerHTML = 'Delete';
    btnRemove.addEventListener('click', (event) => {
      const bookToDelete = event.target.getAttribute('data-attributes');
      myLibrary.splice(bookToDelete, 1);
      updateLocalStorage(myLibrary);
      render();
    });
    ul.appendChild(btnRemove);

    bookList.appendChild(div);
  });
}

function addBookToLibrary() {
  const title = document.getElementById('book_title').value;
  const author = document.getElementById('book_author').value;
  const pages = document.getElementById('pages').value;
  let readAlready = document.getElementsByName('readAlready')[0].checked;
  const notRead = document.getElementsByName('readAlready')[1].checked;

  if (title === '' || author === '' || pages === '' || (readAlready === false && notRead === false)) {
    document.getElementById('alert-form').style.display = 'block';
  } else {
    if (readAlready === true) {
      readAlready = 'been read';
    } else {
      readAlready = 'not been read';
    }
    const newBook = new Book(title, author, pages, readAlready);
    myLibrary.push(newBook);
    updateLocalStorage(myLibrary);
    render();
    document.getElementById('id01').style.display = 'none';
    document.getElementById('alert-form').style.display = 'none';
    document.getElementById('form').reset();
  }
}
document.getElementById('submitBtn').addEventListener('click', addBookToLibrary);
