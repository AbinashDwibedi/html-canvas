const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#000";

const ctx = canvas.getContext("2d");

class Ball {
  constructor(xPos, yPos, radius, bgColor = "black",speed) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.bgColor = bgColor;
    this.dx = speed;
    this.dy = speed;
  }
  createBall(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.bgColor;
    ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
let number = 100;
let balls = [];

function generateCoordinates(radius){
    let xPos = radius+ Math.floor(Math.random()*(window.innerWidth-2*radius));
    let yPos = radius + Math.floor(Math.random()*(window.innerHeight-2*radius));
    return {xPos,yPos};
}   

function createBalls() {
  for (let i = 0; i < number; i++) {
    let bgColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)})`;
    let radius = Math.floor(Math.random() * 100);
    const {xPos, yPos} = generateCoordinates(radius);
    balls.push(new Ball(xPos,yPos,radius,bgColor,2 + 10*Math.random()));
    balls[i].createBall(ctx);
  }
}
createBalls();

function animate(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    for(let i = 0 ; i < balls.length; i++){
        balls[i].xPos += balls[i].dx;
        balls[i].yPos += balls[i].dy;
        if((balls[i].xPos-balls[i].radius)< 0 || (balls[i].xPos+balls[i].radius)> window.innerWidth){
            balls[i].dx = -balls[i].dx;
        }
        if((balls[i].yPos-balls[i].radius)< 0 || (balls[i].yPos+balls[i].radius)> window.innerHeight){
            balls[i].dy = -balls[i].dy;
        }
         
        balls[i].createBall(ctx);
        
    }
    requestAnimationFrame(animate);
}
animate()
