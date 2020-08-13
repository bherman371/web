<template>
  <div>
    <!-- ... end Responsive Header-BP -->
    <div class="header-spacer"></div>
    <HeaderGroup :group="getCurrentGroup"/>
    <div class="container">
      <div class="row">
        <div class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-sm-12 col-12">
          <div id="newsfeed-items-grid">
            <ActivityList :activities="getCurrentGroupTimeline"/>
          </div>
        </div>

        <div class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
          <LeftSideBarGroup :group="getCurrentGroup"/>
        </div>

        <div class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
          <RightSideBarGroup/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderGroup from "@/components/organisms/HeaderGroup"
import ActivityList from "@/components/organisms/ActivityList";
import LeftSideBarGroup from "@/components/organisms/LeftSideBarGroup";
import RightSideBarGroup from "@/components/organisms/RightSideBarGroup";

import GroupHelper from "@/mixins/GroupHelper";

export default {
  name: "GroupPage",
  components: {
    HeaderGroup,
    ActivityList,
    LeftSideBarGroup,
    RightSideBarGroup
  },
  mixins: [
    GroupHelper
  ],
  created() {
    this.fetchGroup(this.$route.params.id)
    this.fetchMembers(this.$route.params.id)
    this.fetchItems(this.$route.params.id)
    this.fetchMessages(this.$route.params.id)
  }
}
</script>
