
let cartCount = 0;

const cartDisplay = document.getElementById("cart-count");
const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productName = button.dataset.product;

        cartCount++;

        cartDisplay.textContent = cartCount;

        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = "Add to Cart";
        }, 1000);

        console.log(`${productName} added to cart`);
    });
});
