<template>
  <div class="container">
    <div class="row">
      <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div class="ui-block">
          <div class="top-header top-header-favorit">
            <div class="top-header-thumb">
              <img :src="getGroupImagePath(group)" alt="nature" class="header-img"/>
              <div class="top-header-author">
                <div class="author-thumb">
                  <img :src="getGroupImagePath(group)" alt="author" />
                </div>
                <div class="author-content">
                  <a href="#" class="h3 author-name">{{ group.name }}</a>
                </div>
              </div>
            </div>
            <div class="profile-section">
              <div class="row">
                <div class="col col-xl-8 m-auto col-lg-8 col-md-12">
                  <ul class="profile-menu">
                    <li>
                      <router-link :to="`s-app/group-page/${group.id}`">
                        <a>Timeline</a>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="s-app/items">
                        <a>Items</a>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="s-app/s-new-group-message">
                        <a>Messages</a>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="s-app/card-member">
                        <a>Members</a>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="control-block-button">
                <a
                  class="btn btn-control bg-primary d-inline-flex"
                  data-toggle="tooltip"
                  data-placement="top"
                  :data-original-title="joinGroupTooltip"
                  @click="tryToJoinGroup(group.id)"
                  style="cursor: pointer"
                  v-if="!isMember"
                >
                  <div
                    class="spinner-border spinner-border-sm text-white m-auto"
                    role="status"
                    v-if="requesting"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                  <span v-else class="m-auto">
                    <svg class="olymp-star-icon">
                      <use xlink:href="/svg-icons/sprites/icons.svg#olymp-star-icon" />
                    </svg>
                  </span>
                </a>

                <a href="#" class="btn btn-control bg-purple">
                  <svg class="olymp-chat---cog-icon">
                    <use xlink:href="/svg-icons/sprites/icons.svg#olymp-settings-icon" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { mapGetters } from 'vuex';

export default {
  name: "HeaderGroup",
  props: ["group"],
  components: { Modal },
  mixins: [GroupHelper],
  data() {
    return {
      response: null,
      requesting: false
    };
  },
  methods: {
    async tryToJoinGroup(groupId) {
      this.requesting = true;
      const result = await this.joinGroup(groupId);
      this.requesting = false;
      if (result.result === "You are already a member of this group") {
        this.response = "You already have a request to join this group. Please, wait for the moderator acceptance."
      } else {
        this.response = result.result;
      }
      $("#join-group-warning").modal("show");
    },
    closeModal() {
      this.$refs.modal.closeModal();
    }
  },
  computed: {
    ...mapGetters({
      myGroups: "getMyGroups"
    }),
    isMember() {
      if (this.myGroups.find(group => {
        return group.groupId === this.group.id;
      })) {
        return true;
      }
      return false;
    },
    joinGroupTooltip() {
      if (this.group.privacy === 1) {
        return "Join this group";
      } else if (this.group.privacy === 2 || this.group.privacy === 3) {
        return "Request to join this group";
      }
      return null;
    }
  },
  async mounted() {
    this.getMyGroups();
  }
};
</script>

<style lang="scss" scoped>
.spinner-border-sm {
  width: 20px;
  height: 20px;
}

.header-img {
  height: 360px;
  max-width: 1268px;
}
</style>
