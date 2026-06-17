const API_URL = "/api/books";

window.onload = loadBooks;

async function addBook() {
  const bookId = document.getElementById("bookId").value;
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value.trim();
  const price = document.getElementById("price").value.trim();
  const quantity = document.getElementById("quantity").value.trim();

  if (!title || !author || !category || !price || !quantity) {
    alert("Please fill all fields");
    return;
  }

  const payload = {
    title,
    author,
    category,
    price: Number(price),
    quantity: Number(quantity),
  };

  const method = bookId ? "PUT" : "POST";
  const url = bookId ? `${API_URL}/${bookId}` : API_URL;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }

    alert(bookId ? "Book updated successfully" : "Book added successfully");
    clearForm();
    loadBooks();
  } catch (error) {
    alert(error.message);
  }
}

async function loadBooks() {
  try {
    const response = await fetch(API_URL);
    const books = await response.json();
    displayBooks(books);
  } catch (error) {
    alert("Unable to load books");
  }
}

async function searchBook() {
  const searchTitle = document.getElementById("searchTitle").value.trim();

  try {
    const url = searchTitle ? `${API_URL}?search=${encodeURIComponent(searchTitle)}` : API_URL;
    const response = await fetch(url);
    const books = await response.json();
    displayBooks(books);
  } catch (error) {
    alert("Unable to search books");
  }
}

function displayBooks(books) {
  const tableBody = document.getElementById("bookTable");
  tableBody.innerHTML = "";

  if (!books.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">No books found.</td>
      </tr>
    `;
    return;
  }

  books.forEach((book) => {
    tableBody.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td>₹${book.price}</td>
        <td>${book.quantity}</td>
        <td>
          <div class="actions">
            <button class="edit-btn" type="button" onclick="editBook('${book._id}')">Edit</button>
            <button class="delete-btn" type="button" onclick="deleteBook('${book._id}')">Delete</button>
          </div>
        </td>
      </tr>
    `;
  });
}

async function editBook(bookId) {
  try {
    const response = await fetch(`${API_URL}/${bookId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Unable to load book");
    }

    const book = await response.json();
    document.getElementById("bookId").value = book._id;
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("category").value = book.category;
    document.getElementById("price").value = book.price;
    document.getElementById("quantity").value = book.quantity;
    document.querySelector(".add-btn").textContent = "Update Book";
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    alert(error.message);
  }
}

async function deleteBook(bookId) {
  const confirmed = confirm("Delete this book?");

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${bookId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Delete failed");
    }

    loadBooks();
  } catch (error) {
    alert(error.message);
  }
}

function clearForm() {
  document.getElementById("bookId").value = "";
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
  document.querySelector(".add-btn").textContent = "Add Book";
}
