const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#000";

const ctx = canvas.getContext("2d");

class Ball {
    constructor(xPos, yPos, radius, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.color = color;
    }
    drawBall(ctx) {
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    reachBottom(ctx){
        if(this.yPos <( window.innerHeight - this.radius)){
            this.yPos += 1;
        }
        this.drawBall(ctx);
    }
}

let isMoving = false;

// Event listeners
window.addEventListener("mousedown", startMoving);
window.addEventListener("mousemove", drawCircle);
window.addEventListener("mouseup", stopMoving);

function startMoving() {
    isMoving = true;
}
const ball = new Ball(200, 200, 50, "cyan");
ball.drawBall(ctx);

function drawCircle(event) {
    if (isMoving) {
        ball.xPos = event.clientX;
        ball.yPos = event.clientY;
        ball.drawBall(ctx);
       
    }
}

function stopMoving() {
    isMoving = false;
}
animate();
function animate(){
    ball.reachBottom(ctx);
    requestAnimationFrame(animate)
}

