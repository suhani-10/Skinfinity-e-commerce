document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const shippingElement = document.getElementById('shipping');
    const placeOrderBtn = document.getElementById('place-order');
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('card-details');
    const upiDetails = document.getElementById('upi-details');

    // Display cart items in checkout
    function displayCheckoutItems() {
        checkoutItems.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('checkout-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">₹${item.price} × ${item.quantity}</p>
                </div>
            `;
            checkoutItems.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });

        // Update totals
        const shipping = 40;
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        shippingElement.textContent = `₹${shipping.toFixed(2)}`;
        totalElement.textContent = `₹${(subtotal + shipping).toFixed(2)}`;
    }

    // Handle payment method change
    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            if (method.value === 'card') {
                cardDetails.style.display = 'block';
                upiDetails.style.display = 'none';
            } else if (method.value === 'upi') {
                cardDetails.style.display = 'none';
                upiDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
                upiDetails.style.display = 'none';
            }
        });
    });

    // Form validation
    function validateForm() {
        const requiredFields = document.querySelectorAll('input[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ff4444';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });

        // Validate payment details based on selected method
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        if (selectedPayment === 'card') {
            const cardNumber = document.getElementById('card-number');
            const expiry = document.getElementById('expiry');
            const cvv = document.getElementById('cvv');

            if (!cardNumber.value || !expiry.value || !cvv.value) {
                isValid = false;
                [cardNumber, expiry, cvv].forEach(field => {
                    if (!field.value) field.style.borderColor = '#ff4444';
                });
            }
        } else if (selectedPayment === 'upi') {
            const upiId = document.getElementById('upi-id');
            if (!upiId.value) {
                isValid = false;
                upiId.style.borderColor = '#ff4444';
            }
        }

        return isValid;
    }

    // Handle order placement
    placeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        // Simulate order processing
        placeOrderBtn.disabled = true;
        placeOrderBtn.textContent = 'Processing...';

        setTimeout(() => {
            // Clear cart and redirect to success page
            localStorage.removeItem('cart');
            alert('Order placed successfully! Thank you for shopping with us.');
            window.location.href = 'index.html';
        }, 2000);
    });

    // Format card number input
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value.substring(0, 19); // Limit to 16 digits + 3 spaces
    });

    // Format expiry date input
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        e.target.value = value.substring(0, 5); // Limit to MM/YY format
    });

    // Format CVV input
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.substring(0, 3); // Limit to 3 digits
    });

    // Initialize checkout display
    displayCheckoutItems();
}); 