const OPEN_LIBRARY = "https://openlibrary.org/search.json";
const API_URL = "http://localhost:3000/books";

export async function searchBooks(query) {
  const res = await fetch(`${OPEN_LIBRARY}?q=${encodeURIComponent(query)}&limit=10`);
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.docs;
}