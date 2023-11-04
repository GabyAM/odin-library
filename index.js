const books = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`
    }

    this.toggleRead = function () {
        this.read = !this.read;
    }
} 

function createDeleteButton() {
    const $deleteButton = document.createElement('button');
    const $deleteIcon = document.createElement('span');
    $deleteIcon.className = 'material-symbols-outlined';
    $deleteIcon.textContent = 'delete'
    $deleteButton.appendChild($deleteIcon);
    $deleteButton.addEventListener('click', () => {
        const index = $deleteButton.parentElement.dataset.arrayIndex;
        books.splice(index, 1);
        renderLibrary()
    })
    return $deleteButton;
}

function createReadButton(book) {
    const $read = document.createElement('button');
    if(book.read) {
        $read.textContent = 'read';
        $read.className = 'read-button green'
    } else {
        $read.textContent = 'not read';
        $read.className = 'read-button red'
    }
    $read.addEventListener('click', () => {
            book.toggleRead()
            renderLibrary()
        }
    )
    return $read;
}

function createBookElement(book) {
    const $card = document.createElement('div');
    $card.className = 'book-card';
    const $title = document.createElement('h3');
    $title.textContent = book.title;
    const $author = document.createElement('span');
    $author.textContent = `by ${book.author}`;
    const $pages = document.createElement('span');
    $pages.textContent = `${book.pages} pages`;

    const $read = createReadButton(book);
    const $deleteButton = createDeleteButton()

    $card.appendChild($title);
    $card.appendChild($author);
    $card.appendChild($pages);
    $card.appendChild($read);
    $card.appendChild($deleteButton);
    $card.dataset.arrayIndex = books.indexOf(book);

    document.querySelector('.books-grid').appendChild($card);
}

function renderLibrary() {
    document.querySelector('.books-grid').innerHTML = '';
    books.forEach(book => {
         createBookElement(book);
    })
}

function addBookToLibrary(book) {
    books.push(book);
    renderLibrary();
}

const $form = document.querySelector('form');
$form.addEventListener('submit', (event) => {
    const formData = new FormData($form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read');
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    $form.reset();
    event.preventDefault();
})

const $formExitButton = document.querySelector('.form-exit-button');
const $button = document.querySelector('.open-sidebar-button');
$button.addEventListener('click', () => {
    document.querySelector('aside').classList.add('open');
    setTimeout(() => {
        $formExitButton.style.visibility = 'visible';
    }, 600)
    $button.disabled = true;
})

$formExitButton.addEventListener('click', () => {
    document.querySelector('aside').classList.remove('open');
    $button.disabled = false;
    $formExitButton.style.visibility = 'hidden';
})


const book1 = new Book('The hobbit', 'George R.R. Martin', 9001 , false)
const book2 = new Book('I, Robot', 'Isaac Asimov', 329 , true)
const book3 = new Book('Atomic Habits', 'James Clear', 350 , false)
books.push(book1);
books.push(book2);
books.push(book3);
renderLibrary();