<template>
  <div>
    <div class="ui-block-title">
      <h6 class="title">Groups you may like</h6>
    </div>

    <!-- W-Friend-Pages-Added -->

    <ul class="widget w-friend-pages-added notification-list friend-requests">
      <li class="inline-items" v-for="group in groups" :key="group.id">
        <div class="author-thumb">
          <img :src="getGroupImagePath(group)" alt="author" class="group-img "/>
        </div>
        <div class="notification-event">
          <router-link
            :to="`/s-app/group-page/${group.id}`"
            class="h6 notification-friend">{{group.name}}
          </router-link>
          <span class="chat-message-item">{{group.description}}</span>
        </div>
        <span
          class="notification-icon"
          data-toggle="tooltip"
          data-placement="top"
          data-original-title="ADD TO YOUR FAVS"
          @click="tryToJoinGroup(group.id)"
          style="cursor: pointer"
        >
          <div
            class="spinner-border spinner-border-sm text-primary"
            role="status"
            v-if="requesting && requestingId === group.id"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <svg v-else class="olymp-star-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-star-icon" />
          </svg>
        </span>
      </li>
    </ul>
    <Modal
      id="join-group-warning"
      buttonName="OK"
      title="Join group"
      ref="modal"
      @button="closeModal()"
      class="font-weight-bold"
    >{{response}}</Modal>
  </div>
</template>

<script>
import GroupHelper from "@/mixins/GroupHelper";
import Modal from "@/components/atoms/Modal";

export default {
  name: "GroupsFavourites",
  props: ["groups"],
  mixins: [
    GroupHelper
  ],
  components: { Modal },
  data() {
    return {
      response: null,
      requesting: false,
      requestingId: null
    }
  },
  methods: {
    async tryToJoinGroup(groupId) {
      this.requesting = true;
      this.requestingId = groupId;
      const result = await this.joinGroup(groupId);
      this.requesting = false;
      this.requestingId = null;
      this.response = result.result;
      $("#join-group-warning").modal("show");
    },
    closeModal() {
      this.$refs.modal.closeModal();
    }
  },
  mounted() {
    $("[data-toggle='tooltip']").tooltip();
  }
};
</script>

<style scoped>
.group-img {
  height: 34px;
  width: 34px;
}
svg {
  fill: #9A9FBF;
}
svg:hover {
  fill: #63BAB9;
}
.spinner-border-sm {
  width: 20px;
  height: 20px;
}
</style>
