const OPEN_LIBRARY = "https://openlibrary.org/search.json";
const API_URL = "http://localhost:3000/books";

export async function searchBooks(query) {
  const res = await fetch(`${OPEN_LIBRARY}?q=${encodeURIComponent(query)}&limit=10`);
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.docs;
}

export async function addBook(book) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Could not add book");
  return res.json();
}