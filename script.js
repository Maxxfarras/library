let buttonBook = document.querySelector("#book-button");
let buttonCancel = document.querySelector("#cancel");
let form = document.querySelector("#book-form");
let dialog = document.querySelector("dialog");
let mainLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
//doesn't work, just for the pseudocode
function addBookToLibrary() {
  let title;
  let author;
  let pages;
  let isRead;
  title = prompt("Title:");
  author = prompt("Author:");
  pages = prompt("Pages:");
  while (pages % 1 != 0 || pages < 1) {
    alert("Should enter a correct value");
    pages = prompt("Pages:");
  }
  isRead = confirm("Have you read it?");
  let book = new Book(title, author, pages, isRead);
  mainLibrary.push(book);
  book = {};
}

buttonBook.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(form);
  let title = formData.get("title-book");
  let author = formData.get("author-book");
  let pages = formData.get("pages-book");
  let isRead = formData.get("isRead-book");
  isRead === null ? isRead = 'Not Read' : isRead = 'Read';
  let book = new Book(title, author, pages, isRead);
  mainLibrary.push(book);
  form.reset();
  dialog.close();
});

buttonCancel.addEventListener("click", () => {
  dialog.close();
  form.reset();
});
