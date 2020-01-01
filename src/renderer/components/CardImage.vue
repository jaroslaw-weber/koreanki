<template>
  <img v-if="card.image!=''" :src="imageFullPath" />
</template>

<script>
const helpers = require("../helpers");
var path = require("path");

export default {
  props: ["card", "deck"],
  data: function() {
    return {
      decksPath: ""
    };
  },
  computed: {
    imageFullPath: function() {
      return "";
      if (this.card == undefined) return undefined;
      return path.join(
        "file:///" + this.decksPath,
        this.deck.name,
        "images",
        this.card.image
      );
    }
  },

  methods: {},
  mounted: function() {}
};
</script>

<style>
</style>