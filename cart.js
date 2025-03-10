// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElements = document.querySelectorAll('#cart-count');

// Check if this is user's first order
const isFirstOrder = !localStorage.getItem('hasOrdered');

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCartUI();

    // Show first order discount banner if applicable
    if (isFirstOrder) {
        showFirstOrderBanner();
    }

    // Add to cart buttons - using both .btn-primary and .add-to-cart for compatibility
    document.querySelectorAll('.btn-primary, .add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.card');
            if (!card) {
                console.error('Product card not found');
                return;
            }

            const titleElement = card.querySelector('.card-title');
            const priceElement = card.querySelector('.price');
            const imageElement = card.querySelector('img');

            if (!titleElement || !priceElement || !imageElement) {
                console.error('Required product elements not found');
                return;
            }

            const product = {
                id: card.dataset.productId || `product_${Date.now()}`,
                name: titleElement.textContent.trim(),
                price: parseFloat(priceElement.textContent.replace('₹', '').trim()),
                image: imageElement.src,
                quantity: 1
            };

            if (!product.name || isNaN(product.price)) {
                console.error('Invalid product data');
                return;
            }

            addToCart(product);
            
            // Show success message
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.disabled = false;
            }, 2000);

            // Show a popup notification
            showNotification(`${product.name} added to cart!`);
        });
    });

    // Cart page specific functionality
    if (window.location.pathname.includes('cart.html')) {
        updateCartPage();
        
        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-btn')) {
                    const index = parseInt(e.target.dataset.index);
                    removeFromCart(index);
                } else if (e.target.classList.contains('plus')) {
                    const index = parseInt(e.target.dataset.index);
                    updateQuantity(index, 1);
                } else if (e.target.classList.contains('minus')) {
                    const index = parseInt(e.target.dataset.index);
                    updateQuantity(index, -1);
                }
            });
        }

        // Clear cart functionality
        const clearCartBtn = document.getElementById('clear-cart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear your cart?')) {
                    cart = [];
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartUI();
                    updateCartPage();
                }
            });
        }
    }
});

function showFirstOrderBanner() {
    const banner = document.createElement('div');
    banner.className = 'first-order-banner';
    banner.innerHTML = `
        <div class="offer-content">
            <h3>🎉 Special Offer for New Customers! 🎉</h3>
            <p>Get 10% off on your first order!</p>
        </div>
    `;
    banner.style.cssText = `
        background-color: #BA867B;
        color: white;
        text-align: center;
        padding: 10px;
        position: relative;
        z-index: 1000;
    `;
    document.body.insertBefore(banner, document.body.firstChild);
}

// Show notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    // Add styles to notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Add to document
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.5s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2500);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(element => {
        if (element) {
            element.textContent = totalItems;
        }
    });
}

function updateCartUI() {
    updateCartCount();
    
    // Update cart page if we're on it
    if (document.getElementById('cart-items')) {
        updateCartPage();
    }
}

function updateCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartContent = document.getElementById('cart-content');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        if (cartContent) cartContent.style.display = 'none';
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        return;
    }

    if (cartContent) cartContent.style.display = 'block';
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const listItem = document.createElement('div');
        listItem.classList.add('cart-item');
        listItem.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p class="price">₹${item.price}</p>
                </div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
            <div class="item-total">
                ₹${itemTotal.toFixed(2)}
            </div>
            <button class="remove-btn" data-index="${index}">×</button>
        `;
        cartItemsContainer.appendChild(listItem);
    });

    // Apply first order discount if applicable
    let total = subtotal;
    const discountSection = document.createElement('div');
    discountSection.className = 'cart-summary-section';
    
    if (isFirstOrder && subtotal > 0) {
        const discount = subtotal * 0.1; // 10% discount
        total = subtotal - discount;
        
        discountSection.innerHTML = `
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row discount">
                <span>First Order Discount (10%):</span>
                <span>-₹${discount.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Final Total:</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
            <div class="cart-actions">
                <a href="home1.html" class="btn continue-shopping">Continue Shopping</a>
                <a href="checkout.html" class="btn checkout-btn">Proceed to Checkout</a>
            </div>
        `;
    } else {
        discountSection.innerHTML = `
            <div class="summary-row total">
                <span>Total:</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
            <div class="cart-actions">
                <a href="home1.html" class="btn continue-shopping">Continue Shopping</a>
                <a href="checkout.html" class="btn checkout-btn">Proceed to Checkout</a>
            </div>
        `;
    }

    // Insert discount section before the total
    const cartSummary = cartItemsContainer.closest('.cart-container').querySelector('.cart-summary');
    if (cartSummary) {
        cartSummary.innerHTML = '';
        cartSummary.appendChild(discountSection);
    }

    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }
}

// Function to handle order completion
function completeOrder() {
    if (cart.length > 0) {
        localStorage.setItem('hasOrdered', 'true');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        showNotification('Order placed successfully!');
    }
}
