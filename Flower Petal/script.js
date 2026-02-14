const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.backgroundColor = "#000";

const ctx = canvas.getContext("2d");

class Ball {
    constructor(
        xPos,
        yPos,
        radius,
        bgColor,
        borderColor="gray"
    ){
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.bgColor = bgColor;
        this.borderColor = borderColor;
        // console.log(xPos,yPos)

    }
    drawBall(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.bgColor;
        ctx.strokeStyle = this.borderColor;
        ctx.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI);
        ctx.lineWidth = 4;
        ctx.fill();
        ctx.stroke();
    }
}

function createPetal(){
    const ball = new Ball(window.innerWidth/2,window.innerHeight/2,10,"blue");
// ball.drawBall(ctx);



let angle = 0;
let scale = 10;
let number = 0;
let radius = 0;
let hsl = 0;
let randomNumber = 1;

const inputField = document.getElementById("number");
inputField.addEventListener("input",(e)=>{
    randomNumber = inputField.value;
})
function animateBall(){
    hsl +=10
    angle=number*randomNumber;
    radius=scale*Math.sqrt(number)
    number++
    ball.xPos += radius*Math.cos(angle);
    ball.yPos += radius*Math.sin(angle);
    ball.bgColor = `hsl(${hsl},100%,50%)`
    ball.drawBall(ctx);
    requestAnimationFrame(animateBall);
}
animateBall()
}
createPetal();
