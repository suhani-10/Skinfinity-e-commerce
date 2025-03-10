document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let listItem = document.createElement("li");
            listItem.classList.add("cart-item");
            listItem.innerHTML = `
                ${item.name} - ₹${item.price}
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(listItem);
            total += item.price;
        });

        cartTotal.innerText = total;

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                let itemIndex = this.getAttribute("data-index");
                cart.splice(itemIndex, 1);
                updateCart();
            });
        });
    }

    document.querySelectorAll(".serum .add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.parentElement;
            let name = product.getAttribute("data-name");
            let price = parseInt(product.getAttribute("data-price"));

            cart.push({ name, price });
            updateCart();
        });
    });
});
