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

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlItems = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlItems.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export function replaceElement(templateFn, parentElement, data) {
  const element = document.querySelector(parentElement);
  element.replaceChildren();
  renderTemplate(templateFn, parentElement, data);
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const footer = document.querySelector("footer");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const header = document.querySelector("header");
  const headerTemplate = await loadTemplate("../partials/header.html");
  renderWithTemplate(footerTemplate, footer);
  renderWithTemplate(headerTemplate, header);

  cartCount();
}

export function getParams(param) {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}

export function renderTemplate(
  templateFn,
  parentElement,
  object,
  position = "afterbegin",
) {
  const element = document.querySelector(parentElement);
  element.insertAdjacentHTML(position, templateFn(object));
}

export function cartCount() {
  let cartItems = getLocalStorage("so-cart");
  let cartCount = document.getElementById("cart-count");
  if (cartItems.length != 0) {
    cartCount.innerHTML = cartItems.length;
    cartCount.classList.remove("hidden");
  }
  else {
    cartCount.classList.add("hidden");
  }
}

export function alertMessage(message, scroll=true){
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  alert.addEventListener('click', function(e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}