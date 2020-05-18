import AbstractComponent from "./abstract-component.js";
import {addProperty} from "../utils/common.js";
import {StatsControlType} from "../consts.js";

const ACTIVE_INPUT = `checked`;

const StatsFilters = [
  [StatsControlType.ALL, `All time`, true],
  [StatsControlType.TODAY, `Today`, false],
  [StatsControlType.WEEK, `Week`, false],
  [StatsControlType.MONTH, `Month`, false],
  [StatsControlType.YEAR, `Year`, false]
];

const createFilterTemplate = ([filterType, label, isActive]) =>{
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filterType}" value="${filterType}" ${addProperty(isActive, ACTIVE_INPUT)}>
    <label for="statistic-${filterType}" class="statistic__filters-label">${label}</label>`
  );
};

export default class StatsFilter extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return StatsFilter._createTemplate();
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      evt.preventDefault();
      handler(evt.target.value);

    });
  }

  static _createTemplate() {
    return (
      `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${StatsFilters.map(createFilterTemplate).join(``)}
    </form>`
    );
  }
}
