document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderDetails = document.getElementById("orderDetails");
    let total = 0;

    if (cart.length === 0) {
        orderDetails.innerHTML = "<p class='text-gray-500'>No hay productos en el carrito.</p>";
    } else {
        cart.forEach(book => {
            total += book.price;
            orderDetails.innerHTML += `
                <div class="border-b py-2">
                    <p class="font-semibold">${book.title}</p>
                    <p class="text-sm text-gray-500">$${(book.price / 100).toFixed(2)}</p>
                </div>
            `;
        });
    }

    document.getElementById("totalPrice").textContent = (total / 100).toFixed(2);
});
