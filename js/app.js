$(document).ready(function(){
    newGame();

    /* Display information modal box */
    $(".what").click(function(){
        $(".overlay").fadeIn(1000);

    });

    /* Hide information modal box */
    $("a.close").click(function(){
        $(".overlay").fadeOut(1000);
    });

    /* Start new game */
    $(".new").click(function() {
        newGame();
    });

    /* Enter a guess */
    $("#guessButton").click(function(event) {
        event.preventDefault();
        guess();
    });
});

var answer;
var userGuess;
var feedback;
var guessCount;
var guessList;

function newGame() {
    disableInput(false);
    answer = getAnswer();

    feedback = "Guess a number between 1-100";
    userGuess = "";
    guessCount = 0;
    guessList = [];
    updateDisplay();
}

function getAnswer() {
    /* Think of a number between 1 and 100 */
    return Math.floor((Math.random() * 100) + 1);
}

function guess() {
    var guess = $("#userGuess").val();
    if(!isValidGuess(guess)){
        userGuess = "";
        updateDisplay();
        return;
    }
    feedback = getFeedback(guess);
    guessCount++;
    guessList.push(guess);
    userGuess = "";
    updateDisplay();
}

function updateDisplay() {
    $("#feedback").text(feedback);
    $("#userGuess").val(userGuess);
    $("#count").text(guessCount);
    $("#guessList").empty();
    if(guessList.length > 0) {
        for(var i = 0; i < guessList.length; i++) {
            var listItem = "<li>" + guessList[i] + "</li>";
            $("#guessList").append(listItem);
        }
    }
    $("#userGuess").focus();
}

function getFeedback(guess) {
    /* Is guess correct? */
    if(guess == answer) {
        disableInput(true); /* Prevent game continuing after win */
        return "You're correct!";
    }

    /* Is the first guess high or low? */
    if(guessList.length === 0){
        if (guess > answer) {
            return "Sorry, that's too high.";
        }
        else if (guess < answer) {
            return "Sorry, that's too low.";
        }
        return;
    }

    /* Is the guess hot (within 10)? */
    if(guess >= answer - 10 && guess <= answer + 10){
        return "You're hot!!";
    }

    /* Is the guess cold (more than 10 away)? */
    if(guess <= answer - 10 || guess >= answer + 10){
        return "Oh no, you're cold.";
    }
}

function isValidGuess(guess) {
    if(guess === undefined || guess === null || guess.trim().length === 0 ||
        !isInteger(guess) || guess < 1 || guess > 100) {
        alert("Please enter a number between 1 and 100.");
        return false;
    }

    if($.inArray(guess, guessList) !== -1){
        alert("Oops, you already guess that number.");
        return false;
    }

    return true;
}

function disableInput(disabled) {
    $("#userGuess").prop("disabled", disabled);
    $("#guessButton").prop("disabled", disabled);
}

function isInteger(input) {
    var value = +input;
    if(isNaN(input)){
        return false;
    }
    if(input % 1 !== 0){
        return false;
    }
    return true;
}