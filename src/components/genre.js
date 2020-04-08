const createGenreTemplate = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};

const createGenresTemplate = (genres) => {
  const genresTemplate = genres.map((genre, i) => createGenreTemplate(genre, i === 0)).join(`\n`);
  return genresTemplate;
};

export {createGenresTemplate};
