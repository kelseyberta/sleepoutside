import ProductData from "./ProductData.mjs";
const dataSource = new ProductData();

export async function listingCrumb(category) {
    let list = await dataSource.getData(category);
    // localStorage.setItem("numItems", list.length);
    // var numItems = localStorage.getItem("numItems");
    var numItems = list.length;
    let first = category.charAt(0);
    let rest = category.substring(1);
    let capsCategory = `${first.toUpperCase()}${rest}`;
    localStorage.setItem("category", capsCategory);
    const element = document.querySelector(".breadcrumb");
    element.textContent = `${capsCategory} -> (${numItems} items)`;
}

export function productCrumb() {
    const element = document.querySelector(".breadcrumb");
    let category = localStorage.getItem("category");
    element.textContent = category;
}