<template>
  <div class="control-icon more has-items" >
    <svg class="olymp-happy-face-icon">
      <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon" />
    </svg>
    <div class="label-avatar bg-blue" v-if="allInvitesAndRequests.length > 0">{{allInvitesAndRequests.length}}</div>

    <div class="more-dropdown more-with-triangle triangle-top-center">
      <div class="ui-block-title ui-block-title-small">
        <h6 class="title">REQUESTS</h6>
      </div>

      <div class="mCustomScrollbar" data-mcs-theme="dark">
        <ul class="notification-list friend-requests">
          <div v-for="request in allRequests" :key="request._uId">
            <RequestListDropdown :request="request" />
          </div>
        </ul>
      </div>
      <router-link to="/s-app/requests-area">
        <a href="#" class="view-all bg-blue">Check all your requests</a>
      </router-link>
    </div>
  </div>
</template>

<script>
import RequestListDropdown from "@/components/molecules/RequestListDropdown";
import uniqid from "uniqid";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HeaderRequestsDropdown",
  components: {
    RequestListDropdown
  },
  computed: {
    ...mapGetters({
      allInvitesAndRequests: "getAllMyInvitesAndRequests"
    }),
    allRequests() {
      let arr = this.allInvitesAndRequests.map(item => {
        return {
          _uId: uniqid(),
          ...item
        };
      });
      if (arr.length > 3) return arr.slice(0, 3);
      return arr;
    }
  },
  methods: {
    ...mapActions(["mergeRequests"])
  },
  created() {
    this.mergeRequests();
  }
};
</script>

<style>
</style>