<template>
  <section class="section">
    <div class="container">
      <form v-if="deck">
        <div v-for="field in fields" :key="field">
          <b-field :label="field+':'">
            <b-input placeholder="tree" @input="v => card[field]=v"></b-input>
          </b-field>
        </div>
        <br />
        <button @click="add()" class="button is-primary">add</button>
      </form>
      <br />
      <hr />
    </div>
  </section>
</template>

<script>
import Card from "../Card";
const helpers = require("../helpers");

export default {
  data: function() {
    return { card: new Card(), deck: undefined };
  },
  computed: {
    fields: function() {
      if (this.deck == undefined) return [];
      let cloned = Array.from(
        this.deck.fields.filter(
          x => x != "id" && x != "timestamp" && x != "mastery"
        )
      );

      return cloned;
    }
  },
  methods: {
    add: function() {
      let cards = this.deck.cards;
      this.card.id = cards.length;
      this.card.mastery = 0;
      this.$store.dispatch("addCard", this.card);
      this.card = new Card();
    },
    goto(page) {
      this.$store.dispatch("goToPage", page);
    }
  },
  mounted: function() {
    this.deck = this.$store.state.User.selectedDeck;
  }
};
</script>

<style>
</style>