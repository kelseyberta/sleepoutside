import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";
import { listingCrumb } from "./Breadcrumb.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

listingCrumb(category);
