const btnUsers = document.getElementById("getUsers");
const btnBooks = document.getElementById("getBooks");
const content = document.getElementById("content");
const loader = document.getElementById("loader");

const API_URL = "http://localhost:3000";

function showLoader(show) {
  loader.classList.toggle("hidden", !show);
}

btnBooks.addEventListener("click", async () => {
  content.innerHTML = "";
  showLoader(true);

  try {
    const res = await fetch(`${API_URL}/books`);
    const books = await res.json();

    books.forEach(book => {
      const card = document.createElement("div");
      card.className = "card";

      const title = book.title || book.nombre;
      const author = book.author || book.autor;
      const year = book.year || book.año;
      const image = book.image || book.imagen;

      card.innerHTML = `
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
        <p><strong>Autor:</strong> ${author}</p>
        <p><strong>Año:</strong> ${year}</p>
      `;

      content.appendChild(card);
    });

  } catch (error) {
    content.innerHTML = "<p>Error al cargar libros</p>";
  } finally {
    showLoader(false);
  }
});

btnUsers.addEventListener("click", async () => {
  content.innerHTML = "";
  showLoader(true);

  try {
    const res = await fetch(`${API_URL}/users`);
    const users = await res.json();

    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "card";

      const books = user.coleccion || [];
      const wishlist = user.wishlist || [];

      card.innerHTML = `
        <h3>${user.nombre} ${user.apellidos}</h3>
        <p><strong>Email:</strong> ${user.correo}</p>

        <p><strong>Colección:</strong></p>
        <ul>
          ${books.map(book => `<li>${book}</li>`).join("")}
        </ul>

        <p><strong>Wishlist:</strong></p>
        <ul>
          ${wishlist.map(book => `<li>${book}</li>`).join("")}
        </ul>
      `;

      content.appendChild(card);
    });

  } catch (error) {
    content.innerHTML = "<p>Error al cargar usuarios</p>";
  } finally {
    showLoader(false);
  }
});
