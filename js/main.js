"use strict"
document.onkeydown = function (evt) {
  if (evt.key === 'Enter') {
    window.location = "https://t.me/drukary_bot?start=update"
  }
};

class Accordion {
  #items = []

  constructor() {
    Array.from(document.getElementById('accordion-container').children).forEach((item, idx) => {
      item.dataset.idx = idx.toString();
      item.firstElementChild.addEventListener("click", this.#clickHandler.bind(this))
      this.#items.push({ item, opened: !idx })
      if (!idx) item.children[1].style["max-height"] = (item.children[1].scrollHeight + 20) + 'px';
      if (!idx) item.children[0].children[1].style.transform = "rotate(90deg)"
    })
  }

  #clickHandler(event) {
    const targetIdx = event.currentTarget.parentElement.dataset.idx;
    this.#items.forEach((item, idx) => {
      if (idx == targetIdx && !item.opened) {
        item.item.children[1].style["max-height"] = (item.item.children[1].scrollHeight + 20) + 'px';
        item.item.children[0].children[1].style.transform = "rotate(90deg)"
        item.opened = true
      } else {
        item.item.children[1].style["max-height"] = '0'
        item.item.children[0].children[1].style.transform = "rotate(0deg)"
        item.opened = false
      }
    })
  }
}

new Accordion()


function callback(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    entry.target.classList.add('visible')
    observer.unobserve(entry.target)
  })
}

document.querySelectorAll('[data-anim]').forEach(elem => {
  let options = {
    rootMargin: '0px',
    threshold: 0.25
  }

  const observer = new IntersectionObserver(callback, options)
  observer.observe(elem)
})
