const pageData = ['buddha', 'elon-musk', 'jeff-bezos', 'osho', 'socrates', 'cristiano-ronaldo',
                  'business', 'love', 'happiness', 'inspiration', 'self-confidence', 'life-insights']

const quotes = document.querySelectorAll('.quote-box');
const quotesSerial = document.querySelectorAll('.quote-box__serial');
const total = quotes.length;
let currentVisibleQuotes = 10;
const visiblityLimit = 10;

function gotoQuote () {
  const target = Number(document.querySelector('.nav__goto-input').value);
  if (currentVisibleQuotes < target) {
    loadMore(target);
  }
  if (Number(target) <= total) {
    location.replace(`#q-${target-1 >= 1 ? target-1 : 1}`); //-1 to get down from fixed nav
  } else {
    location.replace(`#q-${total-1}`); //-1 to get down from fixed nav
  }
}

function loadMore(to) {
  if (to > total) {
    to = total;
    document.querySelector('.load-btn').style.display = 'none';
  }
  for (i=currentVisibleQuotes; i<=to; i++) {
    quotes[i-1].style.display = 'block';
  }

  currentVisibleQuotes = to;
}

// Initial settings------------------------------------------------------------/
for (i=1; i<=total; i++) {
  quotes[i-1].setAttribute('id', `q-${i}`);
  quotesSerial[i-1].textContent = i;

  if (i > currentVisibleQuotes) {
    quotes[i-1].style.display = 'none';
  }
}

// Load More Implementation----------------------------------------------------|
document.querySelector('.load-btn').addEventListener('click', function () {
  loadMore(currentVisibleQuotes + visiblityLimit)
})

// Search Implementation-------------------------------------------------------|
document.querySelector('.nav__goto-btn').addEventListener('click', gotoQuote)
document.querySelector('.nav__goto-input').addEventListener('keyup', function (event) {
  if (event.key === "Enter") {
    gotoQuote();
  }
})

// Next/Prev Page Implementation-----------------------------------------------/
document.querySelector('.nav__prev-page').addEventListener('click', function () {
  const currentPage = (location.pathname.split('/').pop()).split('.')[0];
  const prevPageIndex = pageData.indexOf(currentPage) - 1;
  const prevPage = pageData[prevPageIndex >= 0 ? prevPageIndex : pageData.length - 1];
  location.replace(prevPage + '.html')
})

document.querySelector('.nav__next-page').addEventListener('click', function () {
  const currentPage = (location.pathname.split('/').pop()).split('.')[0];
  const nextPageIndex = pageData.indexOf(currentPage) + 1;
  const nextPage = pageData[nextPageIndex <= pageData.length ? nextPageIndex : 0];
  location.replace(nextPage + '.html')
})
