<template>
  <div class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
    <RegisterNow v-if="!isUserAuthenticated" />
    <div class="ui-block">
      <!-- W-Build-Fav -->
      <NewItemWidget />
      <!-- ... end W-Build-Fav -->
    </div>
    <div v-if="isUserAuthenticated" class="ui-block">
      <!-- W-Friend-Pages-Added -->
      <GroupsFavourites :groups="groupsYouMayLike" />
      <!-- .. end W-Friend-Pages-Added -->
    </div>
  </div>
</template>

<script>
import NewItemWidget from "@/components/atoms/NewItemWidget";
import GroupsFavourites from "@/components/molecules/GroupsFavourites";
import RegisterNow from "@/views/RegisterNow";
import { mapGetters } from 'vuex';

export default {
  name: "SLeftBar",
  components: {
    RegisterNow,
    NewItemWidget,
    GroupsFavourites
  },
  computed: {
    ...mapGetters({
      isUserAuthenticated: "isUserAuthenticated",
      groupsYouMayLike: "getGroupsYouMayLIke"
    })
  }
};
</script>

<style>
</style>