import { numeralsWithNouns } from "./helpers";

const totalString = (all, num) => {
  const total = document.querySelector(".total");
  const noun = numeralsWithNouns(num, ["герой", "героя", "героев"]);

  total.textContent = all ? `Всего ${num} ${noun}` : `Найдено ${num} ${noun}`;
};

export default totalString;
