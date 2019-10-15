var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Modules to control application life and create native browser window
var _a = require("electron"), app = _a.app, BrowserWindow = _a.BrowserWindow, nativeImage = _a.nativeImage, Tray = _a.Tray;
var url = require("url");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;
var tray;
/**
 *
 *
 * @returns
 */
function installExtensions() {
    return __awaiter(this, void 0, void 0, function () {
        var installer, forceDownload, extensions;
        return __generator(this, function (_a) {
            installer = require("electron-devtools-installer");
            forceDownload = !!process.env.UPGRADE_EXTENSIONS;
            extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];
            return [2 /*return*/, Promise.all(extensions.map(function (name) { return installer["default"](installer[name], forceDownload); }))["catch"](console.log)];
        });
    });
}
/**
 *
 *
 */
function createWindow() {
    return __awaiter(this, void 0, void 0, function () {
        var startUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Create the browser window.
                    mainWindow = new BrowserWindow({
                        width: 288,
                        height: 276,
                        show: false,
                        frame: false,
                        fullscreenable: false,
                        resizable: false,
                        transparent: false,
                        webPreferences: {
                            backgroundThrottling: false
                        }
                    });
                    if (!process.env.ELECTRON_START_URL) return [3 /*break*/, 2];
                    return [4 /*yield*/, installExtensions()];
                case 1:
                    _a.sent();
                    mainWindow.openDevTools();
                    _a.label = 2;
                case 2:
                    startUrl = process.env.ELECTRON_START_URL ||
                        url.format({
                            pathname: "localhost:3000",
                            protocol: "http:",
                            slashes: true
                        });
                    mainWindow.loadURL(startUrl);
                    // Open the DevTools.
                    // mainWindow.webContents.openDevTools()
                    // Emitted when the window is closed.
                    mainWindow.on("closed", function () {
                        // Dereference the window object, usually you would store windows
                        // in an array if your app supports multi windows, this is the time
                        // when you should delete the corresponding element.
                        mainWindow = null;
                    });
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Gets the window position in the desktop
 *
 * @returns {{ x: number, y: number}} window coordinates
 */
function getWindowPosition() {
    var windowBounds = mainWindow.getBounds();
    var trayBounds = tray.getBounds();
    // Center window horizontally below the tray icon
    var x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2);
    // Position window 4 pixels vertically below the tray icon
    var y = Math.round(trayBounds.y + trayBounds.height + 4);
    return { x: x, y: y };
}
/**
 * Displays the window on the desktop
 *
 * @returns {void}
 */
function showWindow() {
    var position = getWindowPosition();
    mainWindow.setPosition(position.x, position.y, false);
    mainWindow.show();
    mainWindow.focus();
}
/**
 * Toggles the showing/hiding of the window
 *
 * @returns {void}
 */
function toggleWindow() {
    if (mainWindow.isVisible()) {
        mainWindow.hide();
    }
    else {
        showWindow();
    }
}
/**
 * Creates a new instance of Tray and assigns clicking and double-clicking
 *
 * @returns {void}
 */
function createTray() {
    tray = new Tray(nativeImage.createEmpty());
    tray.on("right-click", toggleWindow);
    tray.on("double-click", toggleWindow);
    tray.on("click", function (event) {
        toggleWindow();
        // Show devtools when command clicked
        if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
            mainWindow.openDevTools({ mode: "detach" });
        }
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", function () {
    createTray();
    createWindow();
});
// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
