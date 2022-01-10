import { animate, DomElement } from "./helpers";

export default class Card__ {
  static cardInfoBottom = "41";
  static animateDuration = 200;

  constructor({ photo, ...props }) {
    this.photo = photo;
    this.props = props;

    Object.keys(props).forEach((prop) => {
      this[prop] = props[prop];
    });

    this.create();
  }
  create() {
    const cardInfo = new DomElement({
      className: "card__info",
      style: { bottom: Card__.cardInfoBottom + "px" },
      dataset: { animateOn: false },
    }).element;
    const cardInfoHeader = new DomElement({
      tag: "h4",
      className: "card__info__header",
      innerHTML: `<span>${this.name}</span><i class="fa-solid fa-circle-info"></i>`,
    }).element;

    const cardList = new DomElement({ tag: "table" }).element;
    Object.keys(this.props).forEach((prop) => {
      const cardListItem = new DomElement({ tag: "tr" }).element;
      const propValue =
        prop !== "movies"
          ? this.props[prop]
          : this.createMoviesList(this.props[prop]);
      cardListItem.innerHTML = `<td class="card__list-heading">${prop
        .replace(/[A-Z]{1}/, (char) => ` ${char.toLowerCase()}`)
        .replace(/^[a-zA-Z]{1}/, (char) =>
          char.toUpperCase()
        )}</td><td>${propValue}</td>`;
      cardList.append(cardListItem);
    });

    cardInfo.append(cardInfoHeader, cardList);

    this.block = new DomElement({ className: "card card-hero" }).element;
    this.block.style.backgroundImage = `url('${this.photo}')`;

    this.block.append(cardInfo);
  }
  createMoviesList(list) {
    let listHTML = "";
    list.forEach((item) => {
      listHTML += `<p class="badge">${item}</p>`;
    });
    return listHTML;
  }
  static blockInfoAnimate(cardInfo, show) {
    const cardInfoBottom = Card__.cardInfoBottom;
    cardInfo.dataset.animateOn = true;

    const animateValue = show
      ? (progress) => `${cardInfoBottom - progress * cardInfoBottom}px`
      : (progress) => `${Math.abs(progress) * cardInfoBottom}px`;
    const animateCompleted = show
      ? () => {
          cardInfo.classList.add("active");
          cardInfo.dataset.animateOn = false;
        }
      : () => {
          cardInfo.classList.remove("active");
          cardInfo.dataset.animateOn = false;
        };

    animate({
      duration: Card__.animateDuration,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        cardInfo.style.bottom = animateValue(progress);
      },
      completed: animateCompleted,
    });
  }
}