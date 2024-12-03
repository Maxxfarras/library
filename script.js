let mainLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

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

addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
console.log(mainLibrary);
