<template>
  <div class="ui-block">
    <!-- Post -->
    <article class="hentry post video">
      <div class="post__author author vcard inline-items w-100">
        <img :src="getUserImagePath(item.user)" alt="author" />

        <div class="author-date">
          <a class="h6 post__author-name fn">
            <router-link :to="`/s-app/profile-page/${item.posterId}`">{{ getUserName(item.user) }}</router-link>
          </a> posted a new item
          <div class="post__date">
            <time class="published" datetime="2017-03-24T18:18">{{ getTimeAgo(item.createdAt) }}</time>
          </div>
        </div>
          <!-- Contact Icon -->
          <span
            v-if="!isItemFromUser"
            class="notification-icon float-right"
            data-toggle="tooltip"
            data-placement="top"
            data-original-title="Send a message to the poster"
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
              <button
                class="trade-btn no-outline"
                data-toggle="modal"
                :data-target="`#${tradeItemModalId}`"
              >
                <svg class="olymp-chat-share-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon" />
                </svg>
              </button>
            <ModalTradeItem :item="item" />
          </span>
      </div>

      <router-link :to="`/s-app/item-details/${item.id}`">
        <div class="post-video item-inner-card" as="router-link" :to="`/s-app/profile-page/${item.posterId}`">
          <div class="video-thumb d-flex">
            <img :src="getItemImagePath(item)" alt="photo" />
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

          <div class="video-content">
            <a href="#" class="h4 title">{{ item.title }}</a>
            <p>{{ item.description }}</p>
            <p
              class="text-right price"
              :class="{'mb-0': !isFree}"
              v-html="getItemValue(item)"></p>
            <p class="text-right item-condition mt-0" v-html="getItemCondition(item)"></p>
          </div>
        </div>
      </router-link>
    </article>
    <!-- .. end Post -->
  </div>
</template>

<script>
import moment from "moment";
import userHelper from "@/mixins/UserHelper.vue";
import itemHelper from "@/mixins/ItemHelper.vue";
import ModalTradeItem from '../molecules/ModalTradeItem.vue';

export default {
  name: "SNewItem",
  components: {
    ModalTradeItem,
  },
  props: ["item"],
  mixins: [userHelper, itemHelper],
  methods: {
    getTimeAgo(time) {
      return moment(time).fromNow();
    },
    openChat() {
      this.$emit("openWindowPopup");
    }
  },
  computed: {
    isFree() {
      if (this.getItemValue(this.item) === '<span class="free-price">FREE</span>') {
        return true;
      }
      return false;
    },
    tradeItemModalId() {
      return `trade-item-${this.item.id}`;
    },
    isItemFromUser() {
      return this.item.posterId === this.loggedUser.id;
    },
    tradeButtonTooltip() {
      const type = this.item.type;
      if (type === 1 || type === 3)
        return "Request from this poster";
      else if (type === 2 || type === 4)
        return "Offer to this poster";
      else
        return "Trade item";
    }
  },
  mounted() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }
};

</script>

<style lang="scss" scoped>
.item-condition {
  font-size: 1.5em !important;
  font-weight: 600;
  color: white;
}
.post-category {
  position: absolute;
  top: 15px;
}

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

<style>
.price {
  font-size: 1.5em !important;
  font-weight: 600;
}

.free-price {
  color: white;
  background-color: green;
  border-radius: 2px;
  padding: 5px;
}

.item-condition span {
  background-color: midnightblue;
  padding: 5px;
  border-radius: 2px;
}

.cash-price {
  color: blue;
}

.points-price {
  color: green;
}

.item-inner-card {
  color: #888da8;
  transition: box-shadow ease 200ms;
}

.item-inner-card:hover {
  -webkit-box-shadow: 0px 0px 6px 0px rgba(80, 80, 80, 0.2);
  -moz-box-shadow: 0px 0px 6px 0px rgba(80, 80, 80, 0.2);
  box-shadow: 0px 0px 6px 0px rgba(80, 80, 80, 0.2);
}
</style>
