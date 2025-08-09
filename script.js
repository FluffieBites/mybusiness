let cart = [];

document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', () => {
        let name = button.dataset.name;
        let price = parseFloat(button.dataset.price);
        let qty = parseInt(button.previousElementSibling.value);

        let existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ name, price, qty });
        }

        updateCartCount();
        alert(`${qty} x ${name} added to cart`);
    });
});

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

// Show checkout when cart icon clicked
document.getElementById('cart-icon').addEventListener('click', () => {
    let checkoutSection = document.getElementById('checkout-section');
    let details = document.getElementById('checkout-details');

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    details.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        details.innerHTML += `<p>${item.qty} x ${item.name} - RM ${(item.price * item.qty).toFixed(2)}</p>`;
        total += item.price * item.qty;
    });
    details.innerHTML += `<h3>Total: RM ${total.toFixed(2)}</h3>`;

    checkoutSection.style.display = 'block';
});

// Confirm order
document.getElementById('confirm-order').addEventListener('click', () => {
    let delivery = document.querySelector('input[name="delivery"]:checked').value;
    alert(`Order confirmed!\nDelivery method: ${delivery}\nThank you for your purchase!`);
    cart = [];
    updateCartCount();
    document.getElementById('checkout-section').style.display = 'none';
});
