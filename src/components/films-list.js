export const createFilmsListTemplate = ({title, isExtra = false, isHidden = false}) => {
  const hiddenClass = `visually-hidden`;
  const extraClass = `--extra`;
  return (
    `<section class="films-list${isExtra ? extraClass : ``}">
      <h2 class="films-list__title ${isHidden ? hiddenClass : ``}">${title}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};
