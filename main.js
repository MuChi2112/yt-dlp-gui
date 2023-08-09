const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')

// Node.js modules
const path = require('path')
const {
    spawn
} = require('child_process')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // allows renderer processes to use require
            contextIsolation: false // allows renderer processes to use ipcRenderer
        }

    })


    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})


// Listen for 'download - video ' messages from the renderer process
ipcMain.on('download-video', (event, arg) => {
    console.log(arg);

    // Run the ytdlb script with the selected directory as an argument
    const yt_dlp = spawn('cmd', ['/c', path.join(__dirname, 'yt-dlp.exe'), arg])

    // // Run the ytdlb script with the selected directory as an argument
    // const yt_dlp = spawn('cmd', ['/c', path.join(__dirname, 'yt-dlp.exe'), arg], { shell: true, windowsHide: true })


    yt_dlp.stdout.on('data', (data) => {
        console.log(`yt-dlp output: ${data}`);
        event.reply('yt-dlp-output', data.toString())
    });

    yt_dlp.stderr.on('data', (data) => {
        console.error(`yt-dlp error: ${data}`);
        event.reply('yt-dlp-output', data.toString())
    });
})
