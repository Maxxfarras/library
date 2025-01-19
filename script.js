let buttonBook = document.querySelector("#book-button");
let buttonCancel = document.querySelector("#cancel");
let form = document.querySelector("#book-form");
let dialog = document.querySelector("dialog");
let bookCount = 0;

function Book(title, author, pages, isRead, comment) {
  //object constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.comment = comment;
}

Book.prototype.buttonColorChange = document
  .querySelector("#main-container") //checks whole container for the .isRead-button
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("isRead-button")) {
      const isReadButton = event.target; //when in click
      if (isReadButton.textContent === "Read") {
        //toggle color depending on the textContent
        isReadButton.textContent = "Not Read";
        isReadButton.style.backgroundColor = "#fafffd";
      } else {
        isReadButton.textContent = "Read";
        isReadButton.style.backgroundColor = "#a2d729";
      }
    }
  });

//to avoid content overflowing, limit 9 cards
buttonBook.addEventListener("click", () => {
  if (bookCount < 9) {
    dialog.showModal();
  } else {
    alert("You have reached the book limit, delete some books.");
  }
});

//event listener on submit dialog
form.addEventListener("submit", (event) => {
  event.preventDefault(); //prevent server connection
  let formData = new FormData(form);
  let title = formData.get("title-book");
  let author = formData.get("author-book");
  let pages = formData.get("pages-book");
  let isRead = formData.get("isRead-book");
  let comment = formData.get("comment-book");
  isRead === null ? (isRead = "Not Read") : (isRead = "Read"); //to avoid null
  let book = new Book(title, author, pages, isRead, comment);
  createCard(book);
  bookCount += 1;
  form.reset();
  dialog.close();
});

//event listener to cancel dialog
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
  <div>${book.comment}</div>
  <button class='isRead-button'>${book.isRead}</button>
  <button class='delete-button'>Delete</button>
  `; //Create card based on book data
  container.appendChild(bookCard);
  let isReadButton = bookCard.querySelector(".isRead-button"); //sets default color on the isRead-button
  if (book.isRead === "Read") {
    isReadButton.style.backgroundColor = "#a2d729";
  } else {
    isReadButton.style.backgroundColor = "#fafffd";
  }
}

//event listeners for delete button
document.querySelector("#main-container").addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    //checks the whole container for divs with .delete-button
    let card = event.target.closest(".book-card"); //selects the nearest ancestor
    card.remove();
    bookCount -= 1;
  }
});
