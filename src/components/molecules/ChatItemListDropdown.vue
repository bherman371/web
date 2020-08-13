<template>
  <div>
    <li class="message-unread" @click="$emit('button')">
      <div class="author-thumb usr-thumb">
        <img :src="getUserImagePath(message)" alt="author" class="usr-thumb" />
        <span v-if="newMsg" class="icon-status online"></span>
      </div>
      <div class="notification-event">
        <a href="#" class="h6 notification-friend">{{getUserName(message)}}</a>
        <span class="chat-message-item">{{getLastSenderMsg(message.messages)}}</span>
        <span class="notification-date">
          <time class="entry-date updated">{{getLastMsgTimeStamp(message.messages) | date}}</time>
        </span>
      </div>
      <span class="notification-icon">
        <svg class="olymp-chat---messages-icon">
          <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
        </svg>
      </span>
      <div class="more">
        <svg class="olymp-three-dots-icon">
          <use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
        </svg>
      </div>
    </li>
  </div>
</template>

<script>
import ChatHelperVue from "../../mixins/ChatHelper.vue";
import UserHelperVue from "../../mixins/UserHelper.vue";

export default {
  name: "ChatItemListDropdown",
  props: ["message", "newMsg"],
  mixins: [ChatHelperVue, UserHelperVue],
  components: {},
  data() {
    return {
      // msgsLength: this.message.messages.length,
      counter: 0
    };
  },
  // methods: {
  //   getNewestMsgCounter(msg) {
  //     const l = msg.length - 1;
  //     if (msg[l].senderId !== this.loggedUser.id) this.counter = 1;
  //     this.$emit("length", this.counter);
  //   }
  // },
  // mounted() {
  //   this.getNewestMsgCounter(this.message.messages);
  // }
};
</script>

<style>
.usr-thumb {
  width: 34px;
  height: 34px;
}
</style>

<style lang="scss" scoped>
.icon-status.online {
  left: unset;
  top: 25px;
}
</style>