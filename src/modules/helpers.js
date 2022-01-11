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
  constructor({
    tag = "div",
    dataset = null,
    style = null,
    attrs = null,
    ...props
  }) {
    this._element = document.createElement(tag);
    this.setProps(props);
    if (dataset) {
      this.setDataset(dataset);
    }
    if (style) {
      this.setStyle(style);
    }
    if (attrs) {
      this.setAttrs(attrs);
    }
  }

  setProps(props) {
    if (Object.keys(props).length !== 0) {
      Object.keys(props).forEach((prop) => {
        this.element[prop] = props[prop];
      });
    }
  }
  setDataset(dataset) {
    Object.keys(dataset).forEach(
      (key) => (this.element.dataset[`${key}`] = dataset[`${key}`])
    );
  }
  setStyle(style) {
    Object.keys(style).forEach(
      (key) => (this.element.style[`${key}`] = style[`${key}`])
    );
  }
  setAttrs(attrs) {
    Object.keys(attrs).forEach((key) =>
      this.element.setAttribute(key, attrs[key])
    );
  }

  get element() {
    return this._element;
  }
}

export const numeralsWithNouns = (num, nouns) => {
  if (num === 1 || (num > 20 && +String(num)[1] === 1)) {
    return nouns[0];
  } else if (
    (num > 1 && num < 5) ||
    (num > 21 && +String(num)[1] > 1 && +String(num)[1] < 5)
  ) {
    return nouns[1];
  } else if (
    num === 0 ||
    (num > 4 && num < 21) ||
    (num > 21 && +String(num)[1] > 4) ||
    +String(num)[1] === 0
  ) {
    return nouns[2];
  }
};
