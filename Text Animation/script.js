const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let particleArray = [];

const mouse ={
    x:null,
    y:null,
    radius:150,
}

window.addEventListener("mousemove",(e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    
})

ctx.fillStyle = "white"
ctx.font = "30px verdana";
ctx.fillText("A",0,40);
ctx.fill();

const data = ctx.getImageData(0,0,80,80);
console.log(data)