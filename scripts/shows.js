//title
var varShows                 = document.querySelector('.shows');
var varShowsTitle            = document.createElement('h2');
var varShowsTitleContainer   = document.createElement('div');
var varShowsContentContainer = document.createElement('div');
varShows.appendChild(varShowsTitleContainer);
varShows.appendChild(varShowsContentContainer);
varShowsTitleContainer.appendChild(varShowsTitle);
varShowsTitleContainer.classList.add('shows__title-container');
varShowsContentContainer.classList.add('shows__content-container');
varShowsTitle.classList.add('shows__title');
varShowsTitle.innerText = "Shows";

let showsData =[];
const data = axios
    .get("https://project-1-api.herokuapp.com/showdates?api_key=a")
    .then(response => {
      showsData = response.data; 
      console.log(showsData);
      funShowTable();
    });

function funShowTable() {
                          for (obj of showsData) {
                            var varShowsEvent = document.createElement("div");
                            varShowsContentContainer.appendChild(varShowsEvent);
                            varShowsEvent.classList.add("shows__event");
                            var varDateTitle = document.createElement("h4");
                            varShowsEvent.appendChild(varDateTitle);
                            varDateTitle.classList.add("shows__date--title");
                            varDateTitle.innerText = "Date";
                            var varArrayDate           = document.createElement("p");
                            varShowsEvent.appendChild(varArrayDate);
                            varArrayDate.classList.add("shows__date--value");
                            varArrayDate.innerText = obj.date;

                            var varVenueTitle = document.createElement("h4");
                            varShowsEvent.appendChild(varVenueTitle);
                            varVenueTitle.classList.add("shows__venue--title");
                            varVenueTitle.innerText = "Venue";

                            var varArrayVenue = document.createElement("p");
                            varShowsEvent.appendChild(varArrayVenue);
                            varArrayVenue.classList.add("shows__venue--value");
                            varArrayVenue.innerText = obj.place;

                            var varLocationTitle = document.createElement("h4");
                            varShowsEvent.appendChild(varLocationTitle);
                            varLocationTitle.classList.add("shows__location--title");
                                varLocationTitle.innerText = "Location";
                            var varArrayLocation           = document.createElement("p");
                            varShowsEvent.appendChild(varArrayLocation);
                            varArrayLocation.classList.add(
                              "shows__location--value"
                            );
                            varArrayLocation.innerText = obj.location;

                            var varButtonContainer = document.createElement(
                              "div"
                            );
                            var varButton = document.createElement("button");
                            varShowsEvent.appendChild(varButtonContainer);
                            varButtonContainer.appendChild(varButton);
                            varButton.classList.add("button");
                            varButtonContainer.classList.add(
                              "button--container"
                            );
                            varButton.innerText = "BUY TICKETS";
                          }
                        }