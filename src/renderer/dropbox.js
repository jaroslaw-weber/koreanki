const h = require("./helpers");

//var fetch = require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require('dropbox').Dropbox;
import { WriteModeOverwrite } from "dropbox";


export function save(token, decks, onFinish) {
	let dbx = getDropboxInstance(token);
	let saveArgs = {
		contents: JSON.stringify(decks),
		path: "/decks.json",
		mode: 'overwrite'
	};
	console.log("save args: " + JSON.stringify(saveArgs.path));
	console.log("save args: " + JSON.stringify(saveArgs.mode));
	//dbx.filesDelete({ path: "/decks.json" }).then(res => {
	dbx.filesUpload(saveArgs)
		.then(res => {


			console.log(res);
			onFinish();
		});
	//});

}

function getDropboxInstance(token) {

	return new Dropbox({
		accessToken: token,
		//fetch: fetch
	});
}

export function load(token, onFinish) {
	console.log("start");
	let dbx = getDropboxInstance(token);
	console.log("loading...");
	dbx.filesDownload({ path: "/decks.json" }).then(res => {
		console.log("response is back");
		console.log("response" + JSON.stringify(res));


		let reader = new FileReader();
		reader.onload = function () {
			let contents = (reader.result);


			if (contents == undefined || contents == "") {
				console.log("saves not available");
				return;

			}
			let decks = JSON.parse(contents);
			onFinish(decks);


		}
		reader.readAsText(res.fileBlob);


	});
}

