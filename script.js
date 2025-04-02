class Book {
  constructor(title, author, pages, isRead, comment) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.comment = comment;
    document
      .querySelector("#main-container")
      .addEventListener("click", this.buttonColorChange);
  }

  buttonColorChange(event) {
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
  }
}

class Library {
  constructor() {
    this.buttonBook = document.querySelector("#book-button");
    this.dialog = document.querySelector("dialog");
    this.bookCount = 0;

    this.buttonBook.addEventListener("click", () => this.newBookClickHandler());

    document
      .querySelector("#main-container")
      .addEventListener("click", (event) => this.deleteCard(event, this));
  }

  newBookClickHandler() {
    if (this.bookCount < 9) {
      this.dialog.showModal();
    } else {
      alert("You have reached the book limit, delete some books.");
    }
  }

  deleteCard(event, obj) {
    if (event.target.classList.contains("delete-button")) {
      //checks the whole container for divs with .delete-button
      let card = event.target.closest(".book-card"); //selects the nearest ancestor
      card.remove();
      obj.bookCount -= 1;
    }
  }

  addBookCount() {
    this.bookCount += 1
  }

  checkBookCount() {
    return this.bookCount
  }

}

class Form {
  constructor() {
    this.form = document.querySelector("#book-form");
    this.dialog = document.querySelector("dialog");
    this.buttonCancel = document.querySelector("#cancel");
    this.bookCount = 0;
    this.form.addEventListener("submit", (event) => this.formSubmitHandler(event, this));
    this.buttonCancel.addEventListener("click", () => this.cancelClickHandler());
  }

  formSubmitHandler(event, obj) {
    event.preventDefault(); //prevent server connection
    let formData = new FormData(this.form);
    let title = formData.get("title-book");
    let author = formData.get("author-book");
    let pages = formData.get("pages-book");
    let isRead = formData.get("isRead-book");
    let comment = formData.get("comment-book");
    isRead === null ? (isRead = "Not Read") : (isRead = "Read"); //to avoid null
    let book = new Book(title, author, pages, isRead, comment);
    obj.createCard(book);
    myLibrary.addBookCount();
    obj.form.reset();
    obj.dialog.close();
  }

  cancelClickHandler() {
    this.dialog.close();
    this.form.reset();
  }

  createCard(book) {
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
}

let myLibrary = new Library();

let myForm = new Form()