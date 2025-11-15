const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

contextBridge.exposeInMainWorld('electron', {
    fs: {
        readFileSync: (...args) => fs.readFileSync(...args),
        writeFileSync: (...args) => fs.writeFileSync(...args),
        existsSync: (...args) => fs.existsSync(...args)
    }
});

contextBridge.exposeInMainWorld('electronAPI', {
    loadDados: () => ipcRenderer.invoke('load-dados'),
    saveDados: (dados) => ipcRenderer.invoke('save-dados', dados)
});
