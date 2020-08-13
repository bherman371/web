<template>
  <div
    class="ui-block"
    :class="`${resultClass}-${id}`"
    :data-cy="dataCy"
    :data-cy-type="dataCyType"
  >
    <!-- Search Result -->

    <article class="hentry post searches-item">
      <div class="post__author author vcard inline-items">
        <img :src="imgSrc" alt="author" />

        <div class="author-date">
          <router-link
            class="h6 post__author-name fn"
            :to="`group-page/${id}`"
            v-if="resultClass === 'group'"
          >
            <a>{{theTitle}}</a>
          </router-link>
          <router-link :to="`profile-page/${id}`" class="h6 post__author-name fn" v-else>
            <a>{{theTitle}}</a>
          </router-link>
          <div class="country">{{subTitle}}</div>
        </div>

        <div class="post-content float-right">
          <!-- Chat Icon -->
          <span
            class="notification-icon float-right"
            data-toggle="tooltip"
            data-placement="top"
            :title="tooltip"
            v-if="canShowChatIcon"
          >
            <button class="accept-request chat-message" @click="tryToOpenChat()">
              <svg class="olymp-chat---messages-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
              </svg>
            </button>
          </span>

          <!-- Star Icon - Join Group -->
          <span
            class="notification-icon float-right mr-1"
            v-if="resultClass === 'group'"
            data-toggle="tooltip"
            data-placement="top"
            title="Join to this group"
          >
            <button
              class="accept-request chat-message bg-primary"
              @click="tryToJoinGroup()"
            >
              <div
                class="spinner-border spinner-border-sm text-white"
                role="status"
                v-if="requesting"
              >
                <span class="sr-only">Loading...</span>
              </div>
              <svg class="olymp-chat---messages-icon" v-else>
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-star-icon" />
              </svg>
            </button>
          </span>
        </div>
      </div>

      <p class="user-description">
        <span class="title">About:</span>
        {{text}}
      </p>

      <div class="friend-count">
        <a href="#" class="friend-count-item text-center" v-if="resultClass === 'user'">
          <div class="h6">{{groups}}</div>
          <div class="title">Groups</div>
        </a>
        <a href="#" class="friend-count-item text-center" v-if="resultClass === 'group'">
          <div class="h6">{{members}}</div>
          <div class="title">Members</div>
        </a>
        <a href="#" class="friend-count-item text-center">
          <div class="h6">{{itemsNum}}</div>
          <div class="title">Items</div>
        </a>
      </div>
    </article>
    <!-- ... end Search Result -->
  </div>
</template>

<script>
import ItemHelperVue from "../../mixins/ItemHelper.vue";
import UserHelperVue from "../../mixins/UserHelper.vue";
import GroupHelper from "../../mixins/GroupHelper";
import { mapGetters } from 'vuex';

export default {
  name: "SResult",
  props: [
    "title",
    "subTitle",
    "text",
    "id",
    "itemsCount",
    "groupsCount",
    "membersCount",
    "resultClass",
    "username",
    "privacy"
  ],
  mixins: [ItemHelperVue, UserHelperVue, GroupHelper],
  data() {
    return {
      result: {
        id: this.id
      },
      requesting: false,
    };
  },
  methods: {
    async tryToJoinGroup() {
      if (this.isUserAuthenticated) {
        this.requesting = true;
        const result = await this.joinGroup(this.result.id);
        this.requesting = false;
        this.$emit('warning', result.result);
      } else {
        this.$router.push(`/s-app/search-result/${this.getQuery}?askToJoinGroup=${this.result.id}`);
      }
    },
    tryToOpenChat() {
      if (this.isUserAuthenticated) {
        if (
          this.resultClass === "user" &&
          this.loggedUser &&
          this.loggedUser.id !== this.result.id
        ) {
          this.$emit("openWindowPopup");
        } else if (this.resultClass === "group") {
          // TODO
          // quando o usuário clicar no chat de grupo, vai direcionar para a página
          // do grupo em "Messages"?
        }
      } else {
        if (this.resultClass === "user") {
          this.$router.push(`/s-app/search-result/${this.getQuery}?chatWithUser=${this.result.id}`);
        } else if (this.resultClass === "group") {
          // TODO
          // quando o usuário clicar no chat de grupo, vai direcionar para a página
          // do grupo em "Messages"?
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'isUserAuthenticated',
      'getQuery'
    ]),
    imgSrc() {
      if (this.resultClass === "item") {
        return this.getItemImagePath(this.result);
      } else if (this.resultClass === "user") {
        return this.getUserImagePath(this.result);
      } else {
        return this.getGroupImagePath(this.result);
      }
    },
    theTitle() {
      if (this.title) {
        return this.title;
      } else {
        return this.username;
      }
    },
    itemsNum() {
      if (this.itemsCount) {
        return this.itemsCount;
      } else {
        return 0;
      }
    },
    groups() {
      if (this.groupsCount) {
        return this.groupsCount;
      } else {
        return 0;
      }
    },
    members() {
      if (this.membersCount) {
        return this.membersCount;
      } else {
        return 0;
      }
    },
    tooltip() {
      if (this.resultClass === "group") {
        return "Post a new message";
      } else {
        return "Contact user";
      }
    },
    dataCy() {
      if (this.resultClass === "group") {
        return "searchResultGroup";
      } else {
        return "searchResultUser";
      }
    },
    dataCyType() {
      if (this.privacy === 1) {
        return "public";
      } else if (this.privacy === 2) {
        return "private";
      } else {
        return null;
      }
    },
    canShowChatIcon() {
      if (
        this.resultClass === "user" &&
        this.isUserAuthenticated &&
        this.loggedUser &&
        this.loggedUser.id === this.result.id
      ) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.spinner-border-sm {
  width: 20px;
  height: 20px;
  margin: 1px 0;
}
.notification-icon > button:focus {
  outline: none;
}
</style>
