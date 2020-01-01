<template>
  <div>
    <br />
    <br />
    <div v-if="deck">
      <p class="h2">cards</p>
      <div v-if="deck.cards!=undefined">
        <div v-for="card in deck.cards" :key="card.id">
          <hr />
          <p>{{JSON.stringify(card)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const helpers = require("../helpers");

export default {
  computed: {
    deck() {
      return this.$store.state.selectedDeck;
    }
  }
};
</script>

<style>
</style>