"use strict";

export default class Filter {
  constructor({ filtersBlockSelector }) {
    this.filtersBlockSelector = filtersBlockSelector;
    this.filtersBlock = document.querySelector(filtersBlockSelector);
  }
  render() {
    this.filtersBlock.prepend(this.block);
  }
}
