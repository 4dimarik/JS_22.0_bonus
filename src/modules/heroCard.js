import { animate } from "./helpers";

export default class HeroCard {
  constructor() {
    const template = document.getElementById("hero_card");
    if (template) this.init(template);
  }
  init(template) {
    const clone = template.content.cloneNode(true);
    this.card = clone.querySelector(".card");
    this.footer = this.card.querySelector("footer");
    this.specifications = this.card.querySelector(".specifications");
  }

  setBgImg(img) {
    this.card.style.backgroundImage = `url('${img}')`;
  }
  setName(name) {
    this.footer.textContent = name;
  }
  setSpecifications({ photo, movies, ...props }) {
    Object.keys(props)
      .sort()
      .forEach((prop) => {
        const tr = document.createElement("tr");
        const propValue = prop !== "movies" ? props[prop] : ""; //this.createMoviesList(this.props[prop]);
        tr.innerHTML = `<th>${prop
          .replace(/[A-Z]{1}/, (char) => ` ${char.toLowerCase()}`)
          .replace(/^[a-zA-Z]{1}/, (char) =>
            char.toUpperCase()
          )}</th><td>${propValue}</td>`;
        this.specifications.append(tr);
      });
    if (movies) this.specifications.append(this.createMoviesList(movies));
  }

  createMoviesList(list) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    tr.innerHTML = "<th>Movies</th>";
    list.forEach((item) => {
      td.insertAdjacentHTML("beforeend", `<p class="badge">${item}</p>`);
    });
    tr.append(td);
    return tr;
  }

  blockInfoAnimate(cardInfo, show) {
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
