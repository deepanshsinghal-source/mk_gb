const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = "http://localhost:5173/";

const virtualConsole = new jsdom.VirtualConsole();

virtualConsole.on("jsdomError", (error) => {
    console.error("JSDOM Error:", error.message);
});
virtualConsole.on("error", (msg) => {
    console.error("Console Error:", msg);
});
virtualConsole.on("warn", (msg) => {
    console.warn("Console Warn:", msg);
});
virtualConsole.on("log", (msg) => {
    console.log("Console Log:", msg);
});

JSDOM.fromURL(url, {
    runScripts: "dangerously",
    resources: "usable",
    virtualConsole
}).then(dom => {
    console.log("Loaded JS DOM");
    setTimeout(() => {
        console.log("BODY length:", dom.window.document.body.innerHTML.length);
        console.log("BODY text slice:", dom.window.document.body.innerHTML.slice(0, 300));
    }, 2000);
}).catch(err => console.log(err));
