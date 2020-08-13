<template>
  <div>
    <ProfileAboutMe :about="user.description" />
  </div>
</template>

<script>
import ProfileAboutMe from "@/components/molecules/ProfileAboutMe";

import { mapGetters } from "vuex";
export default {
  name: "LeftSideBarProfile",
  components: {
    ProfileAboutMe
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  }
};
</script>

<style>
</style>