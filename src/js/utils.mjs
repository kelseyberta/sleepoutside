// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderWithTemplate(template, parentElement, data, position = "afterbegin", callback) {
  parentElement.insertAdjacentHTML(position, template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text();
  return template;

}

export async function loadHeaderFooter() {
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerTemplate = await loadTemplate("../partials/header.html");
  const header = document.querySelector("#dynamic-header");
  const footer = document.querySelector("#dynamic-footer");

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
}

export function getParams(param) {
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get(param);
return product;

}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  alert.addEventListener('click', function(e) {
      if(e.target.tagName == "SPAN") {
        main.removeChild(this);
      }
  })
  const main = document.querySelector('main');
  main.prepend(alert);
  if(scroll)
    window.scrollTo(0,0);
}