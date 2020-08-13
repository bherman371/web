<template>
  <div class="ui-block">
    <!-- Post -->
    <article class="hentry post video">
      <div class="post__author author vcard inline-items">
        <img :src="getGroupImagePath(member.group)" alt="author" />

        <div class="author-date">
          <a class="h6 post__author-name fn">
            <router-link :to="`/s-app/group-page/${member.group.id}`">{{ member.group.name }}</router-link> welcomes
            <router-link :to="`/s-app/profile-page/${member.user.id}`">{{ getUserName(member.user) }}</router-link>
          </a>
          <div class="post__date">
            <time class="published" datetime="2017-03-24T18:18">{{ getTimeAgo(member.createdAt) }}</time>
          </div>
        </div>
      </div>

      <div class="post-video">
        <div class="video-thumb">
          <img :src="getUserImagePath(member.user)" alt="photo" />
        </div>

        <div class="video-content">
          <router-link :to="`/s-app/profile-page/${member.user.id}`" class="h4 title">{{ getUserName(member.user) }}</router-link>
          <p>{{ member.user.description }}</p>
        </div>
      </div>
    </article>
    <!-- .. end Post -->
  </div>
</template>

<script>
import moment from "moment";
import userHelper from "@/mixins/UserHelper.vue";
import groupHelper from "@/mixins/GroupHelper.vue";

export default {
  name: "SNewMember",
  props: ["member"],
  mixins: [userHelper, groupHelper],
  methods: {
    getTimeAgo(time) {
      return moment(time).fromNow();
    }
  }
};
</script>

<style>
</style>
