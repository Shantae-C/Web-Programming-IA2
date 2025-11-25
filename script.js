
// IA#2 local storage*//
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/* IA#2 - Q2: DOM MANIPULATION*/
//* DOM update function: renders cart items in table. 
function renderCart() {
  const cartBody = document.getElementById('cartBody');
  if (!cartBody) return; 

  cartBody.innerHTML = ''; // clear current table rows

  cart.forEach((item, index) => {
    const row = document.createElement('tr');

   //Q2 DOM Update: Gives each row a remove button, image, name, price, quantity input and subtotal
    row.innerHTML = `
      <td><button onclick="removeItem(${index})">X</button></td>
      <td><img src="${item.img}" alt="${item.name}" width="50"></td>
      <td>${item.name}</td>
      <td>JMD ${item.price.toFixed(2)}</td>
      <td><input type="number" value="${item.qty}" min="1" onchange="changeQty(${index}, this.value)"></td>
      <td>JMD ${(item.price * item.qty).toFixed(2)}</td>
    `;

    cartBody.appendChild(row);
  });

  updateSummary();
}
 
/* IA#2 Q-#4 Basic logic/arithmetic calculation updateSummary() calculates subtotal, discount, tax and total*/
// Calculate subtotal, discount, tax, total
function updateSummary() {
  const subtotalEl = document.getElementById('subtotal');
  const discountEl = document.getElementById('discount');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');

  let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  let discount = subtotal * 0.20; // 20% discount 
  let tax = (subtotal - discount) * 0.15; // 15% tax
  let total = subtotal - discount + tax;

  /*IA#2 - DOM Manipulation (updating values on page)*/
  if(subtotalEl) subtotalEl.textContent = `JMD ${subtotal.toFixed(2)}`;
  if(discountEl) discountEl.textContent = `JMD ${discount.toFixed(2)}`;
  if(taxEl) taxEl.textContent = `JMD ${tax.toFixed(2)}`;
  if(totalEl) totalEl.textContent = `JMD ${total.toFixed(2)}`;
}

/*cart function*/

/*IA#2 addToCart(name, price, image) Adds product to cart*/
/*IA#2 Q-#3 mapping: event handling (click), data management*/
function addToCart(name, price, img) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }
  saveCart();
  renderCart();
  updateNavCartCount();
}

// IA#2 Q-#3 event handling (onclick remove button) removeItem(index) Remove item from cart
function removeItem(index) {
  if (confirm('Remove this item from cart?')) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateNavCartCount();
  }
}

//IA#2  Q-#3 changeQty(index, value) Change/update quantity
function changeQty(index, value) {
  const qty = parseInt(value);
  if (qty > 0) {
    cart[index].qty = qty;
  } else {
    cart[index].qty = 1; // prevent zero
  }
  saveCart();
  renderCart();
  updateNavCartCount();
}

//IA#2 clearCart() Clear all cart items
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  updateNavCartCount();
}

// IA#2 saveCart Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//IA#2 Q-#3 updateNavCartCount() updates the navbar cart link (Cart.html) to show total quantity

function updateNavCartCount() {
  const navCart = document.querySelector('#navbar li a[href="Cart.html"]');
  if(navCart) {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    navCart.textContent = `Cart (${count})`;
  }
}

/* Check out*/
// IA#2 renderCheckoutSummary() Fills checkout summary with the calculates values

function renderCheckoutSummary() {
  const subtotalC = document.getElementById('subtotalC');
  const discountC = document.getElementById('discountC');
  const taxC = document.getElementById('taxC');
  const totalC = document.getElementById('totalC');

  let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  let discount = subtotal * 0.05;
  let tax = (subtotal - discount) * 0.15;
  let total = subtotal - discount + tax;

  if(subtotalC) subtotalC.textContent = `JMD ${subtotal.toFixed(2)}`;
  if(discountC) discountC.textContent = `JMD ${discount.toFixed(2)}`;
  if(taxC) taxC.textContent = `JMD ${tax.toFixed(2)}`;
  if(totalC) totalC.textContent = `JMD ${total.toFixed(2)}`;
}

// IA#2 Q-#3 Form validation checkoutSumbit() Validate checkout form
function checkoutSubmit() {
  const name = document.getElementById('shipName').value.trim();
  const address = document.getElementById('shipAddress').value.trim();
  const city = document.getElementById('shipCity').value.trim();
  const phone = document.getElementById('shipPhone').value.trim();
  const email = document.getElementById('shipEmail').value.trim();
  const errors = [];

  // IA#2 - Validation Rules
  if(!name) errors.push('Full name is required.');
  if(!address) errors.push('Address is required.');
  if(!city) errors.push('City is required.');
  if(!phone || !/^\d+$/.test(phone)) errors.push('Valid phone is required.');
  if(!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) errors.push('Valid email is required.');

  const errorDiv = document.getElementById('shippingErrors');
  if(errors.length > 0) {
    errorDiv.innerHTML = errors.join('<br>');
    return;
  }

  alert('Thank you! Your order has been placed.');
  clearCart();
  window.location.href = 'index.html';
}

/*Login and registeration validation */
//IA#2 validateLoginForm() checks for non-empty username and password.
function validateLoginForm() {
  const username = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPass').value.trim();
  const errorDiv = document.getElementById('loginErrors');
  let errors = [];

  if(!username) errors.push('Username required');
  if(!password) errors.push('Password required');

  if(errors.length > 0) {
    errorDiv.innerHTML = errors.join('<br>');
    return false;
  }

  alert('Login successful!');
  window.location.href = 'index.html';
}

//IA#2 vaidateRegisterForm() valids registeration fields and shows message.
function validateRegisterForm() {
  const fullName = document.getElementById('fullName').value.trim();
  const dob = document.getElementById('dob').value;
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  let valid = true;

  // Clear previous errors
  document.getElementById('fullNameError').textContent = '';
  document.getElementById('dobError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('usernameError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('confirmPasswordError').textContent = '';

  if(!fullName) { document.getElementById('fullNameError').textContent = 'Full name required'; valid = false; }
  if(!dob) { document.getElementById('dobError').textContent = 'DOB required'; valid = false; }
  if(!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) { document.getElementById('emailError').textContent = 'Valid email required'; valid = false; }
  if(!username) { document.getElementById('usernameError').textContent = 'Username required'; valid = false; }
  if(!password) { document.getElementById('passwordError').textContent = 'Password required'; valid = false; }
  if(password !== confirmPassword) { document.getElementById('confirmPasswordError').textContent = 'Passwords do not match'; valid = false; }

  if(valid) {
    alert('Registration successful!');
    window.location.href = 'Login.html';
  }

  return valid;
}

/* IA#2 - Q3 Event Listeners */
/*Login form submit*/
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    validateLoginForm();
  });
}

/* Register form submit*/
const registerForm = document.getElementById('registerForm');
if(registerForm){
  registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    validateRegisterForm();
  });
}

/* add items to cart from icon */

document.addEventListener('DOMContentLoaded', () => {
  const addCartButtons = document.querySelectorAll('.pro i.fa-cart-shopping');

  addCartButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // get product info from DOM
      const productCard = btn.closest('.pro');
      const name = productCard.querySelector('h5').textContent;
      const priceText = productCard.querySelector('h4').textContent;
      const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
      const img = productCard.querySelector('img').src;

      addToCart(name, price, img);
      alert(`${name} added to cart!`);
    });
  });

});

