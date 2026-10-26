# ReadList

A web app to search for books, build a reading list, and track your progress.

## Overview
ReadList lets users search for books with the Open Library API, add them to a personal reading list, mark each book as Want to read, Reading or Finished, add notes, and remove books. The list is saved on a JSON Server API so it stays after a page refresh.

## Objectives
- Practice fetching data from a public API
- Build full CRUD operations with JSON Server
- Write unit tests and use Git feature branches with pull requests

## Features
- Search books by title (Open Library API)
- Add books to a reading list
- Change status: Want to read, Reading, Finished
- Add and edit notes
- Delete books
- Filter the list by status
- Validation, loading messages and friendly error messages
- Responsive layout for tablet and phone

## Tech Used
HTML, CSS, JavaScript (ES modules), JSON Server, Vitest, Render, GitHub Pages

## Setup
```bash
git clone https://github.com/Collins-kc/readlist.git
cd readlist
npm install
npm run dev
```
Then open `index.html` with Live Server. To use the local API, change `API_URL` in `js/api.js` to `http://localhost:3000/books`.

## API Endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | /books | Load the reading list |
| GET | /books?status=Reading | Filter by status |
| POST | /books | Add a book |
| PUT | /books/:id | Replace a book (edit notes) |
| PATCH | /books/:id | Update status only |
| DELETE | /books/:id | Remove a book |

## Links
- Live app: https://Collins-kc.github.io/readlist/
- API: https://readlist-api.onrender.com/books

## Run the Tests
```bash
npm test
```

## Note About the Free Server
The free Render plan uses temporary storage, so saved books can reset when the service restarts or sleeps. The first request after a sleep can take about a minute.

## License
MIT