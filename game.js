let buttonColours = ["red", "blue", "green", "yellow"];

// for keeping track of the current game level
let level = 0;
// for keeping track of how many times user has clicked any button
let buttonClicked = 0;
// for storing the current pattern of the game
let gamePattern = [];
// for storing the user clicked pattern
let userClickedPattern = [];


// animating and playing sound for the next random picked color
function nextSequence() {

    ++level;  // new level of the game state
    $("h1").text("Level " + level);  // changing title accordingly

    buttonClicked = 0;  // for resetting the value of mouse click

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    $("#" + randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);

    // storing the chosen color in the current game pattern
    gamePattern.push(randomChosenColour);

}


// animating and playing sound for user clicked color 
$(".btn").click(function () {

    event.stopPropagation();  // so that the click on "button" doesn't reach to the click on "body"

    ++buttonClicked; // as the button has just been clicked, variable should be incremented

    userChosenColour = $(this).attr('id');

    animatePress(userChosenColour);
    playSound(userChosenColour);

    // storing the user clicked color in the current game pattern
    userClickedPattern.push(userChosenColour);

    // checking if the user is correct upto now
    verify(buttonClicked);

});


// --------- functions for playing sound and animation  ----------
function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    // ("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}
// ---------------------------------------------------------------

// event listener from keyboard for starting the game
$("body").keydown(function () {

    if (level === 0) {
        nextSequence();
    }

});

// event listener from mouse for starting the game
$("body").not($(".btn")).click(function () {

    if (level === 0) {
        nextSequence();
    }

});


// comparing user input sequence and game sequence
function verify(_buttonClicked) {

    for (let i = 0; i < _buttonClicked; ++i) {

        if (gamePattern[i] !== userClickedPattern[i]) {

            playSound("wrong");

            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);

            $("h1").html("Game Over at level: " + level + "<br><br>Press Any Key to Restart");
            reset();

        }

    }

    // this will trigger when the user completed current level
    if (_buttonClicked === level) {
        // resetting the clicks by user for this particular level
        userClickedPattern = [];

        setTimeout(function () {
            nextSequence();
        }, 1000);
    }

}


// function for resetting everything once game over
function reset() {
    level = 0;
    buttonClicked = 0;
    gamePattern = [];
    userClickedPattern = [];
}
