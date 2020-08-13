<template>
  <div class="chat-field" >
    <div class="ui-block-title" style="width: 1090px">
      <h6 class="title">{{getUserName(user)}}</h6>
    </div>
    <div class="mCustomScrollbar" data-mcs-theme="dark" ref="chatBox">
      <ul class="notification-list chat-message chat-message-field">
        <li v-for="msg in user.messages" :key="msg.id" style="border-bottom: 1px solid #e6ecf5">
          <div class="author-thumb usr-img-thumb">
            <img :src="getSenderImgPath(msg)" alt="author" class="avatar usr-img-thumb" />
          </div>
          <div class="notification-event">
            <a href="#" class="h6 notification-friend">{{getSenderName(msg, user)}}</a><br>

            <div class="mt-1">{{msg.msg}}</div><br>
            <div style="font-size: 11px">
              <time>{{msg.createdAt | relativeDate}}</time>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <form>
      <div class="form-group label-floating is-empty" @keyup.enter="send">
        <div class="text-area">
          <label class="control-label">Write your reply here...</label>
          <TextArea v-model="text" :disabled="isSending" />
        </div>  
          <div class="reply-btn">
            <button
              class="btn btn-md-2 btn-primary"
              :disabled="isSending || !text"
               @click="send"
              >Post Reply</button>
          </div>  
            <div v-if="isSending" class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
      </div> 
    </form>
  </div>
  <!-- ... end Window-popup-CHAT for responsive min-width: 768px -->
</template>

<script>
import TextArea from "@/components/atoms/TextArea";
import UserHelperVue from "../../mixins/UserHelper.vue";
import ChatHelperVue from "../../mixins/ChatHelper.vue";
export default {
  name: "ChatThread",
  components: {
    TextArea
  },
  props: {
    chatMsgs: Array,
    userChatId: Number
  },
  mixins: [UserHelperVue, ChatHelperVue],
  data() {
    return {
      isSending: false,
      text: "",
      payload: {}
    };
  },
  computed: {
    user() {
      let arr = [];
      arr = this.chatMsgs.filter(item => {
        return this.userChatId === item.id;
      });
      return arr[0];
    }
  },
  methods: {
    async send(event) {
      event.preventDefault();
      this.isSending = true;
      this.payload = this.user.messages[0];
      this.payload.msg = this.text;

      await this.postUserMessage({
        message: this.payload,
        id: this.user.id,
        postMsg: this.text
      });

      this.text = "";
      this.payload = {};
      this.isSending = false;
    },
    scrollToBottom() {
      const contentBox = this.$refs.chatBox;
      contentBox.scrollTop = contentBox.scrollHeight;
    }
  },
  updated() {
    this.scrollToBottom();
  }
};
</script>

<style scoped>
.usr-img-thumb {
  height: 34px;
  width: 34px;
}

.spinner-border {
  position: absolute;
  top: 50px;
  right: 420px;
}

.text-area{
  padding-bottom: 90px;
  width: 430px;
  height: 140px;
}

.reply-btn{
  position: absolute;
  height: 10px;
  width: 200px;
  right: 0px;
  top: 80px;
}
</style>