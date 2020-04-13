const createGenreTemplate = (genre) =>
  `<span class="film-details__genre">${genre}</span>`;

const createGenresTemplate = (genres) => {
  return genres.map((genre) => createGenreTemplate(genre)).join(`\n`);
};

export {createGenresTemplate};
