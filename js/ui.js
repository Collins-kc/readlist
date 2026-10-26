const resultsEl = document.getElementById("results");
const listEl = document.getElementById("reading-list");
const messageEl = document.getElementById("message");
const loadingEl = document.getElementById("loading");

// Helper: builds an element safely
function make(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function coverUrl(coverId) {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://placehold.co/160x240?text=No+Cover";
}

let messageTimer;
export function showMessage(text, type = "info") {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  messageEl.hidden = false;
  clearTimeout(messageTimer);
  messageTimer = setTimeout(() => {
    messageEl.hidden = true;
  }, 4000);
}

export function showLoading(isLoading) {
  loadingEl.hidden = !isLoading;
}

export function renderResults(books) {
  resultsEl.innerHTML = "";
  if (books.length === 0) {
    resultsEl.append(make("p", "", "No books found. Try another title."));
    return;
  }
  books.forEach((book, index) => {
    const card = make("article", "card");
    const img = make("img");
    img.src = coverUrl(book.cover_i);
    img.alt = `Cover of ${book.title}`;
    const title = make("h3", "", book.title);
    const author = make("p", "author", book.author_name ? book.author_name[0] : "Unknown author");
    const addBtn = make("button", "add-btn", "Add");
    addBtn.dataset.index = index;
    card.append(img, title, author, addBtn);
    resultsEl.append(card);
  });
}

export function renderList(books) {
  listEl.innerHTML = "";
  if (books.length === 0) {
    listEl.append(make("p", "", "Your list is empty. Search for a book to add!"));
    return;
  }
  books.forEach((book) => {
    const card = make("article", "card");
    card.dataset.id = book.id;

    const img = make("img");
    img.src = coverUrl(book.coverId);
    img.alt = `Cover of ${book.title}`;

    const select = make("select", "status-select");
    ["Want to read", "Reading", "Finished"].forEach((status) => {
      const option = make("option", "", status);
      option.value = status;
      option.selected = status === book.status;
      select.append(option);
    });

    const notes = make("textarea", "notes");
    notes.value = book.notes || "";
    notes.placeholder = "Your notes...";

    card.append(
      img,
      make("h3", "", book.title),
      make("p", "author", book.author),
      select,
      notes,
      make("button", "save-btn", "Save notes"),
      make("button", "delete-btn", "Delete")
    );
    listEl.append(card);
  });
}