let myLibrary = {}

// bugs
// form does not clear
// footer gets lost after adding enough books to overflow
// forms don't have validation checks

// improvements
// messy flow in script.js
// footer yet to be added
// editting still not implemeneted
// animations not implemented

// features
// theme picker
// Read? can become a button instead

// Book class, without ES6 syntactic sugar
function Book(title, author, pages, read) {
  this.index = Book.prototype.count;
  Book.prototype.count++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.count = 0;
Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readToString()}`
}

Book.prototype.readToString = function() {
  return this.read ? 'read' : 'not read yet';
}

Book.prototype.pagesToString = function() {
  return `${this.pages} pages`;
}


// HTML Book card generator
function createBookNode(book) {
  const newBook = document.createElement('div');
  newBook.className = 'card';
  
  newBook.dataset.index = book.index;

  const newBookTitle = document.createElement('button');
  newBookTitle.className = 'title';
  newBookTitle.textContent = book.title;
  newBook.appendChild(newBookTitle);

  const newBookAuthor = document.createElement('button');
  newBookAuthor.className = 'author';
  newBookAuthor.textContent = book.author;
  newBook.appendChild(newBookAuthor);

  const newBookPages = document.createElement('button');
  newBookPages.className = 'pages';
  newBookPages.textContent = book.pagesToString();
  newBook.appendChild(newBookPages);

  const newBookRead = document.createElement('button');
  newBookRead.className = 'read';
  newBookRead.textContent = book.readToString();
  newBook.appendChild(newBookRead);
  newBookRead.addEventListener('click', e => toggleRead(e));

  const newBookDelete = document.createElement('button');
  newBookDelete.className = 'delete';
  newBook.appendChild(newBookDelete);
  newBookDelete.addEventListener('click', e => deleteBook(e));

  document.querySelector('.main').lastElementChild.before(newBook);
}

// Adding new book
const addButtonNode = document.querySelector('button[class="add"]');
const newBookFormNode = document.querySelector('#new-book-form');
const cancelButtonNode = document.querySelector('button[class="cancel"]');
const submitButtonNode = document.querySelector('button[type="submit"]');

function toggleAddForm() {
  if (newBookFormNode.style.display == 'none' || 
      newBookFormNode.style.display == '') {
    addButtonNode.style.display = 'none';
    newBookFormNode.style.display = 'grid';
  } else {
    addButtonNode.style.display = 'block';
    newBookFormNode.style.display = 'none';
  }
}

function clearForm() {
  document.querySelector('#new-title').value = "";
  document.querySelector('#new-author').value = "";
  document.querySelector('#new-pages').value = "";
  document.querySelector('#new-read').checked = false;
}

function createNewBook(e) {
  e.preventDefault();
  const title = document.querySelector('#new-title').value;
  const author = document.querySelector('#new-author').value;
  const pages = document.querySelector('#new-pages').value;
  const read = document.querySelector('#new-read').checked;
  console.log(read)
  return new Book(title, author, pages, read);
}

function submitAddForm(e) {
  const newBook = createNewBook(e);
  console.log(newBook);
  myLibrary[newBook.index] = newBook;
  createBookNode(newBook);
  toggleAddForm();
  clearForm();
}

addButtonNode.addEventListener('click', toggleAddForm);
cancelButtonNode.addEventListener('click', toggleAddForm);
submitButtonNode.addEventListener('click', e => submitAddForm(e));

// Deleting book
function deleteBook(e) {
  const bookNode = e.target.parentNode;
  delete myLibrary[bookNode.dataset.index];
  bookNode.remove();
}

// Change read status
function toggleRead(e) {
  const bookNode = e.target.parentNode;
  const book = myLibrary[bookNode.dataset.index];
  book.read = !book.read;

  const bookReadNode = bookNode.querySelector('button[class="read"]');
  bookReadNode.textContent = book.readToString();
}




const hobbitBook = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
createBookNode(hobbitBook);
myLibrary[0] = hobbitBook;