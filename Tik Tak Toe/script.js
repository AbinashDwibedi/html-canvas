const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

canvas.style.backgroundColor = "#000";

const ctx = canvas.getContext("2d");

class Btn {
  constructor(name, xPos, yPos, maxWidth, lineWidth) {
    this.name = name;
    this.xPos = xPos;
    this.yPos = yPos;
    this.maxWidth = maxWidth;
    this.lineWidth = lineWidth;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.globalCompositeOperation = "destination-over";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.font = "30px sans-serif";
    ctx.fillText(
      this.name,
      this.xPos,
      this.yPos + 10,
      this.maxWidth
    );
    ctx.moveTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos + this.maxWidth, this.yPos);
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}

class newBtnStyle{
    constructor(
      xPos,
      yPos,
      width,
      height,
      color,
      text
    ){
      this.xPos = xPos;
      this.yPos = yPos;
      this.width = width;
      this.height = height;
      this.color = color;
      this.text =text;
    }
    draw(ctx){
      ctx.beginPath();
       ctx.fillStyle = "white";
       ctx.font = "30px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(this.text,this.xPos+this.width/2,this.yPos+this.height/2,this.width);
      // ctx.fill();
      ctx.closePath();
      // ctx.globalCompositeOperation = "destination-over"
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.xPos,this.yPos,this.width,this.height);
      ctx.closePath();
      
    }
}



function gameHomeScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  // ctx.rect(canvas.width/2-150,canvas.height/3,300,200)
  const gradient = ctx.createLinearGradient(
    canvas.width / 2 - 200,
    canvas.height / 3,
    canvas.width / 2,
    canvas.height / 3
  );
  gradient.addColorStop(0, "red");
  gradient.addColorStop(0.5, "purple");
  ctx.fillStyle = gradient;
  ctx.font = "50px sans-serif";
  ctx.fillText("Tic-Tac-Toe", canvas.width / 2 - 120, canvas.height / 3, 400);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  // ctx.strokeStyle = "white";
  // ctx.moveTo(canvas.width/2-100,canvas.height/2+25);
  // ctx.lineTo(canvas.width/2+100,canvas.height/2+25);
  // ctx.fillStyle = "white";
  // ctx.font = "25px sans-serif";
  let textX = canvas.width / 2 - 50;
  let textY = canvas.height / 2;
  let textWidth = 100
  let textPadding = 40
  // ctx.fillText("start game",textX,canvas.height/2,100);

  // ctx.lineWidth = 40;
  // ctx.lineCap = "round"
  // ctx.fill();
  const btn = new Btn("start game", textX, textY, textWidth, textPadding);
  btn.draw(ctx);
  const handleGameStart = (event) => {
    if (
      event.clientX > textX-textPadding/2 &&
      event.clientX < textX + textWidth+textPadding/2 &&
      event.clientY > textY -textPadding/2 &&
      event.clientY < textY + textPadding/2
    ) {
      startGame();
      canvas.removeEventListener("click", handleGameStart);
    }
  };
  canvas.addEventListener("click", handleGameStart);
  // ctx.stroke();
  ctx.closePath();
}
gameHomeScreen();
function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const length = 150;
  const x = canvas.width / 2 - length;
  const y = canvas.height / 2 - length;
  // console.log(x,y)
  const origin = { x, y };
  // console.log(origin)
  ctx.save();
  ctx.translate(origin["x"], origin["y"]);
  ctx.strokeStyle = "gray";
  ctx.beginPath();

  ctx.lineWidth = 4;
  ctx.rect(0, 0, length * 2, length * 2);
  ctx.stroke();
  ctx.closePath();
  //grid start's from hered
  //x axis grid
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    ctx.moveTo(0, i * ((length * 2) / 3));
    ctx.lineTo(length * 2, i * ((length * 2) / 3));
  }
  for (let i = 0; i < 3; i++) {
    ctx.moveTo(i * ((length * 2) / 3), 0);
    ctx.lineTo(i * ((length * 2) / 3), length * 2);
  }
  ctx.stroke();
  ctx.closePath();
  // ctx.beginPath();
  // ctx.fillStyle = "red";
  // ctx.fillText("home", length - 30, length * 2 + 50, length);
  // ctx.closePath();
  const homeBtn = new Btn("home", length - 30, length * 2 + 50, length/2, 40);
  homeBtn.draw(ctx);
  const StartGameBtn = new newBtnStyle(length-length/2-20,length * 2 + 80,length+40,50,"blue","start game");
   StartGameBtn.draw(ctx)
  ctx.restore();  
  canvas.addEventListener("click", handleGameEvents);
  function handleGameEvents(event) {
    if(event.clientX>(canvas.width/2 - 30 -20)&& event.clientX<(20 +canvas.width/2  - 30+ length/2) && event.clientY>(canvas.height/2 + (length + 30)) && event.clientY< canvas.height/2 + (length +68)){
        canvas.removeEventListener("click", handleGameEvents)
        gameHomeScreen();
    }
    if(event.clientX>(canvas.width/2 -length/2-20) && event.clientX<(canvas.width/2 +length/2+20) && event.clientY> (canvas.height/2 -length + length * 2 + 80) && event.clientY < (canvas.height/2 -length + length * 2 + 80 +50) ){
       
    }
  }
}
