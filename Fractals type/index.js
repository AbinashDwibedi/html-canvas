const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.backgroundColor = "#000"

const ctx = canvas.getContext("2d");

ctx.strokeStyle = "blue";
ctx.fillStyle = "yellow";
ctx.lineWidth = 30;
ctx.lineCap = "round";

let size = 200;
let sides = 10;
let maxLevel = 3;
ctx.save();
ctx.translate(canvas.width/2 ,canvas.height/2);
ctx.scale(1,1);
ctx.rotate(0);

function drawBranch(level){
    if(level > maxLevel){
        return
    }
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(size,0);
    ctx.stroke();
    ctx.translate(100,0);
    ctx.rotate(1.1);
    ctx.scale(0.8,0.8);
    console.log("LFKj")
    drawBranch(level+1);
}
drawBranch(23)

// for(let i =0 ;i<sides;i++){
//     ctx.beginPath();
//     ctx.moveTo(0,0);
//     ctx.lineTo(size,0);
//     ctx.rotate((Math.PI*2)/sides);
//     ctx.stroke();
// }

ctx.restore();

