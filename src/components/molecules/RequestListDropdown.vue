<template>
  <li>
    <div class="author-thumb group-thumb">
      <img :src="getGroupImagePath(request.group)" alt="author" class="group-thumb" />
    </div>
    <div class="notification-event">
      <a href="#" class="h6 notification-friend">{{getRequestTitle(request)}}</a>
      <span class="chat-message-item">{{getRequestDescription(request)}}</span>
    </div>
    <span class="notification-icon">
      <a href="#" class="accept-request" @click="acceptRequest(request.type)">
        <span class="icon-add without-text">
          <svg class="olymp-happy-face-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon" />
          </svg>
        </span>
      </a>

      <a href="#" class="accept-request request-del" @click="rejectRequest(request.type)">
        <span class="icon-minus">
          <svg class="olymp-happy-face-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon" />
          </svg>
        </span>
      </a>
    </span>
  </li>
</template>

<script>
import GroupHelperVue from "../../mixins/GroupHelper.vue";
import UserHelperVue from "../../mixins/UserHelper.vue";
export default {
  name: "RequestListDropdown",
  props: ["request"],
  mixins: [GroupHelperVue, UserHelperVue],
  methods: {
    acceptRequest(type) {
      if (type === "myInvitations") {
        this.acceptJoinInvitation(this.request.Group_id);
      } else if (type === "myJoinRequests") {
        this.acceptMember(this.request.Group_id);
      } else {
        this.acceptModeratorInvitation(this.request.Group_id);
      }
    },
    rejectRequest(type) {
      if (type === "myInvitations") {
        this.declineJoinInvitation(this.request.Group_id);
      } else if (type === "myJoinRequests") {
        this.cancelJoinRequest(this.request.Group_id);
      } else {
        this.rejectModeratorInvitation(this.request.Group_id);
      }
    }
  }
};
</script>

<style scoped>
.group-thumb {
  height: 34px;
  width: 34px;
}
</style>