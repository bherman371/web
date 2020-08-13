<template>
  <div>
    <div class="header-spacer header-spacer-small"></div>
    <HeaderRequestsArea/>
    <FriendsRequestList />
  </div>
</template>

<script>
import FriendsRequestList from "@/components/molecules/FriendsRequestList";
import HeaderRequestsArea from "@/components/molecules/HeaderRequestsArea";
export default {
  name: "SRequestsArea",
  components: {
    FriendsRequestList,
    HeaderRequestsArea
  }
};
</script>

<style>
</style>