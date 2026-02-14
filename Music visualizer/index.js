// const Audio = document.getElementById("audio");

// Audio.addEventListener("change",(event)=>{
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.addEventListener("load",(event)=>{
//         const arrayBuffer = event.target.result;
//         const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         audioContext.decodeAudioData(arrayBuffer,(event)=>{
//             const audioBuffer = event;
//             visualize(audioBuffer,audioContext)
//         })
        
//     })
//     reader.readAsArrayBuffer(file);
// })


// function visualize(audioBuffer,audioContext){
//     const canvas = document.getElementById("myCanvas");
//     canvas.style.display = "block"
//     canvas.height = window.innerHeight;
//     canvas.width = window.innerWidth;
//     canvas.style.backgroundColor="#000";
//     const ctx = canvas.getContext("2d");

//     const analyser = audioContext.createAnalyser();
//     analyser.fftSize = 256;
//     const frequencyLength = analyser.frequencyBinCount;
//     const frequencyArray = new Uint8Array(frequencyLength);
    
//     const source = audioContext.createBufferSource();
//     source.buffer = audioBuffer;
//     source.connect(analyser);
//     analyser.connect(audioContext.destination);
//     source.start();
//     //getByteTimeDomainData getFloatFrequencyData getByteFrequencyData
//     analyser.getByteFrequencyData(frequencyArray)
//     let hsl = 10;

    
//     function animate(){
//         analyser.getByteFrequencyData(frequencyArray);
//         ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
//         hsl++
//         ctx.beginPath();
//         const gradient =ctx.createLinearGradient(0,0,window.innerHeight,window.innerWidth);
//         gradient.addColorStop(0,`hsl(${hsl},100%,50%)`)
//         gradient.addColorStop(0,`hsl(${hsl+1},100%,50%)`)
//         ctx.fillStyle =gradient;
//         // ctx.strokeStyle = gradient;
//         let positionX = window.innerWidth/2;
//         let positionY = window.innerHeight/2;
//         ctx.save();
//         ctx.translate(0,canvas.height);
//         let width = window.innerWidth/frequencyLength;
//         // console.log(width)
//         for(let i = 0 ; i<frequencyLength;i++){
//             // ctx.shadowBlur = 1;
//             // ctx.shadowColor = gradient;
//             // ctx.moveTo(i*width,0);
//             // ctx.lineTo(i*width,frequencyArray[i]< 0 ? frequencyArray[i]*2.1 : -frequencyArray[i]*2.1)
//             ctx.fillRect(i*width,0,width,frequencyArray[i]< 0 ? frequencyArray[i]*2.1 : -frequencyArray[i]*2.1)
//             // ctx.arc(positionX,positionY,frequencyArray[i],0,2*Math.PI)
//             // ctx.lineWidth = 2

//             // ctx.rect(positionX-frequencyArray[i]/2,positionY-frequencyArray[i]/2,frequencyArray[i],frequencyArray[i])

//         }
//         ctx.fill();
//         ctx.restore();
//         ctx.stroke();
//         requestAnimationFrame(animate);
//     }
//     animate();
// }

const Audio = document.getElementById("audio");

Audio.addEventListener("change",(event)=>{
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load",(event)=>{
        const arrayBuffer = event.target.result;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(arrayBuffer,(event)=>{
            const audioBuffer = event;
            visualize(audioBuffer,audioContext)
        })
        
    })
    reader.readAsArrayBuffer(file);
})


function visualize(audioBuffer,audioContext){
    const canvas = document.getElementById("myCanvas");
    canvas.style.display = "block"
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.style.backgroundColor="#000";
    const ctx = canvas.getContext("2d");

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const frequencyLength = analyser.frequencyBinCount;
    const frequencyArray = new Uint8Array(frequencyLength);
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    source.start();
    //getByteTimeDomainData getFloatFrequencyData getByteFrequencyData
    analyser.getByteFrequencyData(frequencyArray)
    let hsl = 10;

    
    function animate(){
        analyser.getByteFrequencyData(frequencyArray);
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        hsl += 0.5
        ctx.beginPath();
        const gradient =ctx.createLinearGradient(0,0,window.innerHeight,window.innerWidth);
        gradient.addColorStop(0,`hsl(${hsl},100%,50%)`)
        gradient.addColorStop(0.5,`hsl(${hsl+3},100%,50%)`)
        gradient.addColorStop(1,`hsl(${hsl+1},100%,50%)`)
        ctx.fillStyle =gradient;
        ctx.strokeStyle = gradient;
        let positionX = window.innerWidth/2;
        let positionY = window.innerHeight/2;
        ctx.save();
        ctx.translate(0,canvas.height);
        let offset = 1
        let width = window.innerWidth/(frequencyLength*offset);
        // console.log(width)
        
        for(let i = 0 ; i<frequencyLength*(offset/2);i++){
            let scale =  frequencyArray[i]*2
            // ctx.fillRect((frequencyLength*(offset/2)*width)-i*width,0,width,frequencyArray[i]< 0 ? scale : -scale)
            ctx.moveTo((frequencyLength*(offset/2)*width)-i*width,0)
            ctx.lineTo(((frequencyLength*(offset/2)*width)-i*width)+width,frequencyArray[i]< 0 ? scale : -scale)
        }
        for(let i = frequencyLength*(offset/2) ; i>0;i--){
            let scale =  frequencyArray[i]*2
            // ctx.fillRect(i*width+(frequencyLength*(offset/2)*width),0,width,frequencyArray[i]< 0 ? scale : -scale)
            ctx.moveTo(i*width+(frequencyLength*(offset/2)*width),0)
            ctx.lineTo((i*width+(frequencyLength*(offset/2)*width))+width,frequencyArray[i]< 0 ? scale : -scale)
        }
        ctx.fill();
        ctx.restore();
        ctx.stroke();
        requestAnimationFrame(animate);
    }
    animate();
}