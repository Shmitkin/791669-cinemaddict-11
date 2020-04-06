export const createFilmsListTemplate = (modifier = ``, titleText, titleHiddenClass = ``) => {
  return (
    `<section class="films-list${modifier}">
      <h2 class="films-list__title ${titleHiddenClass}">${titleText}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};
