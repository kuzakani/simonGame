// We start the game by a keydown event triggered by a key press.
// There're four buttons with unique colours.
// The button clicked get chosen randomly.
// An animation runs on the button which is clicked once it's clicked ('userChosenColour').
// The game pattern forms an array with each leveling up.
// An array gets formed with the user following of the game pattern.
// Both arrays ('gamePattern' , 'userClickedPattern').
// level passes if the gamePattern and userClickedPattern are alike.

var userClickedPattern = [];

var gamePattern = [];

var level = 0;

var started = false;

var buttonColours = ["red","yellow","blue","green"];


function nextSequence() {

  level++;

  var randomNumber = Math.floor( Math.random() * 4 );
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  $("h1").text("level " + level);
  playSound(randomChosenColour);
  userClickedPattern = [];

}

$(".btn").click( function (event) {

    var userChosenButton = $(this).attr("id");

    userClickedPattern.push(userChosenButton);

    playSound(userChosenButton);
    animatePress(userChosenButton)

    checkAnswer(userClickedPattern.length-1)

});




$(document).keydown(function (event) {

    if (!started) {

      $("h1").text("level " + level);
      nextSequence();
      started = true;
    }

});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
   if (gamePattern.length === userClickedPattern.length) {
     setTimeout(function() {
       nextSequence();
      }, 1000)
    }
   } else {
       $("body").addClass("game-over");
       setTimeout(function(){
         $("body").removeClass("game-over");
       }, 200)
       playSound("wrong");
       $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }


  }

function playSound(name) {
   var audio = new Audio("sounds/"+ name + ".mp3");
   audio.play();
}

function animatePress(button) {
    $("#" + button).addClass("pressed");
    setTimeout(function() {
      $(".btn").removeClass("pressed");
    }, 100)
}

function startOver() {

    gamePattern = [];
    started = false;
    level = 0



}
