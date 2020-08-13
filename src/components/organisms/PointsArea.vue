<template>
  <div>
    <div class="header-spacer header-spacer-small"></div>
    <HeaderPointsArea />
    <PointsAreaTable :points="myPoints" />
    <!-- <router-link>How the Swampum point system works</router-link> -->
  </div>
</template>

<script>
import PointsAreaTable from "@/components/molecules/PointsAreaTable";
import HeaderPointsArea from "@/components/atoms/HeaderPointsArea";
import UserHelperVue from "../../mixins/UserHelper.vue";
export default {
  name: "PointsArea",
  components: {
    PointsAreaTable,
    HeaderPointsArea,
  },
  mixins: [UserHelperVue],
  created() {
    this.fetchMyPoints();
    this.fetchMyPointSum();
  },
};
</script>

<style>
</style>