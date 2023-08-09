// Electron modules
const {
    ipcRenderer
} = require('electron')

document.getElementById('startBtn').addEventListener('click', () => {
    const URL = document.getElementById('URL');
    console.log(URL.value)

    ipcRenderer.send('download-video', URL.value)
})
ipcRenderer.on('yt-dlp-output', (event, output) => {

    document.getElementById('output-text').textContent += output;
})
