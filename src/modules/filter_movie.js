import { DomElement } from "./helpers";
import Filter from "./filter";

export default class FilterMovie extends Filter {
  constructor(options, filterData = null) {
    super({ filtersBlockSelector: ".filters-item" });
    this.class = "movie-filter filter";
    this.id = "movie_filter";

    this.createSelectElement(options);
    if (filterData) {
      this.select.value = filterData.value;
    }
    this.create();
    this.render();
  }
  create() {
    this.block = new DomElement({
      className: this.class,
      id: this.id,
    }).element;
    const label = new DomElement({
      tag: "label",
      attrs: { for: this.id },
      textContent: "Movies",
    }).element;
    this.block.append(label, this.select);
  }
  createSelectElement(options) {
    this.select = new DomElement({
      tag: "select",
      id: this.id,
      name: "movies",
    }).element;
    options = ["All", ...options];
    options.forEach((option) => {
      const optionElement = new DomElement({
        tag: "option",
        value: option,
        textContent: option,
      }).element;
      this.select.append(optionElement);
    });
  }
}
