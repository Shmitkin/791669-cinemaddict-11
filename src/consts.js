const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const MINUTES_IN_HOUR = 60;

const HOURS_IN_DAY = 24;

const DAYS_IN_MONTH = 30;

const KeyboardKey = {
  ESCAPE: `Escape`,
  ESC: `Esc`
};

const SortType = {
  DATE_DOWN: `date-down`,
  RATING_DOWN: `rating-down`,
  DEFAULT: `default`,
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const CardCount = {
  SUMMARY: 15,
  DEFAULT_SHOW: 5,
  SHOW_MORE: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

const ActionType = {
  DATA_CHANGE: `data-change`,
  VIEW_CHANGE: `view-change`
};

const CardButtonType = {
  WATCHLIST: `watchlist`,
  WATCHED: `watched`,
  FAVORITE: `favorite`
};

export {
  CardButtonType,
  ActionType,
  CardCount,
  FilterType,
  SortType,
  KeyboardKey,
  MONTH_NAMES,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
  DAYS_IN_MONTH
};
