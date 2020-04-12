<template>
    <div id="app" class="h-100 container-fluid">
        <searchBox />
        <spinner />
        <wordGrouping />
        <backToTop />
    </div>
</template>

<script>
import searchBox from "./components/searchBox.vue";
import backToTop from "./components/backToTop.vue";
import spinner from "./components/spinner.vue";
import wordGrouping from "./components/wordGrouping.vue";

export default {
  name: "app",
  components: {
    searchBox,
    backToTop,
    spinner,
    wordGrouping
  }
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  direction: rtl;
}
html {
  overflow-y: scroll;
}
.no-gutters {
  margin-right: 0;
  margin-left: 0;
}
</style>
