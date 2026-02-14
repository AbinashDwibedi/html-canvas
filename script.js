// // Set up the canvas and context
function wave(){
    const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let time = 0;
const path = [];
const numEpicycles = 5 // Number of epicycles for sine wave
const wave = []; // Store points of the sine wave
const amplitude = 100; // Amplitude of the sine wave
const frequency = 1; // Frequency of the sine wave
const waveSpeed = 3; // Speed at which the wave moves to the right

// Draw epicycles on the left side to generate sine wave
function drawEpicycles(x, y, rotation, numEpicycles) {
  for (let i = 0; i < numEpicycles; i++) {
    const n = i * 2 + 1; // Odd harmonics for sine wave (1st, 3rd, 5th harmonic)
    const radius = (4 / (n * Math.PI)) * amplitude; // Fourier series coefficients for sine wave
    const prevX = x;
    const prevY = y;
    x += radius * Math.cos(n * time + rotation);
    y += radius * Math.sin(n * time + rotation);
    // Draw the epicycle (circle)
    ctx.beginPath();
    ctx.arc(prevX, prevY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.stroke();
    // Draw the line connecting circles
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }
  return { x, y };
}
// Animation function to create sine wave and move it to the right
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw epicycles on the left side
  const { x, y } = drawEpicycles(200, canvas.height / 2, 0, numEpicycles);
  // Draw line from the tip of the last epicycle to the right
  wave.unshift(y); // Add the new point to the wave/
  // Draw the wave
  ctx.beginPath();
  for (let i = 0; i < wave.length; i++) {
    ctx.lineTo(200 + i * waveSpeed, wave[i]);
  }
  ctx.strokeStyle = 'cyan';
  ctx.lineWidth = 2;
  ctx.stroke();
  // Remove points that move off the screen
  if (wave.length > canvas.width / waveSpeed) {
    wave.pop();
  }
  // Increment time for the next frame
  time += 0.05;
  requestAnimationFrame(animate);
}
// Start the animation
animate();
}
wave();

let h = 0;

// const canvas = document.getElementById('canvas');
// const context = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// let time = 0 ;

// function draw() {
//     context.clearRect(0, 0, window.innerWidth  , window.innerHeight);
//     let radius =50;
//     context.arc(x, y, radius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, anticlockwise);

// }

// function setup() {
//     createCanvas(400, 400, WEBGL);
//   }

//   function draw() {
//     background(200);
//     rotateX(frameCount * 0.01);
//     rotateY(frameCount * 0.01);
//     box(100);  // 3D cube
//   }

// let time = 0;
// let wave = [];
// function setup(){
//     createCanvas(window.innerWidth , window.innerHeight);
// }

// function draw(){
//     background(0);
//     translate(200,200);
//     let radius = 50;
//     stroke(255);
//     noFill();
//     ellipse(0,0,radius*2)
//     let x = radius*Math.cos(time);
//     let y = radius*Math.sin(time);
//     wave.push(y);
//     fill(255);
//     ellipse(x,y, 9);
//     line(0,0,x,y);
//     translate(200,  0)
//     beginShape();
//     noFill();
//     for (let i = 0 ;i<wave.length;i++){
//         vertex(i, wave[i])
//         // line(0,0,i,wave[i])
//     }
//     endShape();
//     time += .1
//     if(wave.length == 710){
//         wave.pop();
//     }
// }

// let time = 0;
// let wave = [];
// function setup(){
//     createCanvas(window.innerWidth , window.innerHeight);
// }

// function draw(){
//     background(0);
//     translate(200,200);
//     let radius = 50;
//     stroke(255);
//     noFill();
//     ellipse(0,0,radius*2)
//     let x = radius*Math.cos(time);
//     let y = radius*Math.sin(time);
//     wave.unshift(y);
//     fill(255);
//     ellipse(x,y, 9);
//     line(0,0,x,y);
//     translate(200,  0)
//     line(x-200, y , 0,wave[0])
//     beginShape();
//     noFill();
//     for (let i = 0 ;i<wave.length;i++){
//         vertex(i, wave[i])
//         // line(0,0,i,wave[i])
//     }
//     endShape();
//     time += .05
//     if(wave.length == 710){
//         wave.pop();
//     }
// }

// const canvas = document.getElementById('canvas');
// const context = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// let time = 0;
// let waves = [];
// // let maxWavelength = 500;
// context.translate(200,200)

// class Circe{
//     constructor(xPos, yPos, radius,){

//     }
// }

// function draw (){
//     context.clearRect(-200, -200, window.innerWidth, window.innerHeight);
//     context.beginPath();
//     context.arc(0, 0, 100, 0, 2*Math.PI, false);
//     context.strokeStyle = "blue";
//     context.lineWidth = 5;
//     context.fillStyle = "black"
//     context.fill();
//     context.stroke();
//     context.closePath();

//     let x = 100*Math.cos(time);
//     let y = 100*Math.sin(time);
//     waves.unshift(y);
//     if(window.innerWidth-600 < waves.length){
//         waves.pop();
//     }

//     context.beginPath();
//     context.arc(x,y,10, 0, 2*Math.PI,false);
//     context.strokeStyle = "red";
//     context.stroke();
//     context.closePath();

//     context.save();
//     context.translate(200,0);

//     context.beginPath();
//     context.moveTo(x-200,y);
//     context.lineTo(0, waves[0])
//     context.strokeStyle="cyan";
//     context.lineCap='round';
//     context.stroke();
//     context.closePath();

//     context.beginPath();
//     context.strokeStyle = "lime";
//     for(let i = 0;i<waves.length ;i++){
//         context.moveTo(i, waves[i]);
//         context.lineTo(i+1,waves[i+1]);
//     }
//     context.stroke();
//     context.closePath();
//     context.restore();
//     time+=0.03;
//     requestAnimationFrame(draw);
// }
// draw()

// const canvas = document.getElementById("canvas");
// const context = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// let time = 0;
// let amplitude = 100;
// let numEpicycles = 1000;
// let waves = [];

// class Circle {
//   constructor(xPos, yPos, numEpicycles) {
//     this.xPos = xPos;
//     this.yPos = yPos;
//     this.numEpicycles = numEpicycles;
//   }
//   draw(context) {
//     let currentX = this.xPos;
//     let currentY = this.yPos;

//     for (let i = 1; i <= this.numEpicycles; i++) {
//     //   let fr = 2 * i + 1;
//     //   let radius = (4 / (Math.PI * fr)) * amplitude;
//     let radius = (2*amplitude)/(Math.PI*i);

//       let prevX = currentX;
//       let prevY = currentY;

//       // Updating the center position for the next epicycle
//     //   currentX += radius * Math.cos(fr * time);
//     //   currentY += radius * Math.sin(fr * time);
//         currentX += radius* Math.pow(-1,i+1) * Math.cos(i*time);
//         currentY += radius* Math.pow(-1,i+1) * Math.sin(i*time) ;
//       // Rendering circle
//       context.beginPath();
//       context.arc(prevX, prevY, radius, 0, 2 * Math.PI, false);
//       context.strokeStyle = "rgba(12, 34, 35, 0.5)";
//       context.stroke();
//       context.closePath();

//       // Rendering line
//       context.beginPath();
//       context.moveTo(prevX, prevY);
//       context.lineTo(currentX, currentY);
//       context.strokeStyle = "cyan";
//       context.stroke();
//       context.closePath();
//     }
//     context.save();
//     context.translate(500, 0);

//     context.beginPath();
//     context.moveTo(currentX-500 , currentY);
//     context.lineTo(0 , waves[0]);
//     context.strokeStyle = "white";
//     context.stroke();
//     context.closePath();

//     context.beginPath();
//     context.moveTo(0, 0);
//     context.lineTo(0, window.innerHeight);
//     context.moveTo(0,window.innerHeight/2);
//     context.lineTo(window.innerWidth, window.innerHeight/2);
//     context.strokeStyle = "blue";
//     context.stroke();
//     context.closePath();

//     context.beginPath();
//     for (let i = 1; i <= waves.length; i++) {
//       context.moveTo(i, waves[i]);
//       context.lineTo(i + 1, waves[i + 1]);
//     }
//     context.lineCap = "round"
//     context.strokeStyle = "red";
//     context.lineWidth = 2
//     context.stroke();
//     context.closePath();

//     context.restore();
//     waves.unshift(currentY);

//   }
//   animate(context) {
//     context.clearRect(0, 0, window.innerWidth, window.innerHeight);
//     this.draw(context);
//   }
// }

// const circle = new Circle(200, window.innerHeight / 2, numEpicycles);
// circle.draw(context);

// function animate() {
//   circle.animate(context);
//   time += 0.02; // Increase time step for smoother animation
//   requestAnimationFrame(animate);
// }

// animate();

// let time = 0;
// let waves = [];

// function draw() {
//   context.clearRect(-200, -200, window.innerWidth, window.innerHeight);
//   context.save();
//   context.beginPath();
//   context.translate(200, 200);
//   context.strokeStyle = "red";
//   context.lineWidth = 6;
//   context.arc(0, 0, 100, 0, 2 * Math.PI, false);
//   context.stroke();
//   context.closePath();

//   context.beginPath();
//   context.strokeStyle = "cyan";
//   let x = 100*Math.cos(time);
//   let y = 100*Math.sin(time);
//   waves.unshift(y);
//   context.arc(x, y , 10 ,  0 , 2*Math.PI , false);
//   context.lineWidth = 5;
//   context.stroke();
//   context.closePath();
//   context.save();
//   context.translate(200 , 0);

//   context.beginPath();
//   context.strokeStyle = "lime";
//   context.moveTo(x-200 , y);
//   context.lineTo( 0, waves[0]);  
//   context.lineCap = 10
//   context.stroke();
//   context.closePath();

//   context.beginPath();
//   // context.moveTo(0 , waves[0]);
//   context.strokeStyle = "pink";
//   for(let i = waves.length ;i>0 ; i--){
//     context.lineTo(i,waves[i]);
    
//   }

//   context.stroke();
//   context.closePath();
//   context.restore();
//   context.restore();
//   time += 0.1;
//   requestAnimationFrame(draw);
// }
// draw();

