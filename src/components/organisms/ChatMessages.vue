<template>
  <div class="container">
    <div class="header-spacer"></div>
    <div class="row">
      <div>
        <div class="ui-block">
          <div class="ui-block-title">
            <h6 class="title">Chat / Messages</h6>
          </div>

          <div class="row">
            <div class="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12 padding-r-0">
              <ChatItemList
                v-for="message in messagesSortedByDate"
                :key="message.id"
                :message="message"
                @button="getChat"
                :newMsg="getNewestMsgFromSender(message.messages)"
              />
            </div>

            <div class="col col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12 padding-l-0" >
              <ChatThread :chatMsgs="currentUserChat" :userChatId="chat"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatThread from "@/components/organisms/ChatThread";
import ChatItemList from "@/components/molecules/ChatItemList";
import ChatHelperVue from "../../mixins/ChatHelper.vue";
import { mapGetters } from "vuex";
export default {
  name: "ChatMessages",
  components: {
    ChatThread,
    ChatItemList
  },
  mixins: [ChatHelperVue],
  data(){
    return{
      chat: 1
    }
  },
  computed: {
    ...mapGetters({
      currentUserChat: "getUserMessages"
    }),
    messagesSortedByDate() {
      if (!this.currentUserChat) return [];

      const messages = [...this.currentUserChat];
      const sortedMessages = messages.sort((a, b) => {
        const dateA = new Date(this.getLastMsgTimeStamp(a.messages));
        const dateB = new Date(this.getLastMsgTimeStamp(b.messages));
        return dateB - dateA;
      })

      return sortedMessages;
    }
  },
  methods:{
    getChat(value){
      this.chat = value;
    }
  },
  created() {
    this.fetchUserMessages();
  }
};
</script>

<style>
</style>