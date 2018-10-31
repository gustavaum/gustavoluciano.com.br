const projectinfo = {
    name: "gustavoluciano.com.br",
    version: "2.0",
    description: "Meu site pessoal"    
}

/** PATHS */
const path = {

    // general
    base: './',
    fonts: './fonts',
    modules: "./node_modules",
    // dev
    js: "./js",
    scss: "./scss",
    img: "./images",
    html: "/html",
    fonts: "./fonts",
};

/** FILE NAMES */
const fileName = {
    css: "main.css",
    cssmin: "main.min.css",
    js: "main.min.js",
    jsmin: "main.js",
}

/** TASKS */
// const tasks = [
//     "sass-debug",
//     "js-debug",
//     "sass",
//     "js",
//     "sync"
// ];


const loads = {
    css: [],
    js: []
};

const files = [
    path.css + fileName.css,
    path.js + fileName.js,
    path.base + "/**/*.php"
];

/** PROJECT INFO */
const project = {
    syncPort: 3000,
    loads: {
        html: false,
        copyFont: false,
        css: [
            // { origin: path.modules, path: '/bootstrap/dist/css/bootstrap.min.css' },            
            {
                origin: path.sassSrc,
                path: '/main.scss'
            },
        ],
        js:
            [               
                {
                    origin: path.jsSrc,
                    path: "/main.js"
                }
            ]
    }
};

// if (project.loads.copyFont) {
//     tasks.push("copy.fonts");
// }

// if (project.loads.html) {
//     tasks.push("html");
// }

project.loads.css.map((item) => {
    loads.css.push(item.origin + item.path);
})

project.loads.js.map((item) => {
    loads.js.push(item.origin + item.path);
})

module.exports = {
    projectinfo,
    project,
    path,
    fileName,
    files,
    loads,
    path
}