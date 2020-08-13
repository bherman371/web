<template>
  <div class="ui-block">
    <div class="ui-block-title">
      <div class="h6 title">
        Showing {{count}} Results for:
        “<span class="c-primary">{{query}}</span>”
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SShowResultBar",
  props: ["count"],
  computed: {
    ...mapGetters({ query: "getQuery" })
  }
};
</script>

<style>
</style>