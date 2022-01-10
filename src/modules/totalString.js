import { numeralsWithNouns } from "./helpers";
const totalString = (all, num) => {
  const total = document.querySelector(".total");

  const string = all
    ? `Всего ${num} ${numeralsWithNouns(num, ["герой", "героя", "героев"])}`
    : `Найдено ${num} ${numeralsWithNouns(num, ["герой", "героя", "героев"])}`;

  total.textContent = string;
};

export default totalString;
