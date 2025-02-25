// const canvas = document.getElementById("myCanvas");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// canvas.style.backgroundColor = "#000";

// const ctx = canvas.getContext("2d");

// class Ball{
//     constructor(
//         xPos,
//         yPos,
//         radius,
//         bgColor,
//         speed
//     )
//     {
//         this.xPos = xPos;
//         this.yPos = yPos;
//         this.radius = radius;
//         this.bgColor = bgColor;
//         this.speed = speed;
//     }
//     draw(ctx){
//         ctx.beginPath();
//         ctx.fillStyle = this.bgColor;
//         ctx.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI);
//         ctx.fill();
//         ctx.closePath();
//     }
// }
// const ball = new Ball(200,200,50,"blue",100);
// ball.draw(ctx);

// function animate(){
//     ctx.clearRect(0,0,canvas.width ,canvas.height)
//     ball.draw(ctx)
//     requestAnimationFrame(animate);
// }

// animate();
// window.addEventListener("keypress",(event)=>{
//     if(event.key === "d")
//     {
//         ball.xPos+=ball.speed;
//         // ctx.clearRect(0,0,canvas.width ,canvas.height)
//         // ball.draw(ctx);
//     }
//     if(event.key === "a")
//         {
//             ball.xPos-=ball.speed;
//             // ctx.clearRect(0,0,canvas.width ,canvas.height)
//             // ball.draw(ctx);
//         }
//         if(event.key === "w")
//             {
//                 ball.yPos-=ball.speed;
//                 // ctx.clearRect(0,0,canvas.width ,canvas.height)
//                 // ball.draw(ctx);
//             }
//             if(event.key === "s")
//                 {
//                     ball.yPos+=ball.speed;
//                     // ctx.clearRect(0,0,canvas.width ,canvas.height)
//                     // ball.draw(ctx);
//                 }
                
// })

const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#000";

const ctx = canvas.getContext("2d");

class Ball {
    constructor(xPos, yPos, radius, bgColor, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.bgColor = bgColor;
        this.speed = speed;
        this.dx = 0; // Change in x-position
        this.dy = 0; // Change in y-position
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.bgColor;
        ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.xPos += this.dx;
        this.yPos += this.dy;

        // Optional: Prevent the ball from moving outside the canvas
        if (this.xPos - this.radius < 0) this.xPos = this.radius;
        if (this.xPos + this.radius > canvas.width) this.xPos = canvas.width - this.radius;
        if (this.yPos - this.radius < 0) this.yPos = this.radius;
        if (this.yPos + this.radius > canvas.height) this.yPos = canvas.height - this.radius;
    }
}

const ball = new Ball(200, 200, 50, "blue", 5);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();
    ball.draw(ctx);
    requestAnimationFrame(animate);
}

animate();

// Update ball's direction based on keypress
window.addEventListener("keydown", (event) => {
    if (event.key === "d") ball.dx = ball.speed; // Move right
    if (event.key === "a") ball.dx = -ball.speed; // Move left
    if (event.key === "w") ball.dy = -ball.speed; // Move up
    if (event.key === "s") ball.dy = ball.speed; // Move down
});

// Stop movement when the key is released
window.addEventListener("keyup", (event) => {
    if (["d", "a"].includes(event.key)) ball.dx = 0;
    if (["w", "s"].includes(event.key)) ball.dy = 0;
});
