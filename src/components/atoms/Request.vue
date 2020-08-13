<template>
  <div>
    <div v-for="request in allRequests" :key="request.id">
      <ul class="notification-list" v-if="request.type === 'notification'">
        <li class="un-read">
          <div class="author-thumb anonymous-dude">
            <img :src="getGroupImagePath(request.group)" alt="author" class="anonymous-dude" />
          </div>
          <div class="notification-event">
            <div>
              <router-link
                :to="`profile-page/${request.groupId}`"
                class="h6 notification-friend"
              >{{getRequestTitle(request)}}</router-link>
            </div>
            <div class="notification-date">
              <div class="entry-date updated">{{request.createdAt | date}}</div>
            </div>
          </div>
          <span class="notification-icon">
            <svg class="olymp-happy-face-icon">
              <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon" />
            </svg>
          </span>
        </li>
      </ul>
      <ul class="notification-list friend-requests" v-else>
        <li class="un-read" v-if="!request.success">
          <div class="author-thumb anonymous-dude">
            <img :src="getGroupImagePath(request.group)" alt="author" class="anonymous-dude" />
          </div>
          <div class="notification-event">
            <router-link
              :to="`group-page/${request.groupId}`"
              class="h6 notification-friend"
            >{{getRequestTitle(request)}}</router-link>
            <div class="chat-message-item">{{request.createdAt | date}}</div>
          </div>
          <span class="notification-icon">
            <button class="accept-request" @click="accept(request.groupId)">
              <span class="icon-add mr-0">
                <svg class="olymp-happy-face-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon" />
                </svg>
              </span>
            </button>
            <button class="accept-request request-del" @click="decline(request.groupId)">
              <span class="icon-minus">
                <svg class="olymp-happy-face-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-face-icon" />
                </svg>
              </span>
            </button>
          </span>
        </li>
        <li class="text-center" v-if="request.success">
          <span>{{result.result}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserHelperVue from "../../mixins/UserHelper.vue";
import GroupHelperVue from "../../mixins/GroupHelper.vue";
export default {
  name: "Request",
  props: ["requests"],
  mixins: [UserHelperVue, GroupHelperVue],
  data() {
    return {
      result: null
    };
  },
  computed: {
    allRequests() {
      return this.requests.map(item => {
        return {
          success: false,
          ...item
        };
      });
    }
  },
  methods: {
    async accept(groupIp, index) {
      this.result = await this.acceptJoinInvitation(groupIp);
      if (this.result.result.match("successfully")) {
        this.allRequests[index].success = true;
      }
    },
    decline(groupIp) {
      this.declineJoinInvitation(groupIp);
    }
  },
  filters: {
    date(date) {
      if (!date) return "";
      const dt = new Date(date);
      const f = d => (d < 10 ? "0" + d : d);
      return (
        f(dt.getMonth() + 1) + "/" + f(dt.getDate()) + "/" + dt.getFullYear()
      );
    }
  }
};
</script>

<style scoped>
.anonymous-dude {
  width: 35px;
  height: 35px;
}
</style>