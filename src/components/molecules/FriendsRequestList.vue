<template>
  <div class="container">
    <div class="row">
      <div class="order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
        <div class="ui-block">
          <div class="ui-block-title">
            <h6 class="title">Friend requests</h6>
          </div>

          <!-- Notification List Frien Requests -->

          <ul class="notification-list friend-requests">
            <Request :requests="requests" />
          </ul>

          <!-- ... end Notification List Frien Requests -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "@/components/atoms/Request";
import { mapGetters } from 'vuex';
export default {
  name: "FriendsRequestList",
  components: {
    Request
  },
  computed: {
    ...mapGetters({
      requests: "getAllMyInvitesAndRequests"
    })
  }
};
</script>

<style>
</style>