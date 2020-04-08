const ProfileLevel = {
  NOVICE_MIN: 1,
  NOVICE_MAX: 10,
  FAN_MIN: 11,
  FAX_MAX: 20,
  MOVIE_BUFF_MIN: 21
};

export const createHeaderProfileTemplate = (filmsInHistory) => {
  let profileRating = ``;
  if (filmsInHistory >= ProfileLevel.NOVICE_MIN && filmsInHistory <= ProfileLevel.NOVICE_MAX) {
    profileRating = `novice`;
  } else if (filmsInHistory >= ProfileLevel.FAN_MIN && filmsInHistory <= ProfileLevel.FAX_MAX) {
    profileRating = `fan`;
  } else if (filmsInHistory > ProfileLevel.MOVIE_BUFF_MIN) {
    profileRating = `movie buff`;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
