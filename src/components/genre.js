const createGenreTemplate = (genre) =>
  `<span class="film-details__genre">${genre}</span>`;

const createGenresTemplate = (genres) => {
  return genres.map(createGenreTemplate).join(``);
};

export {createGenresTemplate};
