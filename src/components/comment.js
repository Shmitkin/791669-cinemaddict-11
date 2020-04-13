import {castTimeFormat} from "../utils.js";

const formatCommentDate = (date) =>
  `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}
   ${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;

export const createCommentTemplate = (comment) => {
  const {emoji, text, author, date} = comment;
  return (
    `<li class="film-details__comment">
       <span class="film-details__comment-emoji">
         <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-sleeping">
       </span>
       <div>
         <p class="film-details__comment-text">${text}</p>
         <p class="film-details__comment-info">
           <span class="film-details__comment-author">${author}</span>
           <span class="film-details__comment-day">${formatCommentDate(date)}</span>
           <button class="film-details__comment-delete">Delete</button>
         </p>
       </div>
    </li>`
  );
};
