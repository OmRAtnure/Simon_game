var btnColor=["red","blue","green","yellow"]
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var currentclick=0;
var started = false;

function sequenceGenerator(){
    var n=Math.floor(Math.random()*4);
    var randomChosenColour=btnColor[n];
    gamePattern.push(randomChosenColour);
    animation(randomChosenColour);
    playSound(randomChosenColour);  
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
    })
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
                sequenceGenerator()
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
    if (!started) {
        sequenceGenerator();
        started = true;
    }
})

$(window).on("keydown",function(){
    if(!started){
    sequenceGenerator();
    started=true;
    }
})











// $(".btn").on("click",function(){
//     var currentColor=this.
// })




