export function displayCounter() {
    let totalQty = localStorage.length;
    const element = document.querySelector("#cart-count");
    element.innerHTML = totalQty;
}
