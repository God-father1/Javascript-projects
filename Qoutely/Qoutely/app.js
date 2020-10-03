function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

var colors = [
  '#490A3D',
  '#BD1550',
  '#E97F02',
  '#F8CA00',
  '#8A9B0F',
  '#69D2E7',
  '#FA6900',
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#77B1A9',
  '#73A857',
];

var currentQuote = '';
var currentAuthor = '';
var randomcolor = '';

function getQuote() {
  $.ajax({
    url: 'https://api.forismatic.com/api/1.0/',
    jsonp: 'jsonp',
    dataType: 'jsonp',
    data: {
      method: 'getQuote',
      lang: 'en',
      format: 'jsonp',
    },
    success: function (response) {
      currentQuote = response.quoteText;
      currentAuthor = response.quoteAuthor;
      if (currentAuthor === '') {
        currentAuthor = 'unknown';
      }
    },
  });
  randomcolor = Math.floor(Math.random() * colors.length);
  if (inIframe()) {
    $('#tweet-quote').attr(
      'href',
      'https://twitter.com/intent/tweet?hashtags=demo&via=not_hilfiger"&related=aLamm&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor + '\n\n')
    );
  }

  $(document).ready(function () {
    $('body').animate(
      {
        backgroundColor: colors[randomcolor],
        color: colors[randomcolor],
      },
      500
    );
    $('#newquote, .social-icons .fa-twitter').animate(
      { backgroundColor: colors[randomcolor] },
      500
    );
    $('blockquote footer').animate({ color: colors[randomcolor] }, 500);
    $('blockquote').animate({ borderLeftColor: colors[randomcolor] }, 500);
    $('#quotetext').animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
      $(this).text(currentQuote);
    });
    $('#quotesource').animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
      $(this).text(currentAuthor);
    });
  });
}

function openURL(url) {
  window.open(
    url,
    'Share',
    'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0'
  );
}

getQuote();

$(document).ready(function () {
  $('#newquote').on('click', getQuote);
  $('#tweet-quote').on('click', function () {
    if (!inIframe()) {
      openURL(
        'https://twitter.com/intent/tweet?hashtags=demo&via=not_hilfiger&related=freecodecamp&text=' +
          encodeURIComponent('"' + currentQuote + '" ' + currentAuthor + '\n\n')
      );
    }
  });
});
