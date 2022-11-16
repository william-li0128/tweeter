/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Render the tweets page

$(document).ready(()=>{ // only start the loop when previous append has been finished.
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// Define the createTweetElement function

const createTweetElement = function(tweet) {
  let $tweet = `
  <article>
  <header class="header">
    <img class="tweet-avatar" src="${tweet["user"]["avatars"]}"> 
    <p class="tweet-name">${tweet["user"]["name"]}</p>
    <p class="tweet-username">${tweet["user"]["handle"]}</p>
  </header>
  <p class="tweet-text">${tweet["content"]["text"]}</p>
  <footer>
    <p class="created-at">${tweet["created_at"]}</p>
    <div class="tweet-icon">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-sharp fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
  </article>
  `;
  return $tweet;
};

const renderTweets = function(tweets) {
  let $tweet = "";

  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
      };

};
renderTweets(data);
});

// Add the submit listener.

// Attach a submit handler to the form
$(document).ready(()=>{
  $( "#compose-tweet" ).submit(function( event ) {
    // Stop form from submitting normally
    event.preventDefault();
    const $form = $( this ),
    text = $form.serialize(),
    url = $form.attr("action");
    $.post( url, text );
  });
});