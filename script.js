const API_KEY = "YOUR API KEY ";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(querry) {
    const res = await fetch(`${url}${querry}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles)
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });


}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

var app = document.getElementsByTagName("BODY")[0];
        if (localStorage.lightMode == "dark") {
            app.setAttribute("light-mode", "dark");
        }

        function toggle_light_mode() {
            var app = document.getElementsByTagName("BODY")[0];
            if (localStorage.lightMode == "dark") {
                localStorage.lightMode = "light";
                app.setAttribute("light-mode", "light");
            } else {
                localStorage.lightMode = "dark";
                app.setAttribute("light-mode", "dark");
            }
        }
        function showDateTime() {
            var myDiv = document.getElementById("myDiv");
          
            var date = new Date();
            var dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ];
            var dayName = dayList[date.getDay()];
            var monthName = monthNames[date.getMonth()];
            var today = `${dayName}, ${monthName} ${date.getDate()}, ${date.getFullYear()}`;
          
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
          
            var time = hour + ":" + min + ":" + sec;
            myDiv.innerText = ` ${today}. Time ${time}`;
          }
          setInterval(showDateTime, 1000);
                 
