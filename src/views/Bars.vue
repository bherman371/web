<template>
  <div>
    <Header
      :titleHeader="titlePage"
      :usrImg="user.picture"
      :userName="user.firstName"
      :userId="user.id"
      :messages="userMsgs"
    />
    <LeftStickyBar />
    <RightStickyBar :userMsgs="userMsgs" ref="rightStickyBar" />
    <jqueryScripts />
    <router-view></router-view>
  </div>
</template>

<script>
import LeftStickyBar from "@/templates/LeftStickyBar";
import RightStickyBar from "@/templates/RightStickyBar";
import Header from "@/templates/Header";
import jqueryScripts from "@/components/jqueryScripts";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Bars",
  components: {
    LeftStickyBar,
    RightStickyBar,
    Header,
    jqueryScripts,
  },
  props: ["headerTitle"],
  data() {
    return {
      path: this.$route.name,
    };
  },
  methods: {
    ...mapActions(["startSession", "fetchUserMessages"]),
    async start() {
      this.startSession();
      this.fetchUserMessages();
    },
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      userMsgs: "getUserMessages",
    }),
    titlePage() {
      if (this.path === "SSearchResult") return "Search Result";
      if (this.path === "SRequestsArea") return "Requests Area";
      if (this.path === "MyGroups") return "Search My Groups";
      if (this.path === "MyPostArea") return "My post area";
      if (this.path === "PointsArea") return "Points area";
      return "";
    },
  },
  created() {
    this.start();
    setInterval(() => {
      this.fetchUserMessages();
    }, 3 * 60000);
  },
};
</script>

<style>
</style>
