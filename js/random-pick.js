// Purpose of this js file: Picks random quotes from "pages/influential-quotes.html"
//  and displays it in the main feed (Quote Feed at landing page).
// Notes: In order to get quote data from "pages/influential-quotes.html",
// we have to render it's DOM. We do that using the '.load()' method;

$('.aside').css('display', 'none');
$('.aside').load('../pages/influential-quotes.html .quote-box');
setTimeout(displayRandomQuotes, 1000); // making sure the DOM of
                                      // "pages/influential-quotes.html" is complete.

function displayRandomQuotes () {
  // Initial Settings
  const quotes = $('.aside .quote-box__quote');
  const mentor = $('.aside .quote-box__mentor');
  const quotesMain = $('main .quote-box__quote');
  const mentorMain = $('main .quote-box__mentor');

  for (i=1; i<=quotes.length; i++) {
    quotes[i-1].setAttribute('class', `q-${i}`);
    mentor[i-1].setAttribute('class', `m-${i}`);
  }

  // Random pick from + Display
  let pickedRandoms = [];

  for (i=0; i<quotesMain.length; i++) {
    let randomNumber = Math.ceil(Math.random()*quotes.length); //1-15 if available quotes is 15;
    while (true) {
      randomNumber = Math.ceil(Math.random()*quotes.length); //1-15 if available quotes is 15
      if (pickedRandoms.indexOf(randomNumber) === -1) {
        pickedRandoms.push(randomNumber);
        break;
      }
    }
    quotesMain[i].textContent = $(`.q-${randomNumber}`).text();
    mentorMain[i].textContent = $(`.m-${randomNumber}`).text();
  }
}
