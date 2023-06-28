/*
1- transparent game scor 
2- timer 
3- start menu
4- lose/ end menu 

*/
/** 
* @type HTMLCanvesElment
*/




let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context; 

let xmax=cols * blockSize;
let xmin=0;
let ymax=0;
let ymin =rows * blockSize;

//head
let snakex= blockSize*5;
let snakey=blockSize*5;

//food
let foodx;
let foody;

//velocity
let vx=0;
let vy=0;

//speeds
let speed=0.2//snake x and y velocity change speed maltblayer 
let gameSpeed=60;

// the game Score
let Score =0;

let snakeBod=[];


//sound
var audio = new Audio('Snake Game Sound.mp3');


//colors
let snakeColor="darkgreen";
let foodcolor="red";



let gameOver = false;







window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;

    context = board.getContext("2d"); //used for drawing on the board

    placefood();
    

    document.addEventListener("keydown",move);

    //this will update it in a loop, the window.onload function only loades at the start of the code its not a loop
    setInterval(update,1000/gameSpeed);
}

function move(e){
    if (gameOver) {
        return;
    }


    let key=e.code
    if(key=="KeyA"&& vx!=0.2){
        vx=-speed;
        vy=0;
        console.log("A")

    }else if(key=="KeyS"&&vy!=-0.2){
        vx=0;
        vy=speed;
        console.log("S")

    }else if(key=="KeyD"&&vx!=-0.2){
        vx=speed;
        vy=0;
        console.log("D")
        
    }else if(key=="KeyW"&&vy!=0.2){
        vx=0;
        vy=-speed;
        console.log("W")
        
    }

    for (let i = 0; i < snakeBod.length; i++) {
        if (snakex == snakeBod[i][0] && snakey == snakeBod[i][1]) {
            gameOver = true;
            alert("Game Over");
            vx=0;
            vy=0;
        }
    }


}



function update(){
    
    console.log("x= "+snakex,"\ny= "+snakey);

    context.fillStyle="black";
    context.fillRect(0,0,board.width, board.height);

    //text
    

    //context.strokeStyle="white";
    //context.strokeText(Score<10 ? "0"+Score:Score,board.width/3,board.height/1.8)
    //context.fontWidth=1


    //the top code will give a diff style for Score bord

    context.font = "bold 150px monospace,Cursive ";
    context.fillStyle="white";
    
    context.globalAlpha = 0.5;

    context.fillText(Score<10 ? "0"+Score:Score,board.width/3,board.height/1.8)

    
    





    context.globalAlpha = 1;// if this line was removed the game will have a ghosting effect


    context.fillStyle=foodcolor;
    context.fillRect(foodx, foody,blockSize,blockSize);

    context.fillStyle=snakeColor;
    context.fillRect(snakex, snakey,blockSize,blockSize);

    //the box collegern for the snake and the food

    if(snakex+blockSize>=foodx&&snakex<=foodx+blockSize&&snakey+blockSize>=foody&&snakey<=foody+blockSize){
        //context.fillStyle="darkgreen";
        snakeBod.push([foodx,foody]);
        //context.fillStyle="red";
        placefood();
        
        goal();
        audio.play();
        
        
        console.log(Score )

    }else{console.log("nothing is happining")}
    

    for (let i = 0; i < snakeBod.length; i++) {context.fillRect(snakeBod[i][0], snakeBod[i][1], blockSize, blockSize);}

    for (let i = snakeBod.length-1; i > 0; i--) {
        snakeBod[i] = snakeBod[i-1];
    } if (snakeBod.length) {
        snakeBod[0] = [snakex, snakey];
    }


    //border collegern   
    //this was treppy up is down and down is up
      if(snakex<=xmin){
         snakex=xmax;
         vx=-speed;
         vy=0
      }else if(snakex >=xmax){
         snakex=xmin;
         vx=speed;
         vy=0
        }else if(snakey <=ymax){
             snakey=ymin;
             vy=-speed;
             vx=0;
         }else if(snakey >=ymin){
         snakey=ymax;
         vy=speed;
         vx=0;
     }





    snakex+=vx* blockSize;
    snakey+=vy* blockSize;

    document.getElementById("goal").innerHTML="score : "+Score;
    
    
}


function goal(){
    Score +=1;
}

function placefood(){
    foodx=Math.floor(Math.random()*cols)*blockSize;
    foody=Math.floor(Math.random()*rows)*blockSize;
    
    

}


