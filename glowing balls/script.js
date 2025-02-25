const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#000";

const ctx = canvas.getContext("2d");
// ctx.globalCompositeOperation="destination-over";

// class Ball {
//     constructor(
//         xPos,
//         yPos,
//         radius,
//         bgColor,
//         speed,
//     )
//     {
//         this.xPos = xPos;
//         this.yPos = yPos;
//         this.radius = radius;
//         this.bgColor = bgColor;
//         this.speed = speed;
//     }
//     drawBall(ctx){
//         ctx.beginPath();
//         ctx.shadowBlur = 20;
//         ctx.shadowColor = this.bgColor;
//         ctx.fillStyle = this.bgColor;
//         ctx.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI);
//         ctx.fill();
//         ctx.closePath();
//         ctx.shadowBlur = 0;
//     }
// }

// const numberOfBalls = 100;
// const balls = [];

// function generateCoordinates(radius){
//     let xPos = radius + Math.floor(Math.random()*(window.innerWidth - 2*radius));
//     let yPos = radius + Math.floor(Math.random()*(window.innerWidth - 2*radius));
//     return {xPos,yPos}
// }

// function generateBallAtRandomPosition(){
//     for(let i = 0 ;i<numberOfBalls;i++){
//         let radius = 1 + Math.floor(10*Math.random());
//         let {xPos, yPos} = generateCoordinates(radius);
//         let bgColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
//         balls.push(new Ball(xPos,yPos,radius,bgColor,0.1));
//         balls[i].drawBall(ctx);
//     }
// }

// generateBallAtRandomPosition()

// function animateBalls(){
//     ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
//     for(let i = 0 ;i< balls.length ;i++){
//         balls[i].radius+=balls[i].speed;
//         if(balls[i].radius<2 || balls[i].radius >10){
//             balls[i].speed = -balls[i].speed
//         }
//         balls[i].drawBall(ctx)
//     }
//     requestAnimationFrame(animateBalls);
// }
// animateBalls()

// Function to draw a star

// function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color = "blue") {
//     let rotation = Math.PI / 2 * 3;
//     let x = cx;
//     let y = cy;
//     const step = Math.PI / spikes;

//     ctx.beginPath();
//     ctx.moveTo(cx, cy - outerRadius);

//     for (let i = 0; i < spikes; i++) {
//         x = cx + Math.cos(rotation) * outerRadius;
//         y = cy + Math.sin(rotation) * outerRadius;
//         ctx.lineTo(x, y);
//         rotation += step;

//         x = cx + Math.cos(rotation) * innerRadius;
//         y = cy + Math.sin(rotation) * innerRadius;
//         ctx.lineTo(x, y);
//         rotation += step;
//     }

//     ctx.lineTo(cx, cy - outerRadius);
//     ctx.closePath();

//     ctx.fillStyle = color;
//     ctx.fill();

//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 2;
//     ctx.stroke();
// }

// // Draw a star at (200, 200) with 5 spikes
// drawStar(ctx, 200, 200, 5, 50, 25, "yellow");


let number = 0;
let scale = 10;
let hue =0;
function drawFlower() {
  
  let angle = number * 0.341;
  let radius = scale*Math.sqrt(number);
  let positionX = radius*Math.cos(angle) + window.innerWidth/2;
  let positionY = radius*Math.sin(angle) + window.innerHeight/2;
  ctx.beginPath();
  ctx.fillStyle = `hsl(${hue} ,100%, 50%)`; 
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 4;
  ctx.arc(positionX, positionY, 9, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  number +=1
  hue++
  console.log(number)
}
function animate() {
  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // angle += 0.1;
  // positionX += 10 * Math.cos(angle);
  // positionY += 10 * Math.sin(angle);

  drawFlower();
  requestAnimationFrame(animate);
}
animate();
