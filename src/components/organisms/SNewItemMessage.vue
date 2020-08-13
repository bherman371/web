<template>
  <div class="ui-block">
    <!-- Post -->

    <article class="hentry post">
      <div class="post__author author vcard inline-items">
        <img :src="getUserImagePath(message.sender)" alt="author" />

        <div class="author-date">
          <a class="h6 post__author-name fn">
            <router-link
              :to="`/s-app/profile-page/${message.sender.id}`"
            >{{getUserName(message.sender)}}</router-link> post a new comment on
            <router-link :to="`/s-app/item-details/${message._item.id}`">{{ message._item.title }}</router-link>
          </a>
          <div class="post__date">
            <time class="published" datetime="2017-03-24T18:18">{{ getTimeAgo(message.createdAt) }}</time>
          </div>
        </div>
      </div>
      <p>{{ message.msg }}</p>
    </article>

    <!-- .. end Post -->

    <!-- Comment Form  -->

    <form class="comment-form inline-items">
      <div class="post__author author vcard inline-items">
        <img :src="getUserImagePath(currentUser)" alt="author" />

        <div class="form-group with-icon-right">
          <textarea class="form-control" placeholder v-model="msg"></textarea>
          <div class="add-options-message">
            <a
              href="#"
              class="options-message"
              data-toggle="modal"
              data-target="#update-header-photo"
            ></a>
          </div>
        </div>
      </div>

      <button class="btn btn-md-2 btn-primary" @click.prevent="sendMessage">Reply</button>
    </form>
    <!-- ... end Comment Form  -->
  </div>
</template>
<script>
import moment from "moment";
import userHelper from "@/mixins/UserHelper.vue";
import currentUser from "@/mixins/CurrentUser.vue";
import { mapActions } from "vuex";

export default {
  name: "SNewItemMessage",
  props: ["message"],
  mixins: [userHelper, currentUser],
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    ...mapActions(["replyToItemComment"]),
    getTimeAgo(time) {
      return moment(time).fromNow();
    },
    sendMessage() {
      let newMessage = {
        itemId: this.message.itemId,
        newMessage: this.msg
      };
      this.replyToItemComment(newMessage);
      this.msg = "";
    }
  }
};
</script>
