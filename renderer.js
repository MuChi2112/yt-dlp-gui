// Electron modules
const {
    ipcRenderer
} = require('electron')

var videoStartTime = "";
var videoEndTime = "";

document.getElementById('videoStartTime').addEventListener('input', () => {
    videoStartTime = document.getElementById('videoStartTime').value;
})

document.getElementById('videoEndTime').addEventListener('input', () => {
    videoEndTime = document.getElementById('videoEndTime').value;
})

document.getElementById('startBtn').addEventListener('click', () => {

    let option = ""
    if (videoStartTime.length != 0 || videoEndTime.length != 0) {
        let start = videoStartTime; // 假設 videoStartTime 是你想要的開始時間
        let end = videoEndTime; // 假設 videoEndTime 是你想要的結束時間
        option += `--merge-output-format mkv --postprocessor-args "-ss 00:00:${start} -to 00:00:${end}"`;

    }

    const URL = document.getElementById('URL');
    console.log(URL.value)

    ipcRenderer.send('download-video', [URL.value, option])
})

ipcRenderer.on('yt-dlp-output', (event, output) => {

    document.getElementById('output-text').textContent += output;
})
