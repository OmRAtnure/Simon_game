var btnColor=["red","blue","green","yellow"]
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var currentclick=0;
var started = false;
var diff ="Hard";

function sequenceGenerator(){
    var n=Math.floor(Math.random()*4);
    var randomChosenColour=btnColor[n];
    gamePattern.push(randomChosenColour);
    animation(randomChosenColour);
    playSound(randomChosenColour);  
    levelIncrement();
    
}

function sequenceGenerator_Easy() {
    var n = Math.floor(Math.random() * 4);
    var randomChosenColour = btnColor[n];
    gamePattern.push(randomChosenColour);
    for(let i=0;i<=gamePattern.length;i++){
        setTimeout(function () {
            
            animation(gamePattern[i]);
            playSound(gamePattern[i]);
        }, i*400); // 1000 ms = 1 second delay per step
    }
    levelIncrement();
}


function levelIncrement(){
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    currentclick=0;
}
function animation(color){
    $("#" + color).fadeOut(100).fadeIn(100);
}

function gameover(){
    var audio=new Audio("./sounds/wrong.mp3")
    audio.play()
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200)
    $("#level-title").text("Game Over,Press any Key to restart");
    started=false;
    level=0;
    gamePattern = [];
    
}

function checkPattern(){
        
        if(gamePattern[currentclick]===userClickedPattern[currentclick]){
        }
        else{
            gameover();
            return;
        }

        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                if(diff==="Hard"){

                    sequenceGenerator()
                }
                else{
                    sequenceGenerator_Easy();
                }
            },1300)
        }
    currentclick++;
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}


function clickanimation(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },100)
}


$(".btn").on("click",function(){
    if(started){
    var clickedColor=this.id;
    clickanimation(clickedColor);
    playSound(clickedColor);
    userClickedPattern.push(clickedColor);
    checkPattern();
    }
})


$(".begin").on("click",function(){
    if(diff ==="Hard"){
        if (!started) {
            setTimeout(function(){
                sequenceGenerator();
            },500)
            started = true;
        }
    }
    else{
        if (!started) {
            setTimeout(function () {
                sequenceGenerator_Easy();
            }, 500)
            started = true;
        }
    }
})

$(window).on("keydown",function(){
    if (diff === "Hard") {
        if (!started) {
            setTimeout(function () {
                sequenceGenerator();
            }, 500)
            started = true;
        }
    }
    else {
        if (!started) {
            setTimeout(function () {
                sequenceGenerator_Easy();
            }, 500)
            started = true;
        }
    }
})



$('#difficulty-button').click(function () {
    $('#difficulty-modal').show();
    
});

$('#apply-difficulty').click(function () {
    let selectedDifficulty = $('input[name="difficulty"]:checked').val();

    if (selectedDifficulty === 'easy') {
        diff = "Easy"
        $("#difficulty-button").html("Difficulty: Easy");
    } else if (selectedDifficulty === 'hard') {
        diff = "Hard"
        $("#difficulty-button").html("Difficulty: Hard");
    }
    $("#level-title").text("Press any Key to restart");
    started = false;
    level = 0;
    gamePattern = [];

    $('#difficulty-modal').hide();
});

$(window).click(function (event) {
    if (event.target.id === "difficulty-modal") {
        $('#difficulty-modal').hide();
    }
});
