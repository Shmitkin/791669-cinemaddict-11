const ProfileLevel = {
  NO_RATING: ``,
  NOVICE: {
    name: `novice`,
    min: 1,
    max: 10
  },
  FAN: {
    name: `fan`,
    min: 11,
    max: 20
  },
  MOVIE_BUFF: {
    name: `movie buff`,
    min: 21
  }
};

const addProfileRating = (filmsInHistory) => {
  let profileRating = ProfileLevel.NO_RATING;
  if (filmsInHistory >= ProfileLevel.NOVICE.min && filmsInHistory <= ProfileLevel.NOVICE.max) {
    profileRating = ProfileLevel.NOVICE.name;
  } else if (filmsInHistory >= ProfileLevel.FAN.min && filmsInHistory <= ProfileLevel.FAN.max) {
    profileRating = ProfileLevel.FAN.name;
  } else if (filmsInHistory > ProfileLevel.MOVIE_BUFF.min) {
    profileRating = ProfileLevel.MOVIE_BUFF.name;
  }
  return profileRating;
};

const createHeaderProfileTemplate = (filmsInHistory) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${addProfileRating(filmsInHistory)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createHeaderProfileTemplate};

