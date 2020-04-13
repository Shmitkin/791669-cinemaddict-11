import {addProperty} from "./utils.js";

const HIDDEN_CLASS = `visually-hidden`;
const EXTRA_CLASS = `--extra`;

const createFilmsListTemplate = ({title, isExtra = false, isHidden = false}) => {
  return (
    `<section class="films-list${addProperty(isExtra, EXTRA_CLASS)}">
      <h2 class="films-list__title ${addProperty(isHidden, HIDDEN_CLASS)}">${title}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export {createFilmsListTemplate};
