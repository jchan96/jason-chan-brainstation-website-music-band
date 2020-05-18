const constCommentsDisplaying = document.querySelector(
  ".comments__comments-displaying"
);
const constCommentsForm = document.querySelector(".comments__form");

function commentDelete() {
  axios
    .get(
      "https://project-1-api.herokuapp.com/comments?api_key=50fff2f1-0de9-44e4-9272-dea4a4e05389"
    )
    .then((response) => {
      let commentsData = response.data;
      constCommentsDisplaying.innerText = "";
      funDisplayComments(commentsData);

      let deleteButtons = document.querySelectorAll(
        ".comments__person--delete-button"
      );
      for (deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (clickEvent) => {
          clickEvent.preventDefault();
          let varPersonID = clickEvent.target.id;
          axios
            .delete(
              `https://project-1-api.herokuapp.com/comments/${varPersonID}?api_key=50fff2f1-0de9-44e4-9272-dea4a4e05389`
            )
            .then((response) => {
              commentDelete();
            });
        });
      }
    });
}
commentDelete();

// function commentLike() {
//    let likeButtons = document.querySelectorAll(".comments__person--like-button");
//       for (likeButton of likeButtons) {
//         likeButton.addEventListener("click", clickEvent => {
//           clickEvent.preventDefault();
//           let varPersonLikes = clickEvent.target.likes;
//           // let like = clickEvent.target.likes;
// // if(like===)
// axios
//     .put(
//       `https://project-1-api.herokuapp.com/comments/${varPersonLikes}/likes?api_key=50fff2f1-0de9-44e4-9272-dea4a4e05389`
//     )

// commentLike();

constCommentsForm.addEventListener("submit", (submitEvent) => {
  submitEvent.preventDefault();
  let name = submitEvent.target.formName.value;
  name.className = "comments__person--name";
  let comment = submitEvent.target.formMessage.value;
  axios
    .post(
      "https://project-1-api.herokuapp.com/comments?api_key=50fff2f1-0de9-44e4-9272-dea4a4e05389",
      {
        name: name,
        comment: comment,
      }
    )
    .then((response) => {
      submitEvent.target.formName.value = "";
      submitEvent.target.formMessage.value = "";
      constCommentsDisplaying.innerText = "";
      commentDelete();
    });
});

function funDisplayComments(commentsData) {
  console.log(commentsData);
  for (obj of commentsData) {
    // let varPersonID = obj.id;
    // console.log(varPersonID);

    const constPerson = document.createElement("div");
    const constPersonImage = document.createElement("img");
    const constPersonImageContainer = document.createElement("div");
    const constPersonName = document.createElement("p");
    const constPersonDate = document.createElement("p");
    const constPersonNameDateContainer = document.createElement("div");
    const constPersonMessage = document.createElement("p");
    const constPersonWordsContainer = document.createElement("div");
    // const constPersonButtonLike        = document.createElement("button");
    const constPersonButtonDelete = document.createElement("button");
    // const constPersonButtonLikeContainer = document.createElement("div");
    const constPersonButtonDeleteContainer = document.createElement("div");
    const constPersonButtonContainer = document.createElement("div");
    constPersonImageContainer.appendChild(constPersonImage);
    constPerson.appendChild(constPersonImageContainer);
    constPersonNameDateContainer.appendChild(constPersonName);
    constPersonNameDateContainer.appendChild(constPersonDate);
    constPersonWordsContainer.appendChild(constPersonNameDateContainer);
    constPersonWordsContainer.appendChild(constPersonMessage);
    constPerson.appendChild(constPersonWordsContainer);
    constPersonWordsContainer.appendChild(constPersonButtonContainer);
    // constPersonButtonContainer.appendChild(constPersonButtonLikeContainer);
    constPersonButtonContainer.appendChild(constPersonButtonDeleteContainer);
    // constPersonButtonLikeContainer.appendChild(constPersonButtonLike);
    constPersonButtonDeleteContainer.appendChild(constPersonButtonDelete);
    constPerson.className = "comments__person";
    constPersonImageContainer.className = "comments__person--image-container";
    constPersonImage.className = "comments__person--image";
    constPersonName.className = "comments__person--name";
    constPersonDate.className = "comments__person--date";
    constPersonNameDateContainer.className =
      "comments__person--name-date-container";
    constPersonMessage.className = "comments__person--message";
    constPersonWordsContainer.className = "comments__person--words-container";
    constPersonImage.setAttribute(
      "src",
      "./assets/Icons/profile-images/fb-silhouette-male.jpeg"
    );
    // constPersonButtonLike.classList.add("button");
    constPersonButtonDelete.classList.add("button");
    // constPersonButtonLikeContainer.classList.add("button--container");
    constPersonButtonDeleteContainer.classList.add("button--container");
    constPersonButtonDelete.id = obj.id;
    constPersonButtonDelete.classList.add("comments__person--delete-button");

    constPersonName.innerText = obj.name;
    // constPersonButtonLike.innerText   = "LIKE";
    constPersonButtonDelete.innerText = "DELETE";

    let timeClick = new Date().getTime();
    let timeDisplayed = timeClick - obj.timestamp;

    const varMillisecondsInMinute = 60000;
    const varMillisecondsInHour = 3600000;
    const varMillisecondsInDay = 86400000;
    const varMillisecondsInMonth = 2629800000;
    const varMillisecondsInYear = 31557600000;
    let metric = "";
    let result = 0;
    if (timeDisplayed < varMillisecondsInMinute) {
      result = Math.ceil(timeDisplayed / 1000);
      if (result === 0) {
        result = 1;
      }
      metric = "sec ago";
      result += metric;
    } else if (timeDisplayed < varMillisecondsInHour) {
      result = Math.floor(timeDisplayed / varMillisecondsInMinute);
      metric = "min ago";
      result += metric;
    } else if (timeDisplayed < varMillisecondsInDay) {
      result = Math.floor(timeDisplayed / varMillisecondsInHour);
      metric = "hour ago";
      result += metric;
    } else if (timeDisplayed < varMillisecondsInMonth) {
      result = Math.floor(timeDisplayed / varMillisecondsInDay);
      metric = "day ago";
      result += metric;
    } else if (timeDisplayed < varMillisecondsInYear) {
      result = Math.floor(timeDisplayed / varMillisecondsInMonth);
      metric = "month ago";
      result += metric;
    } else {
      result = Math.floor(timeDisplayed / varMillisecondsInYear);
      metric = "year ago";
      result += metric;
    }
    constPersonDate.innerText = result;
    constPersonMessage.innerText = obj.comment;
    constCommentsDisplaying.insertBefore(
      constPerson,
      constCommentsDisplaying.childNodes[0]
    );
  }
}

// console.log(timeDisplayed);
