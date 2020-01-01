<template>
  <div class="animated fadeInUp">
    <p class="h3">what do you want to learn?</p>
    <br />
    <div v-for="deck in links">
      <b-button class="is-fullwidth" @click="downloadDeck(deck)">{{deck.name}}</b-button>
    </div>

    <!--
    <Dropbox />-->
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
  </div>
</template>

<script>
const helpers = require("../../helpers");
import User from "../../User";
import { Deck, importCsv } from "../../Deck";

const https = require("https");
const fs = require("fs");

export default {
  components: {},
  data: function() {
    return {
      links: [],
      isLoading: false
    };
  },

  methods: {
    goto(page) {
      this.$store.dispatch("goToPage", page);
    },
    downloadDeck(deckInfo) {
      let thisBind = this;
      this.isLoading = true;
      thisBind.downloadToString(deckInfo.url, csv => {
        thisBind.onCsvDownloaded(deckInfo, csv);
      });
    },
    downloadPage(url, onFinished) {
      this.downloadToString(url, raw => {
        var parser = new DOMParser();
        let page = parser.parseFromString(raw, "text/html");
        onFinished(page);
      });
    },
    downloadToString(url, onDownloaded) {
      const request = https.get(url, function(res) {
        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", chunk => {
          rawData += chunk;
        });
        res.on("end", () => {
          onDownloaded(rawData);
        });
      });
    },
    onCsvDownloaded(deckInfo, csv) {
      this.isLoading = false;

      let deck = new Deck(deckInfo.name);
      deck.front = deckInfo.front;
      deck.back = deckInfo.back;
      deck.question = deckInfo.question;

      let thisBind = this;

      importCsv(deck, csv, () => {
        if (deck.cards.length == 0) {
          thisBind.onInvalidCsv();
          return;
        }
        thisBind.addDeck(deck);
        thisBind.selectDeck(deck);
        thisBind.goto("deck");
      });
    },
    selectDeck(deck) {
      this.$store.dispatch("selectDeck", deck);
    },
    onInvalidCsv() {
      this.$buefy.dialog.alert("failed to download file");
    },
    addDeck(deck) {
      this.$store.dispatch("addDeck", deck);
    },
    downloadDeckList(onFinish) {
      fetch("https://jaroslaw-weber.gitlab.io/koreanki-decks/decks.json")
        .then(response => response.text())
        .then(data => {
          let parsed = JSON.parse(data);
          onFinish(parsed);
        });
    }
  },
  mounted: function() {
    this.isLoading = true;
    this.downloadDeckList(list => {
      this.isLoading = false;
      this.links = list;
    });
  }
};
</script>

<style>
</style>