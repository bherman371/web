<template>
  <li class="inline-items js-chat-open" @click="$emit('button')">
    <div class="author-thumb" data-toggle="tooltip" data-placement="left" :title="usrName">
      <img alt="author" :src="img" class="avatar" style="width: 34px; height: 34px" />
      <span v-if="newMsg" class="icon-status online"></span>
    </div>
  </li>
</template>

<script>
import UserHelperVue from "../../mixins/UserHelper.vue";
export default {
  name: "UserChatAvatar",
  props: ["id", "name", "newMsg"],
  mixins: [UserHelperVue],
  data() {
    return {
      usr: {
        id: this.id || null
      }
    };
  },
  computed: {
    img() {
      if (this.usr.id) {
        return this.getUserImagePath(this.usr);
      } else {
        return "/img/user-default-avatar.png";
      }
    },
    usrName() {
      if (this.name) {
        return this.name;
      } else {
        return "Anonymous";
      }
    }
  }
};
</script>

<style>
</style>