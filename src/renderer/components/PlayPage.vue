<template>
  <div class="animated fadeIn">
    <div v-if="card">
      <br />
      <div class="h2">{{front}}</div>
      <br />
      <div v-if="showBack">
        <div class="animated fadeIn h2">{{back}}</div>
        <CardImage v-if="card" :card="card" :deck="deck" />
      </div>
      <div v-else>
        <p class="animated fadeIn h3">{{deck.question}}</p>
      </div>
    </div>
    <br />
    <div v-if="showBack">
      <b-button class="is-fullwidth is-large animated fadeIn is-primary" @click="nextCard()">next</b-button>

      <p class="h3 animated fadeIn">card progress: {{masteryPercent}}%</p>
    </div>
    <div v-else>
      <div class="columns animated fadeIn">
        <div class="column">
          <b-button class="is-fullwidth is-large is-danger" @click="onFail()">no</b-button>
        </div>
        <div class="column">
          <b-button class="is-fullwidth is-large is-success" @click="onEasy()">yes!</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const helpers = require("../helpers");
import CardImage from "./CardImage";
import { renderFront, renderBack } from "../Deck";

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

export default {
  data: function() {
    return {
      card: undefined,
      showBack: false
    };
  },
  components: { CardImage },
  computed: {
    front: function() {
      if (this.card == undefined) return undefined;
      return renderFront(this.deck, this.card);
    },
    back: function() {
      if (this.card == undefined) return undefined;
      return renderBack(this.deck, this.card);
    },
    cardAfterChange() {
      return this.$store.state.User.selectedDeck.cards.find(
        x => x.id == this.card.id
      );
    },
    masteryPercent() {
      if (this.card == undefined) return undefined;
      return this.cardAfterChange.mastery * 25;
    },
    deck() {
      return this.$store.state.User.selectedDeck;
    }
  },

  methods: {
    goto: function(page) {
      this.$store.dispatch("goToPage", page);
    },
    onEasy: function() {
      this.showBack = true;
      this.$store.dispatch("addMasteryPoints", { cardId: this.card.id });
    },
    onFail: function() {
      this.showBack = true;
      this.$store.dispatch("resetMastery", { cardId: this.card.id });
    },
    nextCard: function() {
      if (this.deck.cards.length == 0) return;
      this.showBack = false;

      let now = Date.now();
      let filtered = this.deck.cards.filter(x => x.nextTime < now);
      let sorted = filtered.sort((a, b) => a.nextTime - b.nextTime);
      let nextCard = sorted.random();
      this.card = nextCard;
      if (this.card == undefined) {
        this.goto("deck");
      }
    }
  },
  mounted: function() {
    this.nextCard();
  }
};
</script>

<style>
</style>