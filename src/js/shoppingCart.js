displayCartTotal(e) {
    let t = document.querySelector(".cart-footer");
    e.length > 0 ? (t.classList.remove("hide"),
    t.firstChild.innerHTML = "Total:",
    t.firstChild.innerHTML = `${t.firstChild.innerHTML} $${this.getCartTotal(e)}`) : t.classList.add("hide")
}