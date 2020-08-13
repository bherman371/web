<template>
  <div class="ui-block">
    <!-- Post -->
    <article class="hentry post video">
      <div class="post__author author vcard inline-items">
        <img :src="getUserImagePath(request.sUser)" alt="author" />

        <div class="author-date">
          <a class="h6 post__author-name fn">
            <router-link :to="`/s-app/profile-page/${request.sUserId}`">{{ getUserName(request.sUser) }}</router-link> is requesting to join <router-link :to="`/s-app/group-page/${request.groupId}`">{{ request.group.name }}</router-link>
          </a>
          <div class="post__date">
            <time class="published" datetime="2017-03-24T18:18">{{ getTimeAgo(request.createdAt) }}</time>
          </div>
        </div>
      </div>

      <div class="post-video">
        <div class="video-thumb">
          <img :src="getGroupImagePath(request.group)" alt="photo" />
        </div>

        <div class="video-content">
          <a href="#" class="h4 title">{{ request.group.name }}</a>
          <p>{{ request.group.description }}</p>
          <p class="text-right">Members: {{ request.numMembers }} Items: {{ request.numItems }}</p>
        </div>
      </div>
    </article>
    <!-- .. end Post -->
    <form class="comment-form inline-items">
      <button class="btn btn-md-2 btn-primary" @click.prevent="accept">Accept</button>
      <button class="btn btn-md-2 btn-secondary" @click.prevent="decline">Decline</button>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import userHelper from "@/mixins/UserHelper.vue";
import groupHelper from "@/mixins/GroupHelper.vue";
import CurrentUser from "@/mixins/CurrentUser.vue";
import { mapActions } from 'vuex';

export default {
  name: "SNewRequestToJoin",
  props: ["request"],
  mixins: [userHelper, CurrentUser, groupHelper],
  methods: {
    ...mapActions([
      'acceptRequestToJoin',
      'declineRequestToJoin'
    ]),
    getTimeAgo(time) {
      return moment(time).fromNow();
    },
    accept(){
      this.acceptRequestToJoin(this.request);
    },
    decline(){
      this.declineRequestToJoin(this.request);
    }
  }
};
</script>

<style>

</style>
