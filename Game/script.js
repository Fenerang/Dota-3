const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let picBackground = new Image();
    picBackground.src = "./pic/BG.jpg";
let picPlayer = new Image();    
    picPlayer.src = "./pic/Jotaro.png";
let picEnemy = new Image();
    picEnemy.src = "./pic/Dio.png"


ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function draw(){
    ctx.drawImage(picBackground, 0, 0, window.innerWidth, window.innerHeight)
    ctx.drawImage(picPlayer, 50, 600, picPlayer.width/4, picPlayer.height/4)
    ctx.drawImage(picEnemy, 800, 650, picEnemy.width/3, picEnemy.height/3)
  
}

picBackground.onload = draw;
picPlayer.onload = draw;
picEnemy.onload = draw;