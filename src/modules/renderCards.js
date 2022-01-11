import totalString from "./totalString";
import HeroCard from "./heroCard";

const renderCards = (wrapper, heroesList, filter = false) => {
  wrapper.innerHTML = "";
  const filterAll = filter && filter?.value !== "All";
  heroesList = filterAll
    ? heroesList.filter((item) => {
        return Array.isArray(item[filter.key])
          ? item[filter.key].includes(filter.value)
          : item[filter.key] === filter.value;
      })
    : heroesList;
  totalString(!filterAll, heroesList.length);
  heroesList.forEach((hero) => {
    const heroCard = new HeroCard();
    heroCard.setBgImg(hero?.photo);
    heroCard.setName(hero.name);
    heroCard.setSpecifications(hero);

    wrapper.append(heroCard.card);
  });
};

export default renderCards;
