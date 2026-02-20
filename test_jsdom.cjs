const fs = require('fs');
const { JSDOM } = require('jsdom');
const jsdom = require('jsdom');
const virtualConsole = new jsdom.VirtualConsole();

virtualConsole.on("jsdomError", (error) => {
    console.log("JSDOM Error:", error.message, error.detail);
});
virtualConsole.on("error", (msg) => {
    console.log("Console Error:", msg);
});
virtualConsole.on("warn", (msg) => {
    console.log("Console Warn:", msg);
});
virtualConsole.on("log", (msg) => {
    console.log("Console Log:", msg);
});

const dir = fs.readdirSync('./dist/assets').filter(f => f.endsWith('.js'))[0];
const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body><div id="root"></div><script type="module" src="file://${process.cwd()}/dist/assets/${dir}"></script></body></html>`, {
    runScripts: "dangerously",
    resources: "usable",
    virtualConsole
});

setTimeout(() => {
    console.log("BODY", dom.window.document.body.innerHTML.substring(0, 300));
}, 2000);
