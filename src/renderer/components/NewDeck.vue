<template>
  <section class="section">
    <div class="container">
      <p class="h2">create empty deck</p>
      <form>
        <b-field label="deck name:">
          <b-input v-model="deckName" placeholder="Korean Verbs"></b-input>
        </b-field>

        <b-button class="is-fullwidth" @click="create()">create</b-button>
        <br />

        <Csv />
      </form>
    </div>
  </section>
</template>

<script>
const helpers = require("../helpers");
import { Deck } from "../Deck";
import Csv from "./plugins/Csv";

export default {
  data: function() {
    return {
      deckName: ""
    };
  },
  components: { Csv },
  methods: {
    create: function() {
      if (this.deckName == "") {
        this.$buefy.dialog.alert("name is empty");
        return;
      }
      let d2 = new Deck(this.deckName);
      let dispatch = this.$store.dispatch;
      dispatch("addDeck", d2);
      dispatch("selectDeck", d2);
      dispatch("goToPage", "deck");
    }
  },
  mounted: function() {}
};
</script>

<style>
</style>