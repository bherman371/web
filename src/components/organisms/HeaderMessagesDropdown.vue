<template>
  <div>
    <div class="control-icon more has-items">
      <svg class="olymp-chat---messages-icon">
        <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
      </svg>
      <div class="label-avatar bg-purple" v-if="messages.length > 0">{{messages.length}}</div>

      <div class="more-dropdown more-with-triangle triangle-top-center">
        <div class="ui-block-title ui-block-title-small">
          <h6 class="title">Messages</h6>
        </div>

        <div class="mCustomScrollbar" data-mcs-theme="dark">
          <ul class="notification-list chat-message">
            <ChatItemListDropdown
              v-for="msg in messages"
              :key="msg.id"
              :message="msg"
              @button="setChat(msg)"
              :newMsg="getNewestMsgFromSender(msg.messages)"
            />
          </ul>
        </div>

        <router-link to="chat-center" class="view-all bg-purple">View all messages</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ChatItemListDropdown from "@/components/molecules/ChatItemListDropdown";
import ChatHelperVue from "../../mixins/ChatHelper.vue";
export default {
  name: "HeaderMessagesDropdown",
  mixins: [ChatHelperVue],
  components: {
    ChatItemListDropdown
  },
  data() {
    return {
      currentUser: {}
    };
  },
  computed: {
    messages() {
      if (!this.userMessages) return [];

      const filteredMessages = this.userMessages.filter(element => this.getNewestMsgFromSender(element.messages));
      const sortedMessages = filteredMessages.sort((a, b) => {
        const dateA = new Date(this.getLastMsgTimeStamp(a.messages));
        const dateB = new Date(this.getLastMsgTimeStamp(b.messages));
        return dateB - dateA;
      })

      return sortedMessages;
    }
  },
  methods: {
    openPopup(msg) {
      this.currentUser = msg;
      this.$refs.popupWindow.open();
    },
    setChat(msg) {
      this.setPopupChat({ isOpen: true, chatMsgs: msg });
      this.$parent.$parent.$refs.rightStickyBar.openClosePopup();
    }
  }
};
</script>

<style>
</style>