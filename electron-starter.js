// Modules to control application life and create native browser window
const { app, BrowserWindow, nativeImage, Tray } = require("electron");
const url = require("url");
const path = require("path");

const assetsDirectory = path.join(__dirname, "public/images/icons");

// Assets
const trayIcon = path.join(assetsDirectory, "iconTemplate.png");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;

/**
 * Installs Dev extensions
 *
 * @returns
 */
async function installExtensions() {
	const installer = require("electron-devtools-installer");
	const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
	const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];

	return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload))).catch(console.log);
}

/**
 * Gets the window position in the desktop
 *
 * @returns {{ x: number, y: number}} window coordinates
 */
function getWindowPosition() {
	const windowBounds = mainWindow.getBounds();
	const trayBounds = tray.getBounds();

	// Center window horizontally below the tray icon
	const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2);

	// Position window 4 pixels vertically below the tray icon
	const y = Math.round(trayBounds.y + trayBounds.height + 4);

	return { x, y };
}

/**
 * Displays the window on the desktop
 *
 * @returns {void}
 */
function showWindow() {
	const position = getWindowPosition();
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
	} else {
		showWindow();
	}
}

/**
 * Creates a new instance of Tray and assigns clicking and double-clicking
 *
 * @returns {void}
 */
function createTray() {
	tray = new Tray(trayIcon);
	tray.setTitle("Poolside");
	tray.setToolTip("Click to open the player");
	tray.on("right-click", toggleWindow);
	tray.on("double-click", toggleWindow);
	tray.on("click", event => {
		toggleWindow();

		// Show devtools when command clicked
		if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
			mainWindow.openDevTools({ mode: "detach" });
		}
	});
}

/**
 *
 *
 */
async function createWindow() {
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
			backgroundThrottling: false,
		},
	});

	if (process.env.ELECTRON_START_URL) {
		await installExtensions();
		mainWindow.openDevTools();
	}
	// and load the index.html of the app.
	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, "/../build/index.html"),
			protocol: "file:",
			slashes: true,
		});
	mainWindow.loadURL(startUrl);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on("closed", function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
	createTray();
	createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function() {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
