// Electron modules
const {
    ipcRenderer
} = require('electron')

var videoStartTime = ["00", "00", "00"];
var videoEndTime = ["00", "00", "00"];

let getClipOption = function () {
    let option = ""
    let clip = false

    for (let i = 0; i < 3; i++) {
        if (!(videoStartTime[i] === "00" || videoStartTime[i] === "0") || !(videoEndTime[i] === "00" || videoEndTime[i] === "0")) {
            clip = true
        }
    }

    if (clip === true) {
        option += `--merge-output-format mkv --postprocessor-args "-ss ${videoStartTime[0]}:${videoStartTime[1]}:${videoStartTime[2]} -to ${videoEndTime[0]}:${videoEndTime[1]}:${videoEndTime[2]}"`;
        console.log("CompleteVideoTIme")

    }

    return option;
}

document.getElementById('videoStartTime_hour').addEventListener('input', () => {
    videoStartTime[0] = document.getElementById('videoStartTime_hour').value;
})

document.getElementById('videoEndTime_hour').addEventListener('input', () => {
    videoEndTime[0] = document.getElementById('videoEndTime_hour').value;
})


document.getElementById('videoStartTime_min').addEventListener('input', () => {
    videoStartTime[1] = document.getElementById('videoStartTime_min').value;
})

document.getElementById('videoEndTime_min').addEventListener('input', () => {
    videoEndTime[1] = document.getElementById('videoEndTime_min').value;
})


document.getElementById('videoStartTime_sec').addEventListener('input', () => {
    videoStartTime[2] = document.getElementById('videoStartTime_sec').value;
})

document.getElementById('videoEndTime_sec').addEventListener('input', () => {
    videoEndTime[2] = document.getElementById('videoEndTime_sec').value;
})

document.getElementById('startBtn').addEventListener('click', () => {
    console.log("CompleteStartBtn")


    let option = getClipOption()
    const URL = document.getElementById('URL');
    console.log(URL.value)
    console.log("CompleteURL")
    ipcRenderer.send('download-video', [URL.value, option])

})

ipcRenderer.on('yt-dlp-output', (event, output) => {

    document.getElementById('output-text').textContent += output;
})
