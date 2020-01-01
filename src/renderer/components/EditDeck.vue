<template>
  <div class="animated fadeIn">
    <div v-if="deck">
      <p class="h1">{{deck.name}}</p>
      <br />

      <div class="animated fadeIn">
        <div class="columns">
          <div class="column">
            <b-button class="is-fullwidth is-primary" @click="goto('newcard')">add card</b-button>
          </div>
          <div class="column">
            <b-button class="is-fullwidth" @click="goto('newfield')">add field</b-button>
          </div>
        </div>
        <p class="h3">template</p>
        <br />
        <form>
          <div class="columns">
            <div class="column">
              <b-field label="front:">
                <b-input v-model="deck.front" placeholder></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="back:">
                <b-input v-model="deck.back" placeholder></b-input>
              </b-field>
            </div>
          </div>
        </form>
        <br />
        <b-button class="is-fullwidth is-primary" @click="save()">save</b-button>

        <br />
        <p class="h3">fields</p>
        <form>
          <div v-for="field in deck.fields" :key="field">
            <b-checkbox>{{field}}</b-checkbox>
          </div>
          <div v-if="deck.fields.length == 0">no fields! add field!</div>
        </form>
        <!--
        <br />
        <b-button class="is-danger">delete</b-button>
        <b-button>add to 'front'</b-button>
        <b-button @click="deck.back+=''">add to 'back'</b-button>-->
      </div>
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