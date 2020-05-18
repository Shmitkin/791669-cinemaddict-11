export const MINUTES_IN_HOUR = 60;

export const KeyboardKey = {
  ESCAPE: `Escape`,
  ESC: `Esc`
};

export const SortType = {
  DATE_DOWN: `date-down`,
  RATING_DOWN: `rating-down`,
  COMMENTS_DOWN: `comments-down`,
  DEFAULT: `default`,
};

export const StatsControlType = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const FilterType = {
  DEFAULT: `all`,
  WATCHLIST: `watchlist`,
  WATCHED: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`, //   цдалить! это страница а не фильтр
  WATCHED_ALL: `all-time`,
  WATCHED_TODAY: `today`,
  WATCHED_WEEK: `week`,
  WATCHED_MONTH: `month`,
  WATCHED_YEAR: `year`
};

export const ViewMode = {
  DEFAULT: `default`,
  STATS: `stats`
};

export const CardCount = {
  DEFAULT_SHOW: 5,
  SHOW_MORE: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

export const CardButtonType = {
  WATCHLIST: `watchlist`,
  WATCHED: `watched`,
  FAVORITE: `favorite`
};

export const RATING_TITLES = [
  {rating: 21, title: `movie buff`},
  {rating: 11, title: `fan`},
  {rating: 1, title: `novice`},
  {rating: 0, title: ``},
];
