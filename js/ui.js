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