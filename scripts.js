const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');
  text.init(form, items);
});

const text = (() => {
  let items;
  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
    // TODO láta hluti í _items virka
    for (let item of document.querySelectorAll(".item")) {
    let text = item.querySelector(".item__text");
    text.addEventListener("click", edit);
    let button = item.querySelector(".item__button");
    button.addEventListener("click", deleteItem);
    let checkbox = item.querySelector(".item__checkbox");
    checkbox.addEventListener("click", finish)
  }
}
 
  function formHandler(e) {
    e.preventDefault();
    let input = e.target.querySelector(".form__input");
    if (input.value.trim().length > 0) {
      add(input.value.trim());
      console.log(input.value.trim());
    }
    console.log(e);
    input.value = " ";
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle("item--done");
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    let { target } = e;
    let { textContent, parentNode } = target;
    parentNode.removeChild(target);
    let input = el("input", "item__edit");
    input.setAttribute("type", "text");
    input.value = textContent;
    input.addEventListener("keyup", commit);
    let button = parentNode.querySelector(".item__button");
    parentNode.insertBefore(input, button);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    let { keyCode, target } = e;
    if (keyCode !== ENTER_KEYCODE) {
      return;
    }
    let { value, parentNode } = target;
    target.removeEventListener("keyup", commit);
    parentNode.removeChild(target);
    let text = el("span", "item__text", edit);
    text.appendChild(document.createTextNode(value));
    let button = parentNode.querySelector(".item__button");
    parentNode.insertBefore(text, button);
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    let item = el("li", "item");
    let checkbox = el("input", "item__checkbox", finish);
    checkbox.setAttribute("type", "checkbox");
    item.appendChild(checkbox);
    let text = el("span", "item__text", edit);
    text.appendChild(document.createTextNode(value));
    item.appendChild(text);
    let button = el("button", "item__button", deleteItem);
    button.appendChild(document.createTextNode("Eyða"));
    item.appendChild(button);
    items.appendChild(item);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    let parent = e.target.parentNode;
    parent.parentNode.removeChild(parent);
    let text = parent.querySelector(".item__text");
    text.removeEventListener("click", edit);
    let button = parent.querySelector(".item__button");
    button.removeEventListener("click", deleteItem);
    let checkbox = parent.querySelector(".item__checkbox");
    checkbox.removeEventListener("click", finish);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    let element = document.createElement(type);
    if (clickHandler) {
      element.addEventListener("click", clickHandler);
    }
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  return {
    init: init
  }
})();
