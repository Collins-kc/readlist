import { searchBooks, addBook, getBooks, updateBook, updateStatus, deleteBook } from "./api.js";
import { renderResults, renderList, showMessage, showLoading } from "./ui.js";

let searchResults = [];
let readingList = [];
let currentFilter = "";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const listEl = document.getElementById("reading-list");

async function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    showMessage("Please type a book title first.", "error");
    return;
  }
  showLoading(true);
  try {
    searchResults = await searchBooks(query);
    renderResults(searchResults);
  } catch (error) {
    showMessage("Search failed. Check your internet and try again.", "error");
  } finally {
    showLoading(false);
  }
}

function toBook(doc) {
  return {
    title: doc.title,
    author: doc.author_name ? doc.author_name[0] : "Unknown author",
    key: doc.key,
    coverId: doc.cover_i || null,
    status: "Want to read",
    notes: "",
  };
}

async function handleResultsClick(event) {
  const button = event.target.closest(".add-btn");
  if (!button) return;
  const book = toBook(searchResults[button.dataset.index]);
  try {
    const allBooks = await getBooks();
    if (allBooks.some((b) => b.key === book.key)) {
      showMessage("That book is already in your list.", "error");
      return;
    }
    await addBook(book);
    showMessage(`"${book.title}" added to your list!`, "success");
    await loadList();
  } catch (error) {
    showMessage("Could not add the book. Please try again.", "error");
  }
}

async function loadList() {
  showLoading(true);
  try {
    readingList = await getBooks(currentFilter);
    renderList(readingList);
  } catch (error) {
    showMessage("Could not load your list. The server may be waking up, so try again in a minute.", "error");
  } finally {
    showLoading(false);
  }
}

searchForm.addEventListener("submit", handleSearch);
document.getElementById("results").addEventListener("click", handleResultsClick);

// Status dropdown changed (PATCH)
listEl.addEventListener("change", async (event) => {
  if (!event.target.matches(".status-select")) return;
  const id = event.target.closest(".card").dataset.id;
  try {
    await updateStatus(id, event.target.value);
    showMessage("Status updated!", "success");
    await loadList();
  } catch (error) {
    showMessage(error.message, "error");
  }
});

// Save notes (PUT) and delete (DELETE)
listEl.addEventListener("click", async (event) => {
  const card = event.target.closest(".card");
  if (!card) return;
  const id = card.dataset.id;

  if (event.target.matches(".save-btn")) {
    const book = readingList.find((b) => String(b.id) === id);
    const notes = card.querySelector(".notes").value;
    try {
      await updateBook(id, { ...book, notes });
      showMessage("Notes saved!", "success");
      await loadList();
    } catch (error) {
      showMessage(error.message, "error");
    }
  }

  if (event.target.matches(".delete-btn")) {
    try {
      await deleteBook(id);
      showMessage("Book removed.", "success");
      await loadList();
    } catch (error) {
      showMessage(error.message, "error");
    }
  }
});

// Filter buttons
document.querySelector(".filters").addEventListener("click", (event) => {
  const button = event.target.closest(".filter-btn");
  if (!button) return;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  button.classList.add("active");
  currentFilter = button.dataset.status;
  loadList();
});

loadList();