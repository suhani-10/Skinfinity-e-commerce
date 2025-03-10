document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const productGrid = document.querySelector(".product-grid");

    // Sample Product Data
    const products = {
        sunscreen: [
            { img: "sunscreen1.webp", name: "Vitamin C + E Sunscreen SPF 50+", price: "Rs. 1,200", rating: "4.8 ⭐" },
            { img: "sunscreen2.webp", name: "Strawberry Dew Tinted Sunscreen SPF 50+", price: "Rs. 1,400", rating: "4.7 ⭐" }
        ],
        moisturizer: [
            { img: "moisturizer1.webp", name: "Hydrating Water Gel Moisturizer", price: "Rs. 1,500", rating: "4.9 ⭐" },
            { img: "moisturizer2.webp", name: "Nourishing Night Repair Cream", price: "Rs. 1,800", rating: "4.6 ⭐" }
        ],
        cleanser: [
            { img: "cleanser1.webp", name: "Gentle Foaming Face Cleanser", price: "Rs. 900", rating: "4.5 ⭐" },
            { img: "cleanser2.webp", name: "Deep Pore Detox Face Wash", price: "Rs. 1,100", rating: "4.7 ⭐" }
        ],
        serum: [
            { img: "serum1.webp", name: "Brightening Vitamin C Serum", price: "Rs. 2,200", rating: "4.9 ⭐" },
            { img: "serum2.webp", name: "Hydrating Hyaluronic Acid Serum", price: "Rs. 2,000", rating: "4.8 ⭐" }
        ]
    };

    // Function to Load Products Based on Selected Category
    function loadProducts(category) {
        productGrid.innerHTML = ""; // Clear existing products
        products[category].forEach(product => {
            const productHTML = `
                <div class="product-item">
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <p class="rating">${product.rating}</p>
                    <a href="#" class="shop-btn">Shop Now</a>
                </div>
            `;
            productGrid.innerHTML += productHTML;
        });
    }

    // Initial Load (Default: Sunscreens)
    loadProducts("sunscreen");

    // Add Click Event to Category Buttons
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            categoryButtons.forEach(btn => btn.classList.remove("active")); // Remove active from all
            this.classList.add("active"); // Add active to clicked button
            loadProducts(this.dataset.category);
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const productGrid = document.querySelector(".product-grid");

    // Sample Product Data
    const products = {
        sunscreen: [
            { img: "vit c-e.webp", name: "Vitamin C + E Sunscreen SPF 50+ PA++++", price: "Rs. 595", rating: "4.8 ⭐" },
            { img: "strawberry.webp", name: "Strawberry Dew Tinted Sunscreen SPF 50+ PA++++", price: "Rs. 549", rating: "4.7 ⭐" },
            { img: "watermelon sun.webp", name: "Watermelon Cooling Hyaluronic Acid Sunscreen Spf 50+ PA++++", price: "Rs. 595", rating: "4.8 ⭐" },
            { img: "blue repair.webp", name: "Barrier Repair Hydrating Sunscreen SPF 50+ PA++++", price: "Rs. 595", rating: "4.7 ⭐" }
        ],
        moisturizer: [
            { img: "hydrating water.webp", name: "Hydrating Water Gel Moisturizer", price: "Rs. 1,500", rating: "4.9 ⭐" },
            { img: "moisturizer2.webp", name: "Vitamin C+E Moisturizer For Glowing Skin", price: "Rs. 1,800", rating: "4.6 ⭐" },
            { img: "moisturizer3.webp", name: "Retinol + Ceramide Night Cream For Fine Lines & Wrinkles ", price: "Rs. 1,500", rating: "4.9 ⭐" },
            { img: "moisturizer4.webp", name: "Niacinamide & Cica Oil Free Moisturizer", price: "Rs. 1,800", rating: "4.6 ⭐" }
        ],
        cleanser: [
            { img: "cleanser1.webp", name: "Barrier Repair Gentle Hydrating Face Wash", price: "Rs. 900", rating: "4.5 ⭐" },
            { img: "cleanser2.webp", name: "Vitamin C + E Gel Face Wash For Glowing Skin", price: "Rs. 1,100", rating: "4.7 ⭐" },
            { img: "cleanser3.webp", name: "Cica + Salycilic Acid Gel Face Wash For Oily Skin", price: "Rs. 900", rating: "4.5 ⭐" },
            { img: "cleanser4.webp", name: "Watermelon + Vitamin C Gel Face Wash For Glowing Skin", price: "Rs. 1,100", rating: "4.7 ⭐" }
        ],
        serum: [
            { img: "serum1.webp", name: "Brightening Vitamin C Serum", price: "Rs. 2,200", rating: "4.9 ⭐" },
            { img: "serum2.webp", name: "Hydrating Hyaluronic Acid Serum", price: "Rs. 2,000", rating: "4.8 ⭐" },
            { img: "serum3.webp", name: "Niacinamide Serum", price: "Rs. 2,200", rating: "4.9 ⭐" },
            { img: "serum4.webp", name: "Cica Serum for Glowing Skin", price: "Rs. 2,000", rating: "4.8 ⭐" }
        ]
    };

    // Function to Load Products Based on Selected Category
    function loadProducts(category) {
        productGrid.innerHTML = ""; // Clear existing products
        products[category].forEach(product => {
            const productHTML = `
                <div class="product-item">
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <p class="rating">${product.rating}</p>
                    <a href="#" class="shop-btn">Shop Now</a>
                </div>
            `;
            productGrid.innerHTML += productHTML;
        });
    }

    // Initial Load (Default: Sunscreens)
    loadProducts("sunscreen");

    // Add Click Event to Category Buttons
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            categoryButtons.forEach(btn => btn.classList.remove("active")); // Remove active from all
            this.classList.add("active"); // Add active to clicked button
            loadProducts(this.dataset.category);
        });
    });
});
