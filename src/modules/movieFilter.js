"use strict";
import { DomElement } from "./helpers";
import Filter from "./filter";

export default class MovieFilter extends Filter {
  constructor(options) {
    super({ filtersBlockSelector: ".card-filter" });
    this.class = "movie-filter filter";
    this.id = "movie_filter";

    this.createSelectElement(options);
    this.create();
    this.render();
  }
  create() {
    this.block = new DomElement({ className: this.class, id: this.id }).element;
    const label = new DomElement({
      tag: "label",
      attrs: { for: this.id },
      textContent: "Фильтр по фильму:",
    }).element;
    this.block.append(label, this.select);
    // this.setEventListener("input", this.inputEvent);
  }
  createSelectElement(options) {
    this.select = new DomElement({ tag: "select", id: this.id }).element;
    options.forEach((option) => {
      const optionElement = new DomElement({
        tag: "option",
        value: option,
        textContent: option,
      }).element;
      this.select.append(optionElement);
    });
  }
  // inputEvent(e) {
  //   console.log("select");
  //   console.log(e.target);
  //   console.log(e.target.value);
  // }
}
