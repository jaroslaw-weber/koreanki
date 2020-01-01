<template>
  <div class="animated fadeIn">
    <div v-if="decks.length==0">
      <p class="h3">nothing here yet!</p>

      <br />
      <hr />
    </div>
    <div v-else>
      <h2 class="h2">my flashcards</h2>
      <div v-for="deck in decks" :key="deck.id">
        <b-button class="is-fullwidth is-primary" @click="showDeck(deck.id)">{{deck.name}}</b-button>
      </div>
      <br />
      <p class="h3">want to learn something else?</p>
      <br />
      <p></p>
    </div>

    <b-button class="is-primary is-fullwidth" @click="goto('download')">download</b-button>

    <p class="h3">or</p>

    <b-button class="is-fullwidth" @click="goto('newdeck')">create new</b-button>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    decks() {
      return this.$store.state.User.decks;
    }
  },

  methods: {
    goto(page) {
      this.$store.dispatch("goToPage", page);
    },
    showDeck(id) {
      this.$store.dispatch("selectDeckById", { deckId: id });
      this.goto("deck");
    }
  }
};
</script>

<style>
</style>