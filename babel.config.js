module.exports = {
	presets: [
		["@babel/preset-env", { targets: { node: "current" } }],
		"@babel/preset-react",
		"@babel/preset-typescript", // if you want to have typescript in your project
	],
};
