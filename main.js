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


// Split the string, but respect spaces within quotes
function splitArgs(str) {
    let regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
    let args = [];
    let match;
    while (match = regex.exec(str)) {
        args.push(match[1] ? match[1] : match[0]);
    }
    return args;
}

// Listen for 'download - video ' messages from the renderer process
ipcMain.on('download-video', (event, [url, option]) => {
    console.log("URL:", url, "Option:", option);

    // Base command parts
    let commandArray = ['cmd', '/c', path.join(__dirname, 'yt-dlp.exe'), url];


    // Split the option string using the function and append to commandArray
    commandArray.push(...splitArgs(option));

    console.log(commandArray)

    // Run the ytdlb script with the constructed arguments
    const yt_dlp = spawn(commandArray[0], commandArray.slice(1), {
        encoding: 'utf8'  // Ensuring the encoding is set to UTF-8
    });


    let dataBuffer = [];

    yt_dlp.stdout.on('data', (data) => {
        dataBuffer.push(data);
    });

    yt_dlp.stdout.on('end', () => {
        const output = Buffer.concat(dataBuffer).toString('utf8');
        console.log(`yt-dlp output: ${output}`);
        event.reply('yt-dlp-output', output);
    });


    // yt_dlp.stdout.on('data', (data) => {
    //     console.log(`yt-dlp output: ${data}`);
    //     event.reply('yt-dlp-output', data.toString())
    // });

    yt_dlp.stderr.on('data', (data) => {
        console.error(`yt-dlp error: ${data}`);
        event.reply('yt-dlp-output', data.toString())
    });
});

