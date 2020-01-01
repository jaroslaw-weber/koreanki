<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "kore-anki"
};
</script>

<style>
@import "~animate.css";
.h1 {
  font-size: 1.8rem;
  text-align: center;
  padding: 1.3rem;
}
.h2 {
  font-size: 1.5rem;
  text-align: center;
  padding: 1.5rem;
}
.h3 {
  font-size: 1.2rem;
  text-align: center;
  padding: 1.2rem;
}
.button {
  margin: 0.3rem;
}
</style>
