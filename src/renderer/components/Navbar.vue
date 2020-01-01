<template>
  <div>
    <b-navbar class="animated slideInDown is-primary">
      <template slot="brand">
        <b-navbar-item v-if="showBack" @click="back()">back</b-navbar-item>
        <!--    <b-navbar-item @click="smartSync()">sync (experimental)</b-navbar-item>-->
      </template>
      <template slot="start">
        <b-navbar-item @click="select('main')">my decks</b-navbar-item>
        <b-navbar-item @click="select('dropbox')">cloud sync</b-navbar-item>
        <b-navbar-item @click="select('nuke')">reset</b-navbar-item>
      </template>
    </b-navbar>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
  </div>
</template>
<script>
const h = require("../helpers");

export default {
  data: function() {
    return {
      isLoading: false
    };
  },
  computed: {
    showBack: function() {
      return this.$store.state.User.backPage;
    }
  },
  methods: {
    select(page) {
      this.$store.dispatch("goToPage", page);
    },
    back() {
      this.$store.dispatch("back");
    },
    smartSync() {
      this.isLoading = true;
      let t = this;
      h.smartSync(() => {
        t.isLoading = false;
        t.$buefy.dialog.alert("done!");
      });
    }
  }
};
</script>
