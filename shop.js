document.addEventListener("DOMContentLoaded", function () {
    let cartCount = 0;

    // Hamburger Menu Toggle
    document.querySelector(".hamburger").addEventListener("click", function () {
        document.querySelector(".nav-links").classList.toggle("show");
    });
});
