<template>
  <div>
    <div class="main-header mb-0 pb-5">
      <img src="/img/default-groups-img.svg" alt />
    </div>

    <div class="container ">
      <div class="row">
        <CardCreateGroup />
        <CardGroup v-for="group in groups" :key="group.id" :group="group" />
      </div>
    </div>
    <a class="back-to-top" href="#">
      <img src="/svg-icons/back-to-top.svg" alt="arrow" class="back-icon" />
    </a>
  </div>
</template>

<script>
import CardCreateGroup from "@/components/atoms/CardCreateGroup";
import CardGroup from "@/components/atoms/CardGroup";
import GroupHelperVue from "../mixins/GroupHelper.vue";
import { mapGetters } from "vuex";
export default {
  name: "MyGroups",
  components: {
    CardCreateGroup,
    CardGroup
  },
  mixins: [GroupHelperVue],
  computed: {
    ...mapGetters({
      groups: "getMyGroups"
    })
  },
  created() {
    this.getMyGroups();
  }
};
</script>

<style>
</style>