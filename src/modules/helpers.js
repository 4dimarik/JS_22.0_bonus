"use strict";

export function animate({
  timing,
  draw,
  duration,
  completed = function () {},
}) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    } else {
      completed();
    }
  });
}

export class DomElement {
  constructor({ tag = "div", ...attrs }) {
    this._element = document.createElement(tag);
    this.setAttr(attrs);
  }

  setAttr(attrs) {
    if (Object.keys(attrs).length !== 0) {
      Object.keys(attrs).forEach((attr) => {
        if (attr === "dataset" || attr === "style") {
          Object.keys(attrs[attr]).forEach(
            (key) => (this.element[attr][`${key}`] = attrs[attr][`${key}`])
          );
        } else {
          this.element[attr] = attrs[attr];
        }
      });
    }
  }

  get element() {
    return this._element;
  }
}
