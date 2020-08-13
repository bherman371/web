<template>
  <div>
    <div class="header-spacer"></div>
    <div class="container">
      <div class="row">
        <!-- Main Content -->

        <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
          <div id="newsfeed-items-grid">
            <div v-for="item in getFeed" v-bind:key="item._id">
              <SNewGroupMemberMessageToMeAsModerator
                :message="item"
                v-if="item.feedType === 'GROUP_MEMBER_MESSAGE_TO_ME_AS_MODERATOR'"
              />
              <SNewGroupMessage :message="item" v-if="item.feedType === 'GROUP_MESSAGE'" />
              <SNewItem :item="item" v-if="item.feedType === 'NEW_ITEM'" @openWindowPopup="openChat(item)" />
              <SNewItemMessage :message="item" v-if="item.feedType === 'ITEM_MESSAGE'" />
              <SNewJoinInvitation :request="item" v-if="item.feedType === 'JOIN_INVITATION'" />
              <SNewMember :member="item" v-if="item.feedType === 'NEW_MEMBER'" />
              <SNewModerationInvitation
                :request="item"
                v-if="item.feedType === 'MODERATION_INVITATION'"
              />
              <SNewModeratorMessageToMe
                :message="item"
                v-if="item.feedType === 'MODERATOR_MESSAGE_TO_ME'"
              />
              <SNewRequestToJoin :request="item" v-if="item.feedType === 'REQUEST_TO_JOIN'" />
              <SNewUserMessage :message="item" v-if="item.feedType === 'USER_MESSAGE'" />
              <SNewSystemMessage :message="item" v-if="item.feedType === 'SYSTEM_MESSAGE'" />
            </div>
          </div>
        </main>

        <!-- ... end Main Content -->

        <!-- Left Sidebar -->

        <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
          <div class="ui-block">
            <NewItemWidget />
          </div>
          <div class="ui-block">
            <GroupsFavourites :groups="groupsYouMayLike" />
          </div>
        </aside>

        <!-- ... end Left Sidebar -->

        <!-- Right Sidebar -->

        <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
          <div class="ui-block">
            <SNewGroupWidget />
          </div>
        </aside>

        <!-- ... end Right Sidebar -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GroupsFavourites from "@/components/molecules/GroupsFavourites";
import SNewGroupMemberMessageToMeAsModerator from "@/components/organisms/SNewGroupMemberMessageToMeAsModerator";
import SNewGroupMessage from "@/components/organisms/SNewGroupMessage";
import SNewItem from "@/components/organisms/SNewItem";
import SNewItemMessage from "@/components/organisms/SNewItemMessage";
import SNewJoinInvitation from "@/components/organisms/SNewJoinInvitation";
import SNewMember from "@/components/organisms/SNewMember";
import SNewModerationInvitation from "@/components/organisms/SNewModerationInvitation";
import SNewModeratorMessageToMe from "@/components/organisms/SNewModeratorMessageToMe";
import SNewRequestToJoin from "@/components/organisms/SNewRequestToJoin";
import SNewUserMessage from "@/components/organisms/SNewUserMessage";
import SNewSystemMessage from "@/components/organisms/SNewSystemMessage";
import SNewGroupWidget from "@/components/atoms/SNewGroupWidget";
import NewItemWidget from "@/components/atoms/NewItemWidget";
import ChatHelperVue from "../mixins/ChatHelper.vue";

export default {
  name: "NewsFeed",
  components: {
    GroupsFavourites,
    SNewGroupMemberMessageToMeAsModerator,
    SNewGroupMessage,
    SNewItem,
    SNewItemMessage,
    SNewJoinInvitation,
    SNewMember,
    SNewModerationInvitation,
    SNewModeratorMessageToMe,
    SNewRequestToJoin,
    SNewUserMessage,
    SNewSystemMessage,
    SNewGroupWidget,
    NewItemWidget
  },
    mixins: [ ChatHelperVue ],
  mounted() {
    this.fetchFeed();
    this.fetchGroupsYouMayLike();
  },
  methods: {
    ...mapActions(["fetchFeed", "fetchGroupsYouMayLike"]),
    openChat(item) {
      this.selectedItemChat = item.user;
      if (
        this.userMessages.some(item => this.selectedItemChat.id === item.id)
      ) {
        this.selectedItemChat = this.userMessages.find(item => {
          return item.id === this.selectedItemChat.id;
        });
      }
      this.setPopupChat({
        isOpen: true,
        chatMsgs: this.selectedItemChat
      });
      this.$parent.$refs.rightStickyBar.openClosePopup();
    },
    closeModal() {
      this.$refs.modal.closeModal();
    },
  },
  computed: {
    ...mapGetters({
      getFeed: "getMyFeed",
      groupsYouMayLike: "getGroupsYouMayLIke"
    })
  }
};
</script>

<style>
</style>
