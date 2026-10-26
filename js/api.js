const OPEN_LIBRARY = "https://openlibrary.org/search.json";
const API_URL = "https://YOUR-APP.onrender.com/books";

export async function searchBooks(query) {
  const res = await fetch(`${OPEN_LIBRARY}?q=${encodeURIComponent(query)}&limit=10`);
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.docs;
}

export async function getBooks(status = "") {
  const url = status ? `${API_URL}?status=${encodeURIComponent(status)}` : API_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Could not load your list");
  return res.json();
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

export async function updateBook(id, book) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Could not update book");
  return res.json();
}

export async function updateStatus(id, status) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Could not update status");
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Could not delete book");
}
