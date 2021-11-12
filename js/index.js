
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
    location.href = `#q-${target}`;
  } else {
    location.href = `#q-${total}`;
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
