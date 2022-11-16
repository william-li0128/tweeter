/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Render the tweets page

$(document).ready(()=>{ // only run the code when previous append has been finished.
  // empty object to store tweet data
  const data = [];

  $(".alert").hide();

  // Define escape funtion to prevent an XSS attack
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // Define the createTweetElement function
  
  const createTweetElement = function(tweet) {
    let $tweet = `
    <article>
    <header class="header">
      <img class="tweet-avatar" src="${tweet["user"]["avatars"]}"> 
      <p class="tweet-name">${tweet["user"]["name"]}</p>
      <p class="tweet-username">${tweet["user"]["handle"]}</p>
    </header>
    <p class="tweet-text">${escape(tweet["content"]["text"])}</p>
    <footer>
      <p class="created-at">${timeago.format(tweet["created_at"])}</p>
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
    // sort tweets object set from the latest to the oldest.
    const sortTweets = tweets.sort((a,b) => (a["created_at"] > b["created_at"]) ? -1 : ((b["created_at"] > a["created_at"]) ? 1 : 0))
    // loops through tweets
    for (const tweet of sortTweets) {
      // calls createTweetElement for each tweet
      $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
        };
  
  };
  renderTweets(data);
  
  // define the function to load tweets from the database
  
  const loadTweets = function() {
    const $button = $('#submit-new-tweet');
    $button.on('click', function () {
      console.log('Button clicked, performing ajax JSON response');
      $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function (tweetsContents) {
        console.log('Success: ', tweetsContents);
        renderTweets(tweetsContents);
      });
    });
  };
  loadTweets();

  // Add the submit listener.
  // Attach a submit handler to the form

    $( "#compose-tweet" ).submit(function( event ) {
      // Stop form from submitting normally
      event.preventDefault();
      $(".alert").slideUp();
      const $form = $( this ),
      text = $form.serialize(),
      textLength = text.length - 5,
      url = $form.attr("action");
      if (textLength > 140) {
        $(".too-long-alert").slideDown();
      } else if (textLength === 0) {
        $(".empty-alert").slideDown();
      } else {
        $.post( url, escape(text) );
      };
    });
  });