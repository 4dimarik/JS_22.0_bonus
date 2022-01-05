import { animate, DomElement } from "./helpers";

export default class Card {
  static cardInfoBottom = "-90";

  constructor({
    photo,
    ...props
    // actors,
    // birthDay,
    // deathDay,
    // gender,
    // movies,
    // name,
    // species,
    // status,
  }) {
    this.photo = photo;
    this.props = props;
    Object.keys(props).forEach((prop) => {
      this[prop] = props[prop];
    });
    // this.actors = actors;
    // this.birthDay = birthDay;
    // this.deathDay = deathDay;
    // this.gender = gender;
    // this.movies = movies;
    // this.name = name;
    //
    // this.species = species;
    // this.status = status;

    this.create();
  }
  create() {
    const cardInfo = new DomElement({
      className: "card__info",
      style: { bottom: Card.cardInfoBottom + "%" },
      dataset: { animateOn: false },
    }).element;
    const cardInfoHeader = new DomElement({
      tag: "h4",
      className: "card__info__header",
      textContent: `${this.name}`,
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

    this.block = new DomElement({ className: "card" }).element;
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
    const cardInfoBottom = Card.cardInfoBottom;
    cardInfo.dataset.animateOn = true;

    const animateValue = show
      ? (progress) => `${cardInfoBottom - progress * cardInfoBottom}%`
      : (progress) => `${Math.abs(progress) * cardInfoBottom}%`;
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
      duration: 300,
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
