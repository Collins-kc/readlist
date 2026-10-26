import { searchBooks, addBook, getBooks } from "./api.js";
import { renderResults, renderList, showMessage } from "./ui.js";

let searchResults = [];
let readingList = [];
let readingList = [];

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

async function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  try {
    searchResults = await searchBooks(query);
    renderResults(searchResults);
  } catch (error) {
    showMessage(error.message, "error");
  }
}

searchForm.addEventListener("submit", handleSearch);


// Turns an Open Library result into the object we save
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
    await addBook(book);
    await loadList();
    showMessage(`"${book.title}" added to your list!`, "success");
  } catch (error) {
    showMessage(error.message, "error");
  }
}

document.getElementById("results").addEventListener("click", handleResultsClick);


async function loadList() {
  try {
    readingList = await getBooks();
    renderList(readingList);
  } catch (error) {
    showMessage(error.message, "error");
  }
}

loadList();