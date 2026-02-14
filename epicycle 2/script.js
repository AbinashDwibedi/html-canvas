const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#000"
const ctx = canvas.getContext("2d");

class Circles {
    constructor(
        xPos,
        yPos,
        // radius,
        color,
        noEpicycles,
        amplitude,
        time
    ){
        this.xPos = xPos;
        this.yPos = yPos;
        // this.radius = radius;
        this.color = color;
        this.noEpicycles = noEpicycles;
        this.amplitude = amplitude;
        this.time = time;
        this.waves = [];
    }
    drawCircles(ctx){
        let currentX = this.xPos;
        let currentY = this.yPos;
        for(let i = 0 ; i <this.noEpicycles ; i++){
            let n = 2*i +1;
            let radius = (4/(n*Math.PI))*this.amplitude;
            let prevX = currentX;
            let prevY = currentY;
            currentX += radius*Math.cos(n*this.time);
            currentY += radius*Math.sin(n*this.time);

            ctx.beginPath();
            const grad = ctx.createRadialGradient(prevX,prevX,0,prevX , prevY,radius);
            grad.addColorStop(0,"cyan");
            grad.addColorStop(1,"lime");
            ctx.strokeStyle = grad;
            ctx.arc(prevX,prevY,radius,0,2*Math.PI);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.moveTo(prevX , prevY);
            ctx.lineTo(currentX,currentY);
            ctx.stroke();
            ctx.closePath();
           
        }
        return {x:currentX,y:currentY}

    }
    animateEpicycles(ctx){
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.time+=0.05;
        const {x,y} = this.drawCircles(ctx);
        this.waves.unshift(y);
        ctx.save();
        ctx.beginPath();
        ctx.translate(400, 0)
        ctx.strokeStyle = this.color;
        for(let i=0;i<this.waves.length;i++){
            ctx.lineTo(i,this.waves[i]);
        }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}


const circles = new Circles(200,200,"green",5,100,1);
circles.drawCircles(ctx);

function animate(){
    circles.animateEpicycles(ctx);
    requestAnimationFrame(animate);
}
animate();