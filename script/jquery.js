var playing=false;
var score;
var lives=3;
var action;
var level=1
fruits=['apple','banana','grapes','guava','mango','orange','peach','pineapple','strawberry','watermelon'];
$(function(){
    $("#startreset").click(function(){
        if(playing==true){
            location.reload()
        }else{
            playing=true;
            score=0;
            $("#gameover").hide();
            $("#scorevalue").html(score)
            $(this).html('reset');
            addLives();
            startGame(); 
        }
    })

    $("#fruit1").mouseover(function(){
        score++;
        level= Math.round(1+(score/10));
        console.log(level)
        $("#slicesound")[0].play();
        $("#scorevalue").html(score);
        clearInterval(action);
        $("#fruit1").hide("explode",300);
        setTimeout(startGame,300);
    });


function addLives(){
    $("#lives").empty()
    $("#lives").show()
    for(i=0;i<lives;i++){
        $("#lives").append('<img src="images/heart.png" class="heart">');
    }
}

function startGame(){
    
    chooseFruit()
    $(".fruit").show()
    $("#fruit1").css({
        'left': (700*Math.random()),
        'top':-50
    });
    step=level+Math.round(Math.random());

    action=setInterval(function(){
        $("#fruit1").css('top',$("#fruit1").position().top+step);
        if($("#fruit1").position().top>$("#fruitcontainer").height()){
            if(lives>1){
                chooseFruit()
                $(".fruit").show()
                $("#fruit1").css({
                    'left': (750*Math.random()),
                    'top':-50
                });
                step=level+Math.round(Math.random());
                lives--;
                addLives();

               }else{
                playing=false;
                $("#startreset").html("start game")
                $("#gameover").show();
                $("#gameover").html(`<p>Game Over</p><p>Your Score is: ${score}</p>`)
                stopGame();
            }
        }
    },10)
}

function chooseFruit(){
    $("#fruit1").attr('src','images/'+fruits[Math.round(9*(Math.random()))]+'.png');
}

function stopGame(){
    clearInterval(action);
    $(".fruit").hide();
    $("#lives").hide();
}

})