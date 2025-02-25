const Audio = document.getElementById("Audio");
// Audio.addEventListener("change",(e)=>{
//     const audioFile = e.target.files[0];
//     const reader = new FileReader();
//     reader.addEventListener("load",(e)=>{
//         const arrayBuffer = e.target.result;
//         const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         audioContext.decodeAudioData(arrayBuffer,(AudioBuffer)=>{
//             visualize(AudioBuffer);
//         })
//     })
//     reader.readAsArrayBuffer(audioFile);
// })

// function visualize(audiobuffer){
//     const canvas = document.getElementById("myCanvas");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     canvas.style.backgroundColor = "#000";
//     const ctx = canvas.getContext("2d");

//     const channelData = audiobuffer.getChannelData(0);
//     console.log(channelData)
// }

// Audio.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();
//   reader.addEventListener("load", (event) => {
//     const arrayBuffer = event.target.result;
//     const audioContext = new (window.AudioContext ||
//       window.webkitAudioContext)();
//     audioContext.decodeAudioData(arrayBuffer, (AudioBuffer) => {
//       visualize(AudioBuffer,audioContext);
//     });
//   });
//   reader.readAsArrayBuffer(file);
// });

// function visualize(AudioBuffer,audioContext) {
  
//   const canvas = document.getElementById("myCanvas");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight / 2;
//   canvas.style.backgroundColor = "#000";
//   const ctx = canvas.getContext("2d");

//   const analyser = audioContext.createAnalyser();
//   analyser.fftSize = 256;
// //   console.log(analyser.frequencyBinCount);
//   const frequencyBufferLength = analyser.frequencyBinCount
//   const frequencyData = new Uint8Array(frequencyBufferLength);
//   const source = audioContext.createBufferSource();
//   source.buffer = AudioBuffer;
//   source.connect(analyser);
//   analyser.connect(audioContext.destination)
//   source.start();


//   const center = canvas.height / 2;
//   const barWidth = canvas.width / frequencyBufferLength;
//   let hsl = 10;
//   function animate(){
//     hsl++
//     analyser.getByteFrequencyData(frequencyData); 
//     ctx.clearRect(0,0,canvas.width,canvas.height)
//     for (let i = 0; i < frequencyBufferLength; i++) {
//         // const chunk = channelData.slice(i * chunkSize, (i + 1) * chunkSize);
//         // const min = Math.min(...chunk)*10;
//         // const max = Math.max(...chunk)*10;
//         // console.log(min,max)
//         ctx.fillStyle =  `hsl(${hsl},100%,50%)`;
//         ctx.fillRect(i * barWidth, canvas.height - frequencyData[i], barWidth, frequencyData[i]);
//         ctx.fill();
//       }
//       requestAnimationFrame(animate)
//     }
  
//     animate();

// //   const channelData = AudioBuffer.getChannelData(0);
// //   const numberOfChunks = 400;
// //   const chunkSize = Math.ceil(channelData.length / numberOfChunks);

  

  
// }




Audio.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const arrayBuffer = event.target.result;
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContext.decodeAudioData(arrayBuffer, (AudioBuffer) => {
        visualize(AudioBuffer, audioContext);
      });
    });
    reader.readAsArrayBuffer(file);
  });
  
  function visualize(AudioBuffer, audioContext) {
    const canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "#000";
    const ctx = canvas.getContext("2d");
  
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
  
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  
    const source = audioContext.createBufferSource();
    source.buffer = AudioBuffer;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    source.start();
  
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = 200;
    let hue = 0;
  
    function animate() {
      analyser.getByteFrequencyData(frequencyData);
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Create a fading trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      hue += 2;
  
      // Draw circular wave
      ctx.beginPath();
      for (let i = 0; i < frequencyData.length; i++) {
        const angle =  i;
        const radius = baseRadius + frequencyData[i] * 0.6;
  
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
  
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 2;
      ctx.stroke();
  
      // Draw particles
      for (let i = 0; i < 10; i++) {
        const randomAngle = Math.random() * Math.PI * 2;
        const randomRadius = baseRadius + Math.random() * 100;
        const x = centerX + Math.cos(randomAngle) * randomRadius;
        const y = centerY + Math.sin(randomAngle) * randomRadius;
  
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 5 + 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue + Math.random() * 30}, 100%, 60%)`;
        ctx.fill();
      }
  
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  