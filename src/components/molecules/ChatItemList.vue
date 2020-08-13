<template>
  <div @click="$emit('button', message.id)">
    <ul class="notification-list chat-message">
      <li>
        <div class="author-thumb usr-img-thumb">
          <img :src="getUserImagePath(message)" alt="author" class="avatar usr-img-thumb" />
          <span v-if="newMsg" class="icon-status online"></span>
        </div>
        <div class="notification-event">
          <a href="#" class="h6 notification-friend">{{getUserName(message)}}</a>
          <span
            class="chat-message-item"
          >{{getLastMsg(message.messages)}}</span>
          <span class="notification-date">
            <time class="entry-date updated">{{getLastMsgTimeStamp(message.messages) | relativeDate}}</time>
          </span>
        </div>
        <span class="notification-icon">
          <svg class="olymp-chat---messages-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
          </svg>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import UserHelperVue from "../../mixins/UserHelper.vue";
import ChatHelperVue from '../../mixins/ChatHelper.vue';
export default {
  name: "ChatItemList",
  props: ["message", "newMsg"],
  mixins: [UserHelperVue, ChatHelperVue]
};
</script>

<style>
.usr-img-thumb {
  height: 34px;
  width: 34px;
}
</style>