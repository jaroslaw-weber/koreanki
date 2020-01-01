<template>
  <div class="animated fadeIn">
    <div v-if="deck">
      <p class="h1">{{deck.name}}</p>
      <br />
      <div v-if="deck.front == '' || deck.back == ''">
        <p class="h3">click 'edit' and input necessary info</p>
      </div>
      <div v-else-if="deck.cards.length == 0">
        <p class="h3">no reviews left today!</p>
      </div>
      <p v-if="progressPercent" class="h3">progress: {{progressPercentRounded}}%</p>
      <b-button
        v-if="this.cards.length>0"
        class="is-fullwidth is-primary is-large"
        @click="goto('play')"
      >learn</b-button>
      <p v-else class="h3">add cards to start learning!</p>
      <b-button class="is-fullwidth" @click="goto('editdeck')">edit</b-button>
      <div v-if="exportMode">
        <br />
        <div class="columns animated slideInRight">
          <div class="column">
            <b-button class="is-fullwidth" @click="exportToJson()">export to json</b-button>
          </div>
          <div class="column">
            <b-button class="is-fullwidth" @click="exportToCsv()">export to csv</b-button>
          </div>
        </div>
      </div>
      <div v-else>
        <b-button class="is-fullwidth" @click="exportMode = true">export</b-button>
      </div>
      <div v-if="showDeleteConfirm">
        <p class="h3">are you sure?</p>
        <b-button class="is-fullwidth is-danger" @click="deleteDeck()">DELETE</b-button>
      </div>
      <b-button v-else class="is-fullwidth is-danger" @click="showDeleteConfirm = true">delete</b-button>
    </div>
  </div>
</template>

<script>
const helpers = require("../helpers");
const download = require("downloadjs");
const { parse } = require("json2csv");
import "csv";

import CardList from "./CardList";
export default {
  data: function() {
    return {
      deck: undefined,
      editMode: false,
      exportMode: false,
      showDeleteConfirm: false
    };
  },
  components: {
    CardList
  },
  methods: {
    goto: function(page) {
      this.$store.dispatch("goToPage", page);
    },
    deleteDeck: function() {
      this.$store.dispatch("deleteSelectedDeck");
      this.back();
    },
    back: function() {
      this.$store.dispatch("back");
    },
    save() {
      this.$store.dispatch("updateDeck", this.deck);
    },
    exportToJson() {
      download(
        JSON.stringify(this.deck),
        this.deck.name + ".json",
        "text/plain"
      );
    },

    exportToCsv() {
      const fields = this.deck.fields;
      const opts = { fields };

      try {
        const csv = parse(this.deck.cards, opts);
        download(csv, this.deck.name + ".csv", "text/plain");
      } catch (err) {
        console.error(err);
      }
    }
  },

  computed: {
    fields: function() {
      return JSON.stringify(this.deck.fields);
    },
    size: function() {
      return this.deck.cards.length;
    },
    cards: function() {
      return this.$store.state.User.selectedDeck.cards;
    },
    progress: function() {
      let sum = 0;
      this.cards.forEach(c => {
        let mastery = c.mastery;
        if (mastery > 4) mastery = 4;
        sum += mastery;
      });
      return sum;
    },
    progressMax: function() {
      return this.cards.length * 4;
    },
    progressPercent: function() {
      return (this.progress / this.progressMax) * 100;
    },
    progressPercentRounded: function() {
      return Number(this.progressPercent.toFixed(2));
    }
  },
  mounted: function() {
    let d = this.$store.state.User.selectedDeck;
    this.deck = JSON.parse(JSON.stringify(d)); //clone
  }
};
</script>

<style>
</style>