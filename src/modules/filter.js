"use strict";
import { DomElement } from "./helpers";

export default class Filter {
  constructor({ filtersBlockSelector }) {
    this.filtersBlockSelector = filtersBlockSelector;
    this.filtersBlock = document.querySelector(filtersBlockSelector);
  }
  render() {
    this.filtersBlock.append(this.block);
  }
}
