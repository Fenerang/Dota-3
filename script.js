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

let picLife = new Image();
    picLife.src = "./pic/Heart.png"

let picRuna = new Image();
picRuna.src = "./pic/Runa.png"


ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function generateRandomPosition(pic,xMin,xMax,yMin,yMax){
    let x = Math.random()*((xMax-pic.width)-xMin)+xMin,
    y = Math.random()*((yMax-pic.height)-yMin)+yMin;
    return [x, y];
}

let positionRuna=[0,0];
function newPositionRuna(){
    positionRuna=generateRandomPosition(picRuna,0,innerWidth,window.innerHeight*0.7,innerHeight*0.193)
}

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
let xPlayer = 50, yPlayer = 600, speedPlayer= 10, navPlayer = 'right',
    xEnemy = 800, yEnemy = 650,speedEnemy = 10, navEnemy = 'left',boardPicPlayer=0,boardPicEnemy=0,
    countLife=5,
    countRuna=0,
    boardPicRuna;

function boardPic(pic, x, y){
    let picRight, picBottom;
    picRight = x + pic.width;
    picBottom = y + pic.height;
    return [picRight, picBottom];        
    }

function checkCollision(x1,x2,y1,y2,r1,r2,b1,b2){
    if(r1>x2 && r2>x1 && b1>y2 && b2>y1){
        return true;
    }
    else{
        return false;
    }
}

function draw(){
    let picPlayer = arrPicPlayer[navPlayer]
    let picEnemy = arrPicEnemy[navEnemy]
    resizeImg(picPlayer,8)
    resizeImg(picEnemy,8)
    resizeImg(picLife,5)
    resizeImg(picRuna,5)
     boardPicPlayer = boardPic(picPlayer, xPlayer, yPlayer);
   
     boardPicEnemy = boardPic(picEnemy, xEnemy, yEnemy);

     boardPicRuna = boardPic(picRuna,positionRuna[0],positionRuna[1])

    function startPosition(){
        xPlayer = window.innerWidth*0.05;
        yPlayer = window.innerHeight*0.7;
        xEnemy = window.innerWidth*0.65;
        yEnemy = window.innerHeight*0.7;
    }

    function moveEnemy(){
        function collisionEnemy(){
            if(checkCollision(xPlayer,xEnemy,yPlayer,yEnemy,boardPicPlayer[0],boardPicEnemy[0],boardPicPlayer[1],boardPicEnemy[1])){
                countLife--;
                if (countLife<=0){
                    let NewGame=confirm('GG WP:(\n Начать заново?)')
                    if (NewGame){
                        countLife=5;
                    }
                    else{
                        clearTimeout(timerMoveEnemy);
                        startPosition();
                        return;
                    }
                }
                startPosition();
            }
        }
        collisionEnemy();
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
        startPosition();
        newPositionRuna();
        moveEnemy();
        startGame=false;
    }
    ctx.drawImage(picBackground, 0, 0, window.innerWidth, window.innerHeight)
    ctx.drawImage(picPlayer, xPlayer, yPlayer, picPlayer.width, picPlayer.height)
    ctx.drawImage(picEnemy, xEnemy, yEnemy, picEnemy.width, picEnemy.height)
    for(let i=0; i<countLife;i++){
        let yLife=innerHeight*0.1
        let xLife=innerWidth*0.05+picLife.width*i;
    ctx.drawImage(picLife, xLife, yLife, picLife.width, picLife.height)
    ctx.drawImage(picRuna, positionRuna[0], positionRuna[1], picRuna.width, picRuna.height)
    }
    function collisionRuna(){
        if(checkCollision(xPlayer,positionRuna[0],yPlayer,positionRuna[1],boardPicPlayer[0],boardPicRuna[0],boardPicPlayer[1],boardPicRuna[1])){
            countRuna++;
            newPositionRuna();
        }
    }
    collisionRuna();
    function printText(text,x,y,size,color){
        ctx.font = size+"px Curlz MT";
        ctx.fillStyle = color;
        ctx.fillText(text,x,y)
    }
    printText("Count ="+countRuna,innerWidth*0.05,innerHeight*0.1,innerHeight*0.03,"#ccccff")
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