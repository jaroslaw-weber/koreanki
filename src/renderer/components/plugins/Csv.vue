<template>
  <div>
    <p class="h2">import deck from csv</p>
    <p>drop .csv file here!</p>
    <br />
    <vue-dropzone id="drop1" :options="dropOptions" @vdropzone-file-added="f =>onCsvLoaded(f)"></vue-dropzone>
  </div>
</template>

<script>
const helpers = require("../../helpers");
import vue2Dropzone from "vue2-dropzone";
import { Deck, importCsv } from "../../Deck";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  data: function() {
    return {
      deckName: "",

      dropOptions: {
        url: "https://api.anonfile.com/upload" // dont upload!,
      }
    };
  },
  components: { vueDropzone: vue2Dropzone },
  methods: {
    onCsvLoaded(file) {
      console.log("file added");
      console.log(file);
      let reader = new FileReader();
      let binded = this;
      reader.onload = function(event) {
        //console.log(reader.result);
        let d = new Deck(file.name);

        importCsv(d, reader.result);
        this.$store.dispatch("addDeck", d);

        this.$store.dispatch("goToPage", "deck");
      };
      reader.readAsText(file);
    }
  },

  mounted: function() {}
};
</script>

<style>
</style>