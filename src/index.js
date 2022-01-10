"use strict";

import HeroCard from "./modules/heroCard";
import FilterMovie from "./modules/filter_movie";
import Storage from "./modules/storage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { animate } from "./modules/helpers";
import totalString from "./modules/totalString";

const url = "/dbHeroes.json";
const cards = document.querySelector(".cards");

const storageData = new Storage("heroes");
const storageMovies = new Storage("movies");

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

const renderCards = (wrapper, heroesList, filter = null) => {
  wrapper.innerHTML = "";
  heroesList =
    filter && filter.value !== "All"
      ? heroesList.filter((item) => {
          return Array.isArray(item[filter.key])
            ? item[filter.key].includes(filter.value)
            : item[filter.key] === filter.value;
        })
      : heroesList;
  const all = filter && filter.value === "All";
  totalString(all, heroesList.length);
  heroesList.forEach((hero) => {
    const heroCard = new HeroCard();
    heroCard.setBgImg(hero.photo);
    heroCard.setName(hero.name);
    heroCard.setSpecifications(hero);

    wrapper.append(heroCard.card);
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
    }
  })();
} else {
  renderCards(cards, storageData.get());

  const filter = new FilterMovie(storageMovies.get());
  filter.block.addEventListener("input", (e) => {
    renderCards(cards, storageData.get(), {
      key: "movies",
      value: e.target.value,
    });
  });
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
