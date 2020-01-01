
//let algorith decide how to sync
export function smartSync(onFinished) {
	const dbx = require("./dropbox");
	let localDecks = user.decks;
	dbx.load(cloudDecks => {
		//todo buggy
		console.log("loaded decks")
		localDecks.forEach(localDeck => {
			let cloudDeck = cloudDecks.find(x => x.id == localDeck.id);
			if (cloudDeck == undefined) return;
			localDeck.cards.forEach(localCard => {
				let cloudCard = cloudDeck.cards.find(x => x.id == localCard.id);
				//if cloud card timestamp is newer, overwrite local changes
				let overrideLocal = cloudCard.timestamp > localCard.timestamp;
				if (overrideLocal) {
					//replacing with cloud card
					let i = localDeck.cards.indexOf(localCard);
					localDeck[i] = cloudCard;
				}
			})
		});
		console.log("local sync finished");
		user.save();
		//after sync save to server
		dbx.save(() => {
			console.log("saved to cloud")
			onFinished();
		});

	});
}

export function calculateNextTime(card) {
	let time = new Date(card.timestamp);
	console.log("time" + time);
	let mastery = card.mastery;
	if (mastery == 0) {
		return time;
	}
	if (mastery == 1) {
		return addDays(time, 2);
	}
	if (mastery == 2) {
		return addDays(time, 3);
	}
	if (mastery == 3) {
		return addDays(time, 6);
	}
	if (mastery == 4) {
		return addDays(time, 15);
	}

	return addDays(time, mastery * 30);

}
function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}


