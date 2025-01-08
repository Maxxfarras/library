let buttonBook = document.querySelector("#book-button");
let buttonCancel = document.querySelector("#cancel");
let form = document.querySelector("#book-form");
let dialog = document.querySelector("dialog");
let mainLibrary = [];

function Book(title, author, pages, isRead, comment) { //object constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.comment = comment;
}

buttonBook.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); //prevent server connection
  let formData = new FormData(form);
  let title = formData.get("title-book");
  let author = formData.get("author-book");
  let pages = formData.get("pages-book");
  let isRead = formData.get("isRead-book");
  let comment = formData.get("comment-book")
  isRead === null ? (isRead = "Not Read") : (isRead = "Read"); //to avoid null
  let book = new Book(title, author, pages, isRead, comment);
  createCard(book);
  form.reset();
  dialog.close();
});

buttonCancel.addEventListener("click", () => {
  dialog.close();
  form.reset();
});

function createCard(book) {
  let container = document.querySelector("#main-container");
  let bookCard = document.createElement("div");
  bookCard.classList.toggle("book-card");
  bookCard.innerHTML = `
  <div>Title: ${book.title}</div>
  <div>Author: ${book.author}</div>
  <div>Pages: ${book.pages}</div>
  <div>${book.isRead}</div>
  <div>${book.comment}</div>
  <button class='delete-button'>Delete</button>
  `;
  container.appendChild(bookCard);
}

//event listeners for delete button 
document.querySelector('#main-container').addEventListener('click', (event) => {
  if(event.target.classList.contains('delete-button')) { //checks the whole container for divs with .delete-button
    let card = event.target.closest('.book-card') //selects the nearest ancestor
    card.remove();
  }
})