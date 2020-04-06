export const createCommentTemplate = () => {
  return (
    `<li class="film-details__comment">
       <span class="film-details__comment-emoji">
         <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">
       </span>
       <div>
         <p class="film-details__comment-text">Booooooooooring</p>
         <p class="film-details__comment-info">
           <span class="film-details__comment-author">John Doe</span>
           <span class="film-details__comment-day">2 days ago</span>
           <button class="film-details__comment-delete">Delete</button>
         </p>
       </div>
    </li>`
  );
};
