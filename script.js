let mainLibrary = [];

function Book(title, author, pages, isRead) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.isRead = isRead; 
}

let testBook1 = new Book('pedro paramo', 'juan rulfo', 69, true)

let testBook2 = new Book('el llano en llamas', 'juan rulfo', 88, false)

let testBook3 = new Book('rayuela', 'julio cortazar', 400, true)

let testBook4 = new Book('el tunel', 'ernesto sabato', 89, true)


function addBookToLibrary(bookObject) {
    mainLibrary.push(bookObject)
}

addBookToLibrary(testBook1)
addBookToLibrary(testBook2)
addBookToLibrary(testBook3)
addBookToLibrary(testBook4)

