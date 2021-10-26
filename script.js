const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let soundStep = new Audio('./sound/SFsteps.mpeg')

let picBackground = new Image();
    picBackground.src = "./pic/BG.jpg";
let picPlayerRight = new Image();    
    picPlayerRight.src = "./pic/SFright.png";
    picPlayerLeft = new Image();    
    picPlayerLeft.src = "./pic/SFleft.png";
let arrPicPlayer=[];
    arrPicPlayer['left']=picPlayerLeft;
    arrPicPlayer['right']=picPlayerRight;

let picEnemyRight = new Image();
    picEnemyRight.src = "./pic/PudgeL.png";
    picEnemyLeft = new Image();
    picEnemyLeft.src = "./pic/PudgeL.png";
let arrPicEnemy=[];
    arrPicEnemy['left']=picEnemyLeft;
    arrPicEnemy['right']=picEnemyRight;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function resizeImg(img, percent){
    let prop;
    if(img.width>img.height){
        prop = img.width/img.height;
        img.height =window.innerHeight*percent/100;
        img.width = img.height*prop;
    }else{
        prop = img.height/img.width;
        img.width =window.innerHeight*percent/100;
        img.height = img.width*prop;
    }
    
}
let startGame = false;
let xPlayer = 50, yPlayer = 600, speedPlayer= 5, navPlayer = 'right',
    xEnemy = 800, yEnemy = 650,speedEnemy = 5, navEnemy = 'left'

function draw(){
    let picPlayer = arrPicPlayer[navPlayer]
    let picEnemy = arrPicEnemy[navEnemy]
    resizeImg(picPlayer,8)
    resizeImg(picEnemy,8)

    function startPosition(){
        xPlayer = window.innerWidth*0.05;
        yPlayer = window.innerHeight*0.7;
    }

    function moveEnemy(){
        let timerMoveEnemy = setTimeout(()=>{
            if(xEnemy>(xPlayer+picPlayer.width)){
                xEnemy --;
                navEnemy='left'
            } else if((xEnemy+picEnemy.width)<xPlayer){
                xEnemy++;
                navEnemy='right'
            }
            draw();
            moveEnemy();
        },speedEnemy);
    }
    if(startGame){
        moveEnemy();
        startGame=false;
    }
    ctx.drawImage(picBackground, 0, 0, window.innerWidth, window.innerHeight)
    ctx.drawImage(picPlayer, xPlayer, yPlayer, picPlayer.width, picPlayer.height)
    ctx.drawImage(picEnemy, xEnemy, yEnemy, picEnemy.width, picEnemy.height)

}

picBackground.onload = draw;
picPlayerLeft.onload = draw;
picPlayerRight.onload= draw;
picEnemyLeft.onload = draw;
picEnemyRight.onload = draw;

document.addEventListener('keydown', (event)=>{
    let KeyPressed = event.code;
    switch(KeyPressed){
        case 'ArrowLeft':
        xPlayer-=speedPlayer;
        navPlayer='left'
        soundStep.play();    
        break;
        case 'ArrowRight':
        xPlayer+=speedPlayer;
        navPlayer='right'
        soundStep.play();
        break;
        case 'ArrowUp':
        yPlayer-=speedPlayer;
        soundStep.play();
        break;
        case 'ArrowDown':
        yPlayer+=speedPlayer;
        soundStep.play();    
        break;
        case 'Enter':
            startGame=true;
            break;
    }
    draw();
});

document.addEventListener('keyup', (event)=>{
    let KeyPressed = event.code;
    switch(KeyPressed){
        case 'ArrowLeft':
        soundStep.pause();    
        break;
        case 'ArrowRight':

        soundStep.pause();
        break;
        case 'ArrowUp':

        soundStep.pause();
        break;
        case 'ArrowDown':
 
        soundStep.pause();    
        break;
    }
    draw();
});