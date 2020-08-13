<template>
  <div>
    <div class="ui-block">
      <!-- Post -->

      <article class="hentry post">
        <div class="post__author author vcard inline-items">
          <img :src="getUserImagePath(message.sender)" alt="author" />

          <div class="author-date">
            <a class="h6 post__author-name fn"><router-link :to="`/s-app/profile-page/${message.senderId}`">{{getUserName(message.sender)}}</router-link> sent a new message on <router-link :to="`/s-app/group-page/${message.groupId}`">{{message._group.name}}</router-link></a>
            <div class="post__date">
              <time class="published" datetime="2017-03-24T18:18">{{ getTimeAgo(message.createdAt) }}</time>
            </div>
          </div>
        </div>
        <p>
          {{ message.msg }}
        </p>
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
              >
              </a>
            </div>
          </div>
        </div>

        <button class="btn btn-md-2 btn-primary" @click="sendMessage">Reply</button>
      </form>
      <!-- ... end Comment Form  -->
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import userHelper from '@/mixins/UserHelper.vue'
import currentUser from '@/mixins/CurrentUser.vue'
import { mapActions } from 'vuex'

export default {
  name: "SNewGroupMessage",
  props: [
    'message'
  ],
  mixins: [
    userHelper,
    currentUser
  ],
  data () {
    return {
      msg: ""
    }
  },
  methods: {
    ...mapActions([
      'replyToGroupMessage'
    ]),
    getTimeAgo(time) {
      return moment(time).fromNow();
    },
    sendMessage() {
      let newMessage = {
        groupId: this.message.groupId,
        newMessage: this.msg
      }
      this.replyToGroupMessage(newMessage);
      this.msg = ''
    }
  }
}
</script>
