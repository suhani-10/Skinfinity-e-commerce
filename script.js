document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        document.getElementById("cart-count").innerText = cart.length;
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.parentElement;
            let name = product.getAttribute("data-name");
            let price = parseInt(product.getAttribute("data-price"));

            let productObj = { name, price };

            cart.push(productObj);
            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            alert(name + " added to cart!");

            // Redirect to cart.html (Optional)
            window.location.href = "cart.html";
        });
    });

    updateCartCount();
});
