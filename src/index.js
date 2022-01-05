"use strict";

import Card from "./modules/card";
import MovieFilter from "./modules/movieFilter";
import Storage from "./modules/storage";

const url = "/dbHeroes.json";
const cards = document.querySelector(".cards");

const storageData = new Storage("heroes");
const storageMovies = new Storage("movies");

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

const renderCards = (filter = null) => {
  if (storageData.isExist()) {
    cards.innerHTML = "";
    const data = filter
      ? storageData.get().filter((item) => {
          console.log(item[filter.key]);
          return Array.isArray(item[filter.key])
            ? item[filter.key].includes(filter.value)
            : item[filter.key] === filter.value;
        })
      : storageData.get();
    data.forEach((item) => {
      const card = new Card({ ...item });
      cards.append(card.block);
    });
  }
};

getData({ url }).then((data) => {
  if (data) {
    let movies = data.reduce(
      (movies, hero) => (hero.movies ? [...movies, ...hero.movies] : movies),
      []
    );
    storageMovies.set([...new Set(movies)]);
    storageData.set(data);
    renderCards();

    const filter = new MovieFilter(storageMovies.get());
    filter.block.addEventListener("input", (e) => {
      console.log(e.target.value);
      renderCards({ key: "movies", value: e.target.value });
    });
  }
});

cards.addEventListener(
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

cards.addEventListener(
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
