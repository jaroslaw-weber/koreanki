import { helpers } from "handlebars";


const Store = require("electron-store");
const estore = new Store();

export default class User {
	constructor() {
		this.selectedDeck = undefined;
		this.startPage = "firstTime";
		this.dropboxToken = "";
		this.decks = [];
		this.deckFolder = "";
		this.save = function () {
			estore.set("user", this);
		}



		this.addDeck = function (deck) {
			deck.id = this.decks.length;
			this.decks.push(deck);
		}

		this.nuke = function () {

			estore.clear();
			let u = new User();
			this.startPage = u.startPage;
			this.decks = [];
		}
	}

	get nextDeckId() {
		return this.decks.length;
	}
}

