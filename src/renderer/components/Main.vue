<template>
  <div>
    <Navbar />
    <section class="section">
      <div class="container">
        <Deck v-if="pageNow==pages.deck" />
        <EditDeck v-if="pageNow=='editdeck'" />
        <NewDeck v-if="pageNow == 'newdeck'" />
        <MyDecks v-if="pageNow == pages.main" />
        <NewField v-if="pageNow == pages.newfield" />
        <NewCard v-if="pageNow == 'newcard'" />
        <PlayPage v-if="pageNow == pages.play" />
        <PluginList v-if="pageNow == 'plugins'" />
        <NukeButton v-if="pageNow==pages.nuke" />
        <Csv v-if="pageNow== 'import-csv'" />
        <Download v-if="pageNow==pages.download" />
        <Dropbox v-if="pageNow==pages.dropbox" />
      </div>
    </section>
  </div>
</template>

<script>
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import NewDeck from "./NewDeck";
import MyDecks from "./MyDecks";
import NewCard from "./NewCard";
import NewField from "./NewField";
import PlayPage from "./PlayPage";
import Navbar from "./Navbar";
import NukeButton from "./plugins/NukeButton";
import Csv from "./plugins/Csv";
import Download from "./plugins/Download";
import Dropbox from "./plugins/Dropbox";

const pages = require("../pages");

export default {
  name: "landing-page",
  components: {
    Deck,
    EditDeck,
    NewDeck,
    MyDecks,
    NewCard,
    PlayPage,
    NewField,
    Navbar,
    NukeButton,
    Csv,
    Download,
    Dropbox
  },
  computed: {
    pageNow: function() {
      return this.$store.state.User.pageNow;
    }
  },

  data: function() {
    return {
      pages: pages
    };
  }
};
</script>

<style>
</style>
