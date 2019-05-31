const colors = ['#16a085', '#27ae60',
    '#2c3e50', '#f39c12',
    '#e74c3c', '#9b59b6',
    '#FB6964', '#342224',
    "#472E32", "#BDBB99",
    "#77B1A9", "#73A857",
    "#cfad87", "#cfad87",
    "#5cc9f5", "#dfebd0"
];

function renderNewQuote() {

    result = getRandQuote();
    quote = result[0];
    author = result[1];
    textFadeEffect("#text", quote);
    textFadeEffect("#author", author);

    /* randomize color background */
    var color = Math.floor(Math.random() * colors.length);
    $("body").css({
        "background-color": colors[color],
        "transition": "background-color ease-in 1s"
    });
    $("#title").css({
        "color": colors[color],
        "transition": "color ease-in 1s"
    });
    $("button").css({
        "background-color": colors[color],
        "transition": "background-color ease-in 1s"
    });
    $("#tweet-quote").css({
        "background-color": colors[color],
        "transition": "background-color ease-in 1s"
    });
    $(".quote").css({
        "color": colors[color],
        "transition": "color ease-in 1s"
    })
}

/* fade out & fade in a  text */
function textFadeEffect(id, newText) {
    $(id).fadeOut(800, () => {
        $(id).hide();
    });
    $(id).fadeIn(0, () => {
        $(id).html(newText);
    });
}

function getRandQuote() {
    let quote = "";
    let author = "";

    /* randomly get quote & author */
    $.ajax({
        url: 'https://quota.glitch.me/random',
        async: false, // disable async so we can rewrite quote & author, then use them after ajax
        dataType: 'json',
        success: (json) => {
            quote = '"' + json.quoteText + '"';
            author = "- " + json.quoteAuthor;
        }
    });

    return [quote, author]
}

$(document).ready(function () {

    // initialize the start page
    result = getRandQuote();
    quote = result[0];
    author = result[1];
    $("#text").html(quote);
    $("#author").html(author);

    /* Generating new quote */
    $("#new-quote").click(() => {
        renderNewQuote();
        }
    );

    // tweet the quote when click tweet button
    $('#tweet-quote').on('click', () => {
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent( quote + " " + author));
    });
});
