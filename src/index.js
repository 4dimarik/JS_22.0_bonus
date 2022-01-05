"use strict";

import Card from "./modules/card";

const url = "/dbHeroes.json";
const container = document.querySelector(".cards");

const getData = ({ url }) => {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    })
    .catch((response) => {
      const errorMessage =
        `status: ${response.status}` +
        `${response.statusText ? ", statusText:" + response.statusText : ""}`;
      console.error(errorMessage);
      return response.ok;
    });
};

getData({ url }).then((heroesData) => {
  if (heroesData) {
    console.log(heroesData);
    heroesData.forEach((hero) => {
      const card = new Card({ ...hero });
      container.append(card.block);
    });
  }
});

container.addEventListener(
  "mouseenter",
  (e) => {
    const { target } = e;
    const cardInfo = target.closest(".card__info");

    if (target.matches(".card__info")) {
      if (cardInfo.dataset.animateOn === "false") {
        Card.blockInfoAnimate(cardInfo, true);
      }
    }
  },
  true
);

container.addEventListener(
  "mouseleave",
  (e) => {
    const { target } = e;
    const cardInfo = target.querySelector(".card__info.active");

    if (cardInfo) {
      if (cardInfo.dataset.animateOn === "false") {
        Card.blockInfoAnimate(cardInfo, false);
      }
    }
  },
  true
);
