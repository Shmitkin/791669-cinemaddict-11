import AbstractComponent from "./abstract-component.js";
import {addProperty} from "../utils/common.js";
import {StatisticsFilterType} from "../consts.js";
const ACTIVE_INPUT = `checked`;

const StatisticsFilterControls = [
  [StatisticsFilterType.ALL, `All time`, true],
  [StatisticsFilterType.TODAY, `Today`, false],
  [StatisticsFilterType.WEEK, `Week`, false],
  [StatisticsFilterType.MONTH, `Month`, false],
  [StatisticsFilterType.YEAR, `Year`, false]
];

const createStatisticsControlTemplate = ([filterType, label, isActive]) =>{
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filterType}" value="${filterType}" ${addProperty(isActive, ACTIVE_INPUT)}>
    <label for="statistic-${filterType}" class="statistic__filters-label">${label}</label>`
  );
};

export default class UserStatsFilter extends AbstractComponent {
  constructor() {
    super();
    //  this._activeFilter = StatisticsFilterType.ALL;
  }
  getTemplate() {
    return UserStatsFilter._createTemplate();
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
      ${StatisticsFilterControls.map(createStatisticsControlTemplate).join(``)}
    </form>`
    );
  }
}
