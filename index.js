const books = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    function info() {
        return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`
    }
} 

function renderLibrary() {
    books.forEach(book => {
        const $tableRow = document.createElement('tr');
        const $titleCell = document.createElement('td');
        $titleCell.textContent = book.title;
        const $authorCell = document.createElement('td');
        $authorCell.textContent = book.author
        const $pagesCell = document.createElement('td');
        $pagesCell.textContent = book.pages;
        const $readCell = document.createElement('td');
        $readCell.textContent = book.read;
        $tableRow.appendChild($titleCell);
        $tableRow.appendChild($authorCell);
        $tableRow.appendChild($pagesCell);
        $tableRow.appendChild($readCell);
        document.querySelector('tbody').appendChild($tableRow);
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

const $button = document.querySelector('.open-sidebar-button');
$button.addEventListener('click', () => {
    document.querySelector('aside').style.width = '50%';
    $button.disabled = true;
})