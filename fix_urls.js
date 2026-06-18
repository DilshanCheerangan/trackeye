const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace single quote strings
    content = content.replace(/'http:\/\/localhost:8001\/api(.*?)'/g, '`${import.meta.env.VITE_API_URL || \'http://localhost:8001/api\'}$1`');
    // Replace double quote strings
    content = content.replace(/"http:\/\/localhost:8001\/api(.*?)"/g, '`${import.meta.env.VITE_API_URL || \'http://localhost:8001/api\'}$1`');
    // Replace backtick strings
    content = content.replace(/`http:\/\/localhost:8001\/api(.*?)`/g, '`${import.meta.env.VITE_API_URL || \'http://localhost:8001/api\'}$1`');
    
    // Fix the websocket in LiveCapture
    content = content.replace(/'ws:\/\/localhost:8001\/ws(.*?)'/g, '`${import.meta.env.VITE_WS_URL || \'ws://localhost:8001/ws\'}$1`');

    fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            replaceInFile(fullPath);
        }
    }
}

walkDir(directoryPath);
console.log('URLs successfully updated to use environment variables.');
