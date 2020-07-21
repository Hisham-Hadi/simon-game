
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var started = false;

//////////////////////////////////////////////////////////////////     Game Logic

// sequnce generation and storing

function nextSequence() {

    level = level + 1;
    $("h1").text("Level "+level);
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);

}

// detecting user generated sequence and storing

$(".btn").click(function(){

    var userChosenColor = this.classList[1];
    playSound(userChosenColor);
    animatePress(userChosenColor);

    userClickedPattern.push(userChosenColor);
    checkAnswer();
    
})

// playing sound on user clicks and computer patterns

function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

// animating both user clicks and game patterns

function animatePress(currentColor) {

    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)

}

// Initiating the game 

$(document).keydown(function(){
    if (!started) {
        nextSequence();
        started = true;
    }
})

// Checking answers. Answer is checked as each entry is made. You spent a day trying to figure that out.

function checkAnswer() {

    var readPosition = userClickedPattern.length - 1;

    if (userClickedPattern[readPosition]===gamePattern[readPosition]) {
        console.log("success");
        
        if (userClickedPattern.length===gamePattern.length) {

            setTimeout(function(){
                nextSequence();
            }, 1000)
        }

    } else {
        console.log("wrong");
        started = false;
        $("body").addClass("game-over");

        wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();

        $("h1").text("Game over. Press any key to restart.");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },100)

        level = 0;
        gamePattern = [];

    }

}

