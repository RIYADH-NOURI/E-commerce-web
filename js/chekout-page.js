document.addEventListener('DOMContentLoaded', async function() {
    const orderSummary = document.getElementById('order-summary');
    const orderDetailsInput = document.getElementById('orderDetails');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let summaryHTML = '<h2>Order Summary</h2>';
    let orderDetails = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        summaryHTML += `
            <p>${item.name} x ${item.quantity}: $${itemTotal.toFixed(2)}</p>
        `;
        orderDetails += `${item.name} x ${item.quantity}: $${itemTotal.toFixed(2)}\n`;
    });

    summaryHTML += `<strong>Total: $${total.toFixed(2)}</strong>`;
    orderSummary.innerHTML = summaryHTML;
    orderDetails += `Total: $${total.toFixed(2)}`;
    orderDetailsInput.value = orderDetails;

    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const response = await fetch(checkoutForm.action, {
                method: 'POST',
                body: new FormData(checkoutForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (data.ok) {
                alert('Order placed successfully! We will contact you for payment details.');
                localStorage.removeItem('cart');
                window.location.href = 'index.html';
            } else {
                alert('There was an error placing your order. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error placing your order. Please try again.');
        }
    });
});
