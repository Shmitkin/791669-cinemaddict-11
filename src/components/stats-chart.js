import AbstractComponent from "./abstract-component.js";

export default class StatsChart extends AbstractComponent {
  getTemplate() {
    return StatsChart._createTemplate();
  }

  static _createTemplate() {
    return (
      `<div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>`
    );
  }
}
