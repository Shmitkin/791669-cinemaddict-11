const ratingTitles = [
  {rating: 21, title: `movie buff`},
  {rating: 11, title: `fan`},
  {rating: 1, title: `novice`},
  {rating: 0, title: ``},
];

const getRatingTitle = (value) => ratingTitles.find(({rating}) => value >= rating).title;

const createHeaderProfileTemplate = (filmsInHistory) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getRatingTitle(filmsInHistory)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createHeaderProfileTemplate};

