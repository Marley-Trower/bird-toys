let cartCount = 0;
let cartItems = [];

const cartModal = document.getElementById('cart-modal');
const cartList = document.getElementById('cart-items');
const cartToggle = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');

// Add to cart logic
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const itemCard = e.target.closest('.item-card');
    const name = itemCard.dataset.name;
    const price = parseFloat(itemCard.dataset.price);

    cartItems.push({ name, price });
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
  });
});

// Toggle cart modal
cartToggle.addEventListener('click', () => {
  const isHidden = cartModal.classList.contains('hidden');
  if (isHidden) {
    updateCartDisplay();
    cartModal.classList.remove('hidden');
  } else {
    cartModal.classList.add('hidden');
  }
});

// Close cart with button
closeCartBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Close when clicking outside the cart content
cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.add('hidden');
  }
});

// Render cart items
function updateCartDisplay() {
  cartList.innerHTML = "";

  if (cartItems.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartList.appendChild(li);
    });
  }
}

function updateCartDisplay() {
  cartList.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cartItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - $${item.price.toFixed(2)} 
        <button class="remove-item" data-index="${index}">Remove</button>`;
      cartList.appendChild(li);
      total += item.price;
    });
  }

  document.getElementById('cart-total').innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;

  // Add remove functionality
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      cartItems.splice(index, 1);
      cartCount--;
      document.getElementById('cart-count').textContent = cartCount;
      updateCartDisplay();
    });
  });
}