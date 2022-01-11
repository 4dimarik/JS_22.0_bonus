"use strict";

import "@fortawesome/fontawesome-free/css/all.min.css";

import FilterMovie from "./modules/filter_movie";
import Storage from "./modules/storage";
import { animate } from "./modules/helpers";
import renderCards from "./modules/renderCards";

const url = "/dbHeroes.json";
const cards = document.querySelector(".cards");

const storageData = new Storage("heroes");
const storageMovies = new Storage("movies");
const storageFilter = new Storage("filter");

const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return { status: "ok", heroList: await response.json() };
    } else {
      const errorMessage =
        `status: ${response.status}` +
        `${response.statusText ? ", statusText:" + response.statusText : ""}`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
    return { status: false };
  }
};

const render = () => {
  const filterData = storageFilter.isExist() ? storageFilter.get() : false;
  renderCards(cards, storageData.get(), filterData);
  const filter = new FilterMovie(storageMovies.get(), filterData);
  filter.block.addEventListener("input", (e) => {
    const { name: key, value } = e.target;
    const filterData = { key, value };
    storageFilter.set(filterData);
    renderCards(cards, storageData.get(), filterData);
  });
};

if (!storageData.isExist() || !storageMovies.isExist()) {
  (async function loadHeroList() {
    const { status, heroList } = await getData(url);
    if (status) {
      storageData.set(heroList);

      let movies = heroList.reduce(
        (movies, hero) => (hero.movies ? [...movies, ...hero.movies] : movies),
        []
      );
      storageMovies.set([...new Set(movies)]);
      render();
    }
  })();
} else {
  render();
}

cards.addEventListener("click", (e) => {
  e.preventDefault();
  const { target } = e;
  if (target.closest(".info-link")) {
    const infoBlock = target.closest(".card").querySelector(".info-block");
    const header = target.closest(".card").querySelector("footer");
    infoBlock.classList.toggle("active");

    const animateValue = infoBlock.classList.contains("active")
      ? (progress) => `circle(${Math.trunc(progress * 135)}% at 304px 1.5rem)`
      : (progress) =>
          `circle(${Math.trunc(135 - progress * 135)}% at 304px 1.5rem)`;

    animate({
      duration: 400,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        infoBlock.style.clipPath = animateValue(progress);
      },
      completed() {
        header.classList.toggle("d-none");
      },
    });
  }
});
