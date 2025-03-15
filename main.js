document.addEventListener("DOMContentLoaded", function () {
    let books = [];
    let cart = [];

    async function loadBooks() {
        try {
            const response = await fetch("./objects.json");
            const data = await response.json();
            books = data.books;
            renderBooks();
        } catch (error) {
            console.error("Error cargando libros:", error);
        }
    }

    function renderBooks(searchTerm = "") {
        const container = document.getElementById("booksContainer");
        container.innerHTML = "";
        books
            .filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .forEach(book => {
                const bookElement = document.createElement("div");
                bookElement.classList.add("bg-white", "rounded-lg", "shadow-lg", "hover:shadow-xl", "transition-shadow", "p-4");

                bookElement.innerHTML = `
                    <img src="${book.cover}" alt="${book.title}" class="w-full h-64 object-cover rounded-t-lg">
                    <h3 class="font-semibold text-lg text-gray-800 mt-2">${book.title}</h3>
                    <p class="text-gray-600">${book.author}</p>
                    <p class="mt-2 text-green-600 font-bold">$${(book.price / 100).toFixed(2)}</p>
                    <button onclick="addToCart(${book.id})" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Añadir al carrito
                    </button>
                `;

                container.appendChild(bookElement);
            });
    }

    window.addToCart = function (bookId) {
        const book = books.find(b => b.id === bookId);
        if (book) {
            cart.push(book);
            updateCartSidebar();
        }
    };

    function updateCartSidebar() {
        const cartContainer = document.getElementById("cartItems");
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = `<p class="text-gray-500">Tu carrito está vacío.</p>`;
        } else {
            cart.forEach((book, index) => {
                const item = document.createElement("div");
                item.classList.add("flex", "items-center", "justify-between", "border-b", "pb-2");

                item.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <img src="${book.cover}" class="w-12 h-16 rounded-md">
                        <div>
                            <p class="font-semibold">${book.title}</p>
                            <p class="text-sm text-gray-500">$${(book.price / 100).toFixed(2)}</p>
                        </div>
                    </div>
                    <button class="text-red-500 hover:text-red-700" onclick="removeFromCart(${index})">×</button>
                `;

                cartContainer.appendChild(item);
            });
        }

        document.getElementById("cartCount").textContent = cart.length;
    }

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCartSidebar();
    };

    const cartSidebar = document.getElementById("cartSidebar");

    document.getElementById("cartBtn").addEventListener("click", () => {
        cartSidebar.classList.remove("translate-x-full");
    });

    document.getElementById("closeCartBtn").addEventListener("click", () => {
        cartSidebar.classList.add("translate-x-full");
    });

    document.getElementById("searchBar").addEventListener("input", (e) => {
        renderBooks(e.target.value);
    });

    loadBooks();

    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Tu carrito está vacío. Agrega productos antes de continuar.");
                return;
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            window.location.href = "checkout.html";
        });
    }
});
