<template>
  <div
    class
    data-cy="searchResultItem"
    :data-cy-type="getItemCategory(item).substring(5).replace('</div>','').toLowerCase()"
  >
    <div class="ui-block">
      <!-- Post -->

      <article class="hentry blog-post blog-post-v3">
        <div class="post-thumb">
          <img :src="getItemImagePath(item)" alt="photo" style="max-height: 261.5px" />
          <span
            class="post-category h5"
            :class="{
              'bg-green': item.type === 1,
              'bg-pink': item.type === 2,
              'bg-purple': item.type === 3,
              'bg-blue': item.type === 4
            }"
            style="font-size: 11px"
            v-html="getItemCategory(item)"
          />
        </div>

        <div class="post-content">
          <!-- Contact Icon -->
          <span
            v-if="!isItemFromUser"
            class="notification-icon float-right"
            data-toggle="tooltip"
            data-placement="top"
            :title="popupText"
          >
            <button class="accept-request chat-message no-outline" @click="openChat()">
              <svg class="olymp-chat---messages-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
              </svg>
            </button>
          </span>

          <!-- Share Icon -->
          <span
            v-if="!isItemFromUser"
            class="notification-icon float-right mr-1"
            data-toggle="tooltip"
            data-placement="top"
            :title="tradeButtonTooltip"
          >
              <button class="trade-btn no-outline" @click="openTrade()">
                <svg class="olymp-chat-share-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon" />
                </svg>
              </button>
            <ModalTradeItem v-if="isUserAuthenticated" :item="item" />
          </span>

          <!-- Pencil Icon -->
          <span
            v-if="isItemFromUser"
            class="notification-icon float-right"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit this post"
          >
            <button class="accept-request pencil-bg no-outline">
              <router-link to="/s-app/item-review">
                <svg class="olymp-pencil-icon pencil-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-pencil-icon" />
                </svg>
              </router-link>
            </button>
          </span>

          <div class="author-date">
            posted by
            <router-link class="h6 post__author-name fn" :to="`/s-app/profile-page/${item.posterId}`">{{getPosterName(item)}}</router-link>
            <br />
            <div class="post__date">
              <time class="published" datetime="2017-03-24T18:18">- {{item.createdAt | date}}</time>
            </div>
          </div>

          <router-link :to="`/s-app/item-details/${item.id}`" class="h3 post-title">
            <a>{{getItemTitle(item)}}</a>
          </router-link>
          <p>{{getItemDescription(item)}}</p>

          <div class="btn m-0 p-0">
            <div class="item-value mr-2" v-html="getItemValue(item)" />
            <div class="item-condition" v-html="getItemCondition(item)" />
          </div>

          <!-- People interested -->
          <div class="btn m-0 p-0" v-if="isItemFromUser">
            <router-link :to="`item-details/${item.id}`">
              <svg class="olymp-happy-faces-icon ml-5 faces-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-faces-icon" />
              </svg>
              <p class="faces-icon" style="display: inline;">{{numPeople}} Interested</p>
            </router-link>
          </div>
        </div>
      </article>

      <!-- ... end Post -->
    </div>
  </div>
</template>

<script>
import ItemHelperVue from "../../mixins/ItemHelper.vue";
import UserHelperVue from "../../mixins/UserHelper.vue";
import ModalTradeItem from '../molecules/ModalTradeItem.vue';
import { mapGetters } from "vuex"

export default {
  name: "SItemResult",
  components: {
    ModalTradeItem,
  },
  props: ["item"],
  mixins: [ItemHelperVue, UserHelperVue],
  data() {
    return {
      checkModal: {
        cModal: this.cModal
      },
    };
  },
  methods: {
    openChat() {
      if (this.isUserAuthenticated) {
        this.$emit("openWindowPopup");
      } else {
        const searchQuery = this.getQuery || this.item.title;
        this.$router.push(`/s-app/search-result/${searchQuery}?sendTradeMessage=${this.item.id}`);
      }
    },
    openTrade() {
      if (this.isUserAuthenticated) {
        $(`#${this.tradeItemModalId}`).modal("show");
      } else {
        const searchQuery = this.getQuery || this.item.title;
        this.$router.push(`/s-app/search-result/${searchQuery}?sendTradeMessage=${this.item.id}`);
      }
    }
  },
  computed: {
    ...mapGetters([
      'isUserAuthenticated',
      'getQuery',
      'getUser',
      'getUserInventory'
    ]),
    popupText() {
      if (this.isUserAuthenticated) {
        // 1 [GIVE], 2 [RECEIVE], 3 [BORROW], 4 [LEND]
        if (this.item.type === 1 || this.item.type === 3) {
          return "Contact user to request this item."
        } else if (this.item.type === 2 || this.item.type === 4) {
          return "Contact user to offer this item."
        }
      } else {
        // 1 [GIVE], 2 [RECEIVE], 3 [BORROW], 4 [LEND]
        if (this.item.type === 1 || this.item.type === 3) {
          return "Log in or register to request this item."
        } else if (this.item.type === 2 || this.item.type === 4) {
          return "Log in or register to offer this item."
        }
      }
      return null
    },
    tradeItemModalId() {
      return `trade-item-${this.item.id}`;
    },
    isItemFromUser() {
      const userId = this.loggedUser && this.loggedUser.id;
      return this.item.posterId === userId;
    },
    tradeButtonTooltip() {
      const type = this.item.type;
      if (this.isUserAuthenticated) {
        if (type === 1 || type === 3)
          return "Request from this poster";
        else if (type === 2 || type === 4)
          return "Offer to this poster";
        else
          return "Trade item";
      } else {
        if (type === 1 || type === 3)
          return "Login to request from this poster";
        else if (type === 2 || type === 4)
          return "Login to offer to this poster";
        else
          return "Trade item";
      }
    },
    numPeople() {
      let num = this.getUserInventory.find(inventoryItem => inventoryItem.id === this.item.id);
      if (num) {
        return num.countInterested;
      }
      return 0;
    }
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
  }
};
</script>

<style scoped>
.item-value {
  color: #ff5e3a;
  display: inline-block;
}
.item-condition {
  display: inline-block;
}
.pencil-icon {
  color: #ffffff;
  fill: #ffffff;
}
.faces-icon {
  color: #9A9FBF;
  fill: #9A9FBF;
}
.pencil-bg {
  background-color: #4c8fc5;
  color:#fff
}
</style>

<style>
.item-condition span {
  background-color: midnightblue;
  padding: 5px;
  border-radius: 2px;
}
</style>

<style lang="scss" scoped>
.trade-btn {
  display: inline-block;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;

  border: 1px solid transparent;
  padding: 0.5rem;
  font-size: 0.688rem;
  border-radius: 0.25rem;
  transition: all 180ms ease-in-out;
  background-color: #47DB86;
  color: #ffffff;
  fill: #ffffff;

  &:hover, &:focus {
    background-color: rgba($color: #47DB86, $alpha: 0.87);
    opacity: 0.9;
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

.no-outline {
  &:hover, &:focus {
    outline: none;
  }
}
</style>
