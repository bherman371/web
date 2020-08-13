<template>
  <div>
    <div class="ui-block">
      <!-- Post -->

      <article class="hentry post">
        <div class="post__author author vcard inline-items">
          <img :src="getUserImagePath(message.sUser)" alt="author" />

          <div class="author-date">
            <a class="h6 post__author-name fn"><router-link :to="`/s-app/profile-page/${message.sUser.id}`">{{this.getUserName(this.message.sUser)}}</router-link> sent a new message to the moderator of <router-link :to="`/s-app/group-page/${message.group.id}`">{{this.message.group.name}}</router-link> (you)</a>
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

        <button class="btn btn-md-2 btn-primary" @click.prevent="sendMessage">Reply</button>
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
  name: "SNewGroupMemberMessageToMeAsModerator",
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
      'replyToGroupMember'
    ]),
    getTimeAgo(time) {
      return moment(time).fromNow();
    },
    sendMessage() {
      let newMessage = {
        _group: this.message._group,
        newMessage: this.msg,
        _sUser: this.message._sUser
      }
      this.replyToGroupMember(newMessage);
      this.msg = ''
    }
  }
}
</script>
