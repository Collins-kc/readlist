import { describe, it, expect, vi } from "vitest";
import { searchBooks, getBooks, addBook, updateBook, updateStatus, deleteBook } from "../js/api.js";

// Fake fetch: ok = true/false, data = what json() returns
function mockFetch(ok, data) {
  global.fetch = vi.fn().mockResolvedValue({ ok, json: async () => data });
}

describe("searchBooks", () => {
  it("returns docs when the request succeeds", async () => {
    mockFetch(true, { docs: [{ title: "A" }] });
    expect(await searchBooks("a")).toEqual([{ title: "A" }]);
  });
  it("throws when the request fails", async () => {
    mockFetch(false);
    await expect(searchBooks("a")).rejects.toThrow("Search failed");
  });
});

describe("getBooks", () => {
  it("returns books when the request succeeds", async () => {
    mockFetch(true, [{ id: 1 }]);
    expect(await getBooks()).toEqual([{ id: 1 }]);
  });
  it("adds the status to the URL", async () => {
    mockFetch(true, []);
    await getBooks("Reading");
    expect(fetch.mock.calls[0][0]).toContain("status=Reading");
  });
  it("throws when the request fails", async () => {
    mockFetch(false);
    await expect(getBooks()).rejects.toThrow("Could not load your list");
  });
});

describe("addBook", () => {
  it("returns the saved book", async () => {
    mockFetch(true, { id: 1, title: "A" });
    expect(await addBook({ title: "A" })).toEqual({ id: 1, title: "A" });
  });
  it("throws when the request fails", async () => {
    mockFetch(false);
    await expect(addBook({})).rejects.toThrow("Could not add book");
  });
});

describe("updateBook", () => {
  it("returns the updated book", async () => {
    mockFetch(true, { id: 1, notes: "Good" });
    expect(await updateBook(1, { notes: "Good" })).toEqual({ id: 1, notes: "Good" });
  });
  it("throws when the request fails", async () => {
    mockFetch(false);
    await expect(updateBook(1, {})).rejects.toThrow("Could not update book");
  });
});

describe("updateStatus", () => {
  it("returns the updated book", async () => {
    mockFetch(true, { id: 1, status: "Reading" });
    expect(await updateStatus(1, "Reading")).toEqual({ id: 1, status: "Reading" });
  });
  it("throws when the request fails", async () => {
    mockFetch(false);
    await expect(updateStatus(1, "Reading")).rejects.toThrow("Could not update status");
  });
});

describe("deleteBook", () => {
  it("sends a DELETE request", async () => {
    mockFetch(true);
    await deleteBook(1);
    expect(fetch.mock.calls[0][1].method).toBe("DELETE");
  });
  it("throws when the request fails", async () => {
    mockFetch(false);
    await expect(deleteBook(1)).rejects.toThrow("Could not delete book");
  });
});