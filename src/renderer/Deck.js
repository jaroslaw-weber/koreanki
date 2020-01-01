export class Deck {
	constructor(name) {
		this.id = -1;
		this.name = name;
		this.cards = [];
		this.front = "";
		this.back = "";
		this.question = "do you know the answer?";
		this.fields = [
		];
	}

	size() {
		return this.cards.length;
	}



}

const hb = require("handlebars");

import csv from "csv";
import Card from "./Card";

export function renderFront(deck, card) {
	if (card == undefined) return undefined;
	let template = hb.compile(deck.front);
	return template(card);
}
export function renderBack(deck, card) {
	if (card == undefined) return undefined;
	console.log(card);
	console.log(deck.back);
	let template = hb.compile(deck.back);
	return template(card);
}

export function addCard(deck, card) {

}


export function importCsv(deck, csvString, onFinish) {

	const parsed = [];
	let parsing = csv.parse(csvString);
	parsing.on("data", d => parsed.push(d));
	parsing.on("end", () => {
		let firstRow = parsed[0];
		parsed.forEach(row => {
			//console.log("row" + row);
			let card = new Card();
			for (let i = 0; i < row.length; i++) {

				let fieldName = firstRow[i];
				let v = row[i];
				card[fieldName] = v;
			}
			//console.log(card);
			deck.cards.push(card);


		});
		firstRow.forEach(cell => {
			deck.fields.push(cell);
		})
		onFinish();
		//console.log("imported result" + deck.cards);

		//console.log(parsed);
	});


} 