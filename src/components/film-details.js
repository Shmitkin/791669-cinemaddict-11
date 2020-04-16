import {createElement} from "../utils.js";

const createFilmDetailsTemplate = (film) => {
  const {comments} = film;
  return (
    `<section class="film-details">
       <form class="film-details__inner" action="" method="get">
         <div class="form-details__top-container">
           <div class="film-details__close">
             <button class="film-details__close-btn" type="button">close</button>
           </div>
         </div>
         <div class="form-details__bottom-container">
           <section class="film-details__comments-wrap">
             <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
             <ul class="film-details__comments-list">
             </ul>
           </section>
         </div>
       </form>
    </section>`
  );
};

export default class FilmDetails {
  constructor(film) {
    this._film = film;
    this._element = null;
  }
  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
