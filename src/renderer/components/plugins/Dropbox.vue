<template>
  <div>
    <h2 class="h2">dropbox</h2>
    <p>keep your data in the cloud so you won't lose !</p>
    <br />
    <b-button class="is-fullwidth is-primary" @click="saveToDropbox()">save progress to cloud</b-button>
    <b-button class="is-fullwidth" @click="loadFromDropbox()">load progress from cloud</b-button>
    <br />
    <br />
    <form>
      <b-field label="dropbox token">
        <b-input v-model="dropboxToken" />
      </b-field>
    </form>
    <br />
    <a
      href="https://blogs.dropbox.com/developers/2014/05/generate-an-access-token-for-your-own-account/"
    >how to generate dropbox token?</a>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true" />
  </div>
</template>

<script>
const helpers = require("../../helpers");
const logic = require("../../dropbox");

export default {
  data: function() {
    return {
      dropboxToken: "",
      isLoading: false
    };
  },
  computed: {
    user: function() {
      return this.$store.state.User;
    }
  },

  methods: {
    alert(content) {
      this.$buefy.dialog.alert(content);
    },
    saveToDropbox() {
      this.isLoading = true;
      logic.save(this.dropboxToken, this.user.decks, () => {
        this.isLoading = false;
        this.alert("saved!");
      });
    },
    loadFromDropbox() {
      this.alert("not implemented yet");
      return;
      this.isLoading = true;
      logic.load(this.dropBoxToken, d => {
        /*
        let user = helpers.getUser();
        user.decks = d;
        user.save();
        */
        this.isLoading = false;
        //this.alert("loaded!");
      });
    }
  },
  mounted: function() {
    this.dropboxToken = this.$store.state.User.dropboxToken;
  },
  beforeDestroy: function() {
    this.$store.dispatch("setDropboxToken", this.dropboxToken);
  }
};
</script>

<style>
</style>