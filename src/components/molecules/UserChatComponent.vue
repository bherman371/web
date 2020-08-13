<template>
  <ul class="chat-users" @click="$emit('button')">
    <li class="inline-items js-chat-open">
      <div class="author-thumb usr-img-thumb">
        <img alt="author" :src="img" class="avatar usr-img-thumb" />
      </div>

      <div class="author-status">
        <a href="#" class="h6 author-name">{{usrName}}</a>
      </div>
    </li>
  </ul>
</template>

<script>
import UserHelperVue from "../../mixins/UserHelper.vue";
export default {
  name: "UserChatComponent",
  props: ["name", "id"],
  mixins: [UserHelperVue],
  data(){
    return{
      usr:{
        id: this.id
      }
    }
  },
  computed: {
    usrName() {
      if (this.name) {
        return this.name;
      } else {
        return "Anonymous";
      }
    },
    img() {
      if (this.usr.id) {
        return this.getUserImagePath(this.usr);
      } else {
        return "/img/user-default-avatar.png";
      }
    },
  }
};
</script>

<style scoped>
.usr-img-thumb {
  height: 34px;
  width: 34px;
}
</style>