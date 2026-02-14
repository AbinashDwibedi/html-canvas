const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.backgroundColor = "black";

// Basic initialization
ctx.strokeStyle = "white";

const division = 3;
const divisionLength = canvas.height / division;
const centerStart = { x: 0, y: canvas.height / 2 };
const centerEnd = { x: canvas.width, y: canvas.height / 2 };

ctx.beginPath();
ctx.moveTo(0, divisionLength);
ctx.lineTo(canvas.width, divisionLength);
ctx.moveTo(0, divisionLength * 2);
ctx.lineTo(canvas.width, divisionLength * 2);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(centerStart.x, centerStart.y);
ctx.lineTo(centerEnd.x, centerEnd.y);
ctx.stroke();
ctx.closePath();

const frequency = 5;
const time = { start: 0, stepSize: 0.1, end: canvas.width };
const amplitude = divisionLength / 2;

// Function to generate the analog signal
function generateAnalogSignal() {
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.moveTo(centerStart.x, centerStart.y);

  const sampledSignal = [];
  for (let i = time.start; i < time.end; i += time.stepSize) {
    let instAmp = amplitude * Math.sin(2 * Math.PI * frequency * (i / canvas.width));
    sampledSignal.push(instAmp);
    ctx.lineTo(i, centerStart.y - instAmp); 
  }
  ctx.stroke();
  ctx.closePath();
  return sampledSignal;
}

// Generate the analog signal
const samples = generateAnalogSignal();
const delta = 5; // Quantization step
const quantizedSignal = Array(samples.length).fill(0);
quantizedSignal[0] = samples[0];

// Function to generate the quantized signal
function generateQuantizedSignal() {
  for (let i = 1; i < samples.length; i++) {
    if (samples[i] > quantizedSignal[i - 1]) {
      quantizedSignal[i] = quantizedSignal[i - 1] + delta;
    } else {
      quantizedSignal[i] = quantizedSignal[i - 1] - delta;
    }
  }
}

// Function to draw the quantized signal
function drawQuantizedSignal() {
  ctx.beginPath();
  ctx.strokeStyle = "yellow";
  ctx.moveTo(centerStart.x, centerStart.y - quantizedSignal[0]);

  for (let i = 1; i < quantizedSignal.length; i++) {
    // Map the index to X position
    const xPosition = i * (canvas.width / samples.length);
    // Map the quantized signal to the Y position
    ctx.lineTo(xPosition, centerStart.y - quantizedSignal[i]);
  }

  ctx.stroke();
  ctx.closePath();
}

// Generate and draw the quantized signal
generateQuantizedSignal();
drawQuantizedSignal();
