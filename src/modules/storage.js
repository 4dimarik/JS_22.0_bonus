export default class Storage {
  #key;
  /**
   * Класс для взаимодействия с localStorage
   * @param {string} key - Ключ localStorage
   */

  constructor(key) {
    this.#key = key;
  }

  /**
   * Метод проверки существования данных
   * @returns {boolean}
   */
  isExist() {
    return !!localStorage.getItem(this.#key);
  }

  /**
   * Метод получения данных
   * @returns {Object}
   */
  get() {
    return JSON.parse(localStorage.getItem(this.#key));
  }

  /**
   * Метод полность заменяет данные
   * @param {Object} data
   */
  set(data) {
    localStorage.setItem(this.#key, JSON.stringify(data));
  }
}
