class Books {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        const isRead = this.read ? "read" : "not read";
        return `${this.title} was written by ${this.author}, has ${this.pages} pages, and I have ${isRead} it.`;
    }

}

let myLibrary = [];

const bookForm = document.querySelector("form");

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Books(title, author, pages, read);
    myLibrary.push(newBook);
    rendering();
    return newBook;
}

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = bookForm.title.value;
    const author = bookForm.author.value;
    const pages = parseInt(bookForm.pages.value);
    const read = bookForm.readStatus.value === "yes";

    addBookToLibrary(title, author, pages, read);
    bookForm.reset();
});

const books = document.querySelector(".books");

function rendering() {
    books.innerHTML = "";
    myLibrary.forEach((book, index) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        p.innerText = book.info();

        const notRead = document.createElement("button");
        notRead.innerText = "Not Read";
        notRead.classList.add("not-read");

        const Read = document.createElement("button");
        Read.innerText = "Read";
        Read.classList.add("read");

        const button = document.createElement("button");
        button.innerText = "remove";

        button.addEventListener("click", () => {
            myLibrary = myLibrary.filter(b => b.id !== book.id);
            rendering();
        });


        Read.addEventListener("click", () => {
            myLibrary[index].read = true;
            rendering();
        });

        notRead.addEventListener("click", () => {
            myLibrary[index].read = false;
            rendering();
        });

        div.classList.add("book");

        books.append(div);
        div.append(p);
        div.append(buttons);

        if (book.read) {
            buttons.append(notRead);
        } else {
            buttons.append(Read);
        }

        buttons.append(button);
    });
}
