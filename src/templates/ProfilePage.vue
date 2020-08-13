<template>
  <div class="page-has-left-panels page-has-right-panels">
    <div class="header-spacer"></div>
    <HeaderProfile :userProfile="user"/>
    <div class="container">
      <div class="row">
        <div class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
          <ActivityList :activities="profileTimeline"/>
        </div>
        <div class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
          <LeftSideBarProfile />
        </div>
        <div class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
          <RightSideBarProfile />
        </div>
      </div>
    </div>
    <a class="back-to-top" href="#">
      <img src="/svg-icons/back-to-top.svg" alt="arrow" class="back-icon" />
    </a>
  </div>
</template>
<script>
import HeaderProfile from "@/components/organisms/HeaderProfile";
import ActivityList from "@/components/organisms/ActivityList";
import LeftSideBarProfile from "@/components/organisms/LeftSideBarProfile";
import RightSideBarProfile from "@/components/organisms/RightSideBarProfile";
import UserHelper from '../mixins/UserHelper';

export default {
  name: "ProfilePage",
  components: {
    HeaderProfile,
    ActivityList,
    LeftSideBarProfile,
    RightSideBarProfile
  },
  mixins:[
    UserHelper
  ],
  created(){
    this.fetchUserProfile(this.$route.params.id)
    this.fetchProfileItems(this.$route.params.id)
    this.fetchProfileGroups(this.$route.params.id)
  }
};
</script>
