import { deck } from "../../pages"
import { Deck } from "../../Deck";
import { calculateNextTime } from "../../helpers";
// example
const state = {
  decks: [],
  selectedDeck: undefined,
  pageNow: "main",
  dropboxToken: "",
  backPage: undefined


}

const mutations = {
  ADD_DECK(state, deck) {
    deck.id = state.decks.length;
    //fix ids
    for (let [i, card] of deck.cards.entries()) {
      card.id = i + 1;
    }
    state.decks.push(deck);
    console.log("added");
  },
  SELECT_DECK(state, deck) {
    state.selectedDeck = deck;
    console.log("added");
  },
  DELETE_SELECTED_DECK(state) {
    let deckId = state.selectedDeck.id;
    state.decks = state.decks.filter(x => x.id != deckId);
  },
  SELECT_DECK_BY_ID(state, payload) {
    let deckId = payload.deckId;
    state.selectedDeck = state.decks.find(x => x.id == deckId);
  },
  ADD_MASTERY_POINTS(state, payload) {
    let cardId = payload.cardId
    let card = state.selectedDeck.cards.find(x => x.id == cardId);
    if (card.mastery == undefined) {
      card.mastery = 0;
    }
    card.mastery += 1;
    card.timestamp = Date.now();
    console.log(card);
    card.nextTime = calculateNextTime(card);

  },
  RESET_MASTERY(state, payload) {
    let cardId = payload.cardId;
    let card = state.selectedDeck.cards.find(x => x.id == cardId);
    card.mastery = 0;
    card.timestamp = Date.now();
    card.nextTime = calculateNextTime(card);
  },
  GO_TO_PAGE(state, page) {
    state.pageNow = page;
    state.backPage = getBackPage(page);
  },
  BACK(state) {
    if (state.backPage == undefined) return;
    state.pageNow = state.backPage;
    state.backPage = getBackPage(state.pageNow);
  },
  NUKE(state) {
    state.decks = [];
    state.selectedDeck = undefined;
    state.pageNow = "main";
  },
  UPDATE_DECK(state, deck) {
    let index = state.decks.indexOf(state.selectedDeck);
    state.decks[index] = deck;
    state.selectedDeck = deck;
  },
  ADD_FIELD(state, fieldName) {
    state.selectedDeck.fields.push(fieldName);
  },
  ADD_CARD(state, card) {
    state.selectedDeck.cards.push(card);
  },
  SET_DROPBOX_TOKEN(state, token) {
    state.dropboxToken = token;
  }
}

const actions = {
  addDeck({ commit }, deck) {
    console.log("vuex:adding deck")
    // do something async
    commit('ADD_DECK', deck)
  },
  deleteSelectedDeck({ commit }) {
    commit('DELETE_SELECTED_DECK');
  },
  addMasteryPoints({ commit }, payload) {
    commit('ADD_MASTERY_POINTS', payload);
  },
  resetMastery({ commit }, payload) {
    commit('RESET_MASTERY', payload);
  },
  selectDeck({ commit }, deck) {
    commit('SELECT_DECK', deck);
  },
  selectDeckById({ commit }, payload) {
    commit('SELECT_DECK_BY_ID', payload);
  },
  goToPage({ commit }, page) {
    commit('GO_TO_PAGE', page);
  },
  updateDeck({ commit }, deck) {
    commit('UPDATE_DECK', deck);
  },
  back({ commit }) {
    commit('BACK');
  },
  addField({ commit }, fieldName) {
    commit('ADD_FIELD', fieldName);
  },
  addCard({ commit }, card) {
    commit('ADD_CARD', card);
  },
  nuke({ commit }) {
    commit('NUKE');
  },
  setDropboxToken({ commit }, token) {
    commit('SET_DROPBOX_TOKEN', token);
  }

}

export default {
  state,
  mutations,
  actions
}


function getBackPage(pageNow) {
  if (pageNow == "deck") return "main";
  if (pageNow == "play") return "deck";
  if (pageNow == "editdeck") return "deck";
  if (pageNow == "newcard" || pageNow == "newfield") return "editdeck";

  return undefined;

}