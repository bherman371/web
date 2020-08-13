<template>
  <div
    class="ui-block popup-chat popup-chat-responsive"
    tabindex="-1"
    role="dialog"
    aria-labelledby="popup-chat-responsive"
    aria-hidden="true"
    :class="{'open-chat': isActive}"
    @click.stop="open"
  >
    <div class="modal-content">
      <div class="modal-header" @click.stop="close">
        <h6 class="title">{{getChatUsername(chatMsgs)}}</h6>
        <div class="more">
          <svg class="olymp-little-delete">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-little-delete" />
          </svg>
        </div>
      </div>
      <div class="modal-body">
        <div class="mCustomScrollbar">
          <MsgsChatDisplay :messages="getAllMsgs(chatMsgs)" />
        </div>

        <form class="need-validation">
          <div class="form-group label-floating is-empty" @keyup.enter="send">
            <ChatEmoji @emoji="setEmojiMsg" @file="setAttachment" />
            <label class="control-label">{{labelText}}</label>
            <TextArea v-model="message" ref="textarea" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import userHelper from "@/mixins/UserHelper.vue";
import { mapGetters } from "vuex";
import MsgsChatDisplay from "@/components/molecules/MsgsChatDisplay";
import TextArea from "@/components/atoms/TextArea";
import ChatHelperVue from "../../mixins/ChatHelper.vue";
import ChatEmoji from "@/components/atoms/ChatEmoji";
export default {
  name: "ChatModalPopup",
  props: ["chatMsgs"],
  mixins: [userHelper, ChatHelperVue],
  components: {
    TextArea,
    MsgsChatDisplay,
    ChatEmoji,
  },
  data() {
    return {
      isActive: false,
      message: "",
      payload: {},
      emojiUnicode: [],
      emojiArray: [],
      labelText: "Press enter to post...",
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  methods: {
    open() {
      this.isActive = true;
      this.$emit("popupOpen", this.isActive);
    },
    close() {
      this.isActive = false;
      this.$emit("popupClose", this.isActive);
    },
    setEmojiMsg(emoji) {
      this.message += String.fromCodePoint(emoji);
    },
    async send() {
      event.preventDefault();
      let newChatUser = false;
      if (this.chatMsgs.messages) {
        this.payload = this.chatMsgs.messages[0];
      } else {
        this.payload.receiver = { newMessage: {} };
        newChatUser = true;
      }
      this.postUserMessage({
        message: this.payload,
        id: this.chatMsgs.id,
        postMsg: this.message,
        newChat: newChatUser,
      });

      $(".popup-chat-responsive .mCustomScrollbar").scrollTop(
        $(".popup-chat-responsive .mCustomScrollbar").prop("scrollHeight")
      );
      $(".popup-chat-responsive .mCustomScrollbar").perfectScrollbar("upadte");

      this.newChatUser = false;
      this.message = "";
      this.payload = {};
    },
    setAttachment(f) {
      let newChatUser = false;
      if (this.chatMsgs.messages) {
        this.payload = this.chatMsgs.messages[0];
      } else {
        this.payload.receiver = { newMessage: {} };
        newChatUser = true;
      }

      this.sendAttachment({
        userId: this.chatMsgs.id,
        file: f[0],
        message: this.payload,
        newChat: newChatUser,
      });
    },
  },
  watch: {
    message() {
      if (this.message.length >= 1) {
        this.labelText = "";
      } else {
        this.labelText = "Press enter to post...";
      }
    },
  },
};
</script>

<style scoped>
</style>