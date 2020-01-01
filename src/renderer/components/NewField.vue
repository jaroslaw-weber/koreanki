<template>
  <div>
    <form>
      <b-field label="field name:">
        <b-input v-model="fieldName" placeholder="tree"></b-input>
      </b-field>

      <button @click="add()" class="button is-primary">add</button>
    </form>
  </div>
</template>

<script>
const helpers = require("../helpers");

export default {
  data: function() {
    return { fieldName: "" };
  },
  methods: {
    add: function() {
      if (this.fieldName == "") {
        this.$buefy.dialog.alert("field name is empty");
        return;
      }
      let store = this.store;

      this.$store.dispatch("addField", this.fieldName);
      this.$store.dispatch("goToPage", "deck");
    }
  },
  mounted: function() {}
};
</script>

<style>
</style>