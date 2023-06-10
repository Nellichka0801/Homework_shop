import { products } from "./json.js";

const productsData = JSON.parse(products);
const productsBox = document.querySelector(".products__content");
const cartBox = document.querySelector(".cart");
const cartCount = document.querySelectorAll(".cartProduct");
const cartVisibility = document.querySelector(".cart");
const cartSizeIndicator = document.querySelector(".header__buy_indicator");

cartVisibility.style.display = "none";
cartSizeIndicator.style.display = "none";

productsData.forEach(({ id, img, name, text, price }) => {
  const productItem = `
    <div class="product" id="${id}">
      <img class="product-img" src="${img}" alt="product ${id} picture">
      <div class="product-content">
        <a href="#" class="product-heading">${name} ${id}</a>
        <p class="product-text">${text}</p>
        <p class="product-price">${price}</p>
      </div>
      <div class="product-add">
        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- SVG paths -->
        </svg>
        Add to Cart
      </div>
    </div>
  `;
  productsBox.insertAdjacentHTML("beforeend", productItem);
});

const addButtons = document.querySelectorAll(".product-add");

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const prod = button.closest(".product");
    const prodId = prod.id;
    productsData.forEach(({ id, img, name, price, size, color }) => {
      if (prodId == id) {
        const cartItem = `
          <div class="cartProduct">
            <button class="btn_del" type="button"></button>
            <div class="cartProduct_content">
              <img class="cartProduct_img" src="${img}" alt="product in cart">
              <div class="cartProduct_desc">
                <h2 class="cartProduct_name">${name}</h2>
                <p class="cartProduct_label">Price: <span class="cartProduct_price">${price}</span></p>
                <p class="cartProduct_color">Color: ${color}</p>
                <p class="cartProduct_size">Size: ${size}</p>
                <div class="cartProduct_qty">
                  <label class="input_label">Quantity:</label>
                  <input type="text" class="input_quantity">
                </div>
              </div>
            </div>
          </div>
        `;
        cartBox.insertAdjacentHTML("beforeend", cartItem);
        cartVisibility.style.display = "flex";
        cartSizeIndicator.style.display = "flex";
        cartSizeIndicator.textContent = cartCount.length + 1;
      }
    });
  });
});

cartBox.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn_del")) {
    const delprod = event.target.closest(".cartProduct");
    delprod.remove();
    const newCartCount = document.querySelectorAll(".cartProduct");
    cartSizeIndicator.textContent = newCartCount.length;
    if (newCartCount.length === 0) {
      cartVisibility.style.display = "none";
      cartSizeIndicator.style.display = "none";
    }
  }
});