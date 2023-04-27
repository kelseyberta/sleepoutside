export default class ProductList {
    constructor(category, dataSource, listElement) {
      
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData();
        // render the list
        this.renderList(list);
      }
      renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
}
}




function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=">
        <img src="" alt="Image of ">
        <h3 class="card__brand"></h3>
        <h2 class="card__name"></h2>
        <p class="product-card__price">$</p>
      </a>
    </li>`
  }