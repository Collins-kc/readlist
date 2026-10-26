import { searchBooks } from "./api.js";
import { renderResults, showMessage } from "./ui.js";

let searchResults = [];

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