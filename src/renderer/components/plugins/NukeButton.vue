<template>
  <div>
    <p class="h2">nuke button</p>
    <b-button class="is-danger is-fullwidth" @click="nuke">DELETE ALL DATA</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    nuke() {
      this.$store.dispatch("nuke");
      this.$buefy.dialog.alert("you destroyed everything... you monster...");
    }
  }
};
</script>