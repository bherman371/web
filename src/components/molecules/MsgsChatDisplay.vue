<template>
  <ul class="notification-list chat-message chat-message-field">
    <div v-for="msg in messages" :key="msg.id">
      <li class="pr-0" v-if="msg.msg !== '\n'">
        <div class="author-thumb" v-if="user.id === msg.receiverId">
          <img
            :src="getSenderImgPath(msg)"
            alt="author"
            class="mCS_img_loaded"
            style="width: 34px; height: 34px"
          />
        </div>
        <div class="notification-event">
          <div v-if="msg.type !== 'FILE'">
            <span
              class="w-100 float-right"
              :class="{receiver: user.id === msg.receiverId, sender: user.id === msg.senderId}"
            >{{msg.msg}}</span>
            <span class="notification-date">
              <time class="entry-date updated" datetime="2004-07-24T18:18">{{msg.createdAt | date}}</time>
            </span>
          </div>
          <div v-if="msg.type === 'FILE'">
            <a
              class="w-100 float-right text-break"
              :class="{receiver: user.id === msg.receiverId, sender: user.id === msg.senderId}"
              @click="getFile(msg.msg)"
              download
            >
              <svg height="25px" width="25px" class="d-block mx-auto mb-2" style="cursor: pointer">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-blog-icon" />
              </svg>
              <span class="d-block text-center" style="cursor: pointer">{{msg.msg | fileName}}</span>
            </a>
            <span class="notification-date">
              <time class="entry-date updated" datetime="2004-07-24T18:18">{{msg.createdAt | date}}</time>
            </span>
          </div>
        </div>
        <div class="author-thumb" v-if="user.id === msg.senderId">
          <img
            :src="user.picture"
            alt="author"
            class="mCS_img_loaded"
            style="width: 34px; height: 34px"
          />
        </div>
      </li>
    </div>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import ChatHelperVue from "../../mixins/ChatHelper.vue";
export default {
  name: "MsgsChatDisplay",
  props: ["messages"],
  mixins: [ChatHelperVue],
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  methods: {
    async getFile(file) {
      const regex = new RegExp("(?<=messages/).*$");
      const fileName = file.match(regex)[0];
      let blob = await this.fetchAttachment({ fileName: fileName });
      var fileURL = URL.createObjectURL(blob);

      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = fileURL;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(fileURL);
    },
  },
  filters: {
    date(date) {
      if (!date) return "";
      const dt = new Date(date);
      const f = (d) => (d < 10 ? "0" + d : d);
      return (
        f(dt.getMonth() + 1) + "/" + f(dt.getDate()) + "/" + dt.getFullYear()
      );
    },
    fileName(string) {
      const regex = new RegExp("(?<=messages/).*$");
      return string.match(regex)[0];
    },
  },
};
</script>

<style scoped>
.usr-img-thumb {
  height: 34px;
  width: 34px;
}
.sender {
  background-color: #f0f4f9;
  padding: 13px;
  margin-top: 0;
  border-radius: 10px;
  margin-bottom: 5px;
  font-size: 12px;
}
.receiver {
  background-color: #d394eb;
  color: #fff;
  padding: 13px;
  margin-top: 0;
  border-radius: 10px;
  margin-bottom: 5px;
  font-size: 12px;
}
</style>