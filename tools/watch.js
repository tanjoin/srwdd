const fs = require('fs');
const { execSync } = require('child_process');

function watchDirForBuild(dir) {
    fs.watch(dir, (event, filename) => {
        console.log(`${new Date()}: ${filename} ${event}`);
        console.log(execSync("npm run build").toString());
    });
}

function readdirSyncRecursively(dir) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        if (dirent.isDirectory()) {
            watchDirForBuild(`${dir}/${dirent.name}`);
            readdirSyncRecursively(`${dir}/${dirent.name}`);
        }
    }
}
readdirSyncRecursively("src");