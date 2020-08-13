<template>
  <div class="page-has-left-panels page-has-right-panels">
    <div class="header-spacer"></div>
    <Header v-if="Object.keys(user).length === 0" />
    <div class="container">
      <div class="row">
        <div
          class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12"
          data-cy="divSearchResults"
        >
          <SShowResultBar :count="filteredResults.length" />
          <SFilterBar @button="makeSearch" />
          <div id="search-items-grid">

            <div v-if="isSearching" class="ui-block px-4 py-5 text-center">
              <span>
                <span
                  class="spinner-border spinner-border-sm mr-2"
                >
                </span>
                <span>Searching...</span>
              </span>
            </div>

            <div v-for="(result, index) in filteredResults" :key="result.uId">
              <SResult
                v-if="result.class === 'group' || result.class === 'user'"
                :title="result.title"
                :username="result.username"
                :subTitle="result.subTitle"
                :text="result.description"
                :id="result.id"
                :itemsCount="result.items"
                :groupsCount="result.groups"
                :resultClass="result.class"
                :membersCount="result.members"
                :privacy="result.privacy"
                :ref="`${result.class}-${result.id}`"
                @warning="joinGroupWarning"
                @openWindowPopup="openChat(index)"
              />
              <SItemResult
                v-if="result.class === 'item'"
                :item="result"
                @openWindowPopup="openChat(index)"
              />
            </div>
          </div>
        </div>
        <SLeftBar />
        <SRightBar />
      </div>
    </div>
    <Modal
      id="result-warning"
      buttonName="OK"
      :title="warningTitle"
      ref="modal"
      @button="closeModal()"
      class="font-weight-bold"
    >{{warning}}</Modal>

    <ModalConfirmLoginRedirect v-if="!isUserAuthenticated" @button="confirmRedirect()" />
  </div>
</template>

<script>
import SResult from "@/components/molecules/SResult";
import SShowResultBar from "@/components/atoms/SShowResultBar";
import SLeftBar from "@/components/organisms/SLeftBar";
import SRightBar from "@/components/organisms/SRightBar";
import SFilterBar from "@/components/molecules/SFilterBar";
import SItemResult from "@/components/molecules/SItemResult";
import Header from "@/templates/Header";
import Modal from "@/components/atoms/Modal";
import ModalConfirmLoginRedirect from '../molecules/ModalConfirmLoginRedirect.vue';

import { mapGetters, mapActions } from "vuex";
import ChatHelperVue from "../../mixins/ChatHelper.vue";
import uniqid from "uniqid";

export default {
  name: "SSearchResults",
  mixins: [ChatHelperVue],
  components: {
    SResult,
    SShowResultBar,
    SLeftBar,
    SRightBar,
    SFilterBar,
    SItemResult,
    Header,
    ModalConfirmLoginRedirect,
    Modal
  },
  data() {
    return {
      isSearching: false,
      canRedirect: false,
      redirectTo: null,
      filter: {
        itemType: "",
        privacy: null,
        options: ""
      },
      selectedItemChat: null,
      warning: null,
      warningTitle: null
    };
  },
  computed: {
    ...mapGetters({
      searchResult: "getSearchResult",
      isUserAuthenticated: "isUserAuthenticated",
      user: "getUser"
    }),
    filteredResults() {
      let arr = this.searchResult.map(item => {
        return {
          ...item,
          uId: uniqid()
        };
      });
      if (!this.filter.options) {
        return arr;
      }

      if (this.filter.options === "item") {
        if (!this.filter.itemType) {
          return arr.filter(item => {
            return item.class === "item";
          });
        } else if (this.filter.itemType === 1) {
          return arr.filter(item => {
            return item.type === 1 && item.class === "item";
          });
        } else if (this.filter.itemType === 2) {
          return arr.filter(item => {
            return item.type === 2 && item.class === "item";
          });
        } else if (this.filter.itemType === 3) {
          return arr.filter(item => {
            return item.type === 3 && item.class === "item";
          });
        } else if (this.filter.itemType === 4) {
          return arr.filter(item => {
            return item.type === 4 && item.class === "item";
          });
        }
      }
      if (this.filter.options === "group") {
        if (this.filter.privacy === null) {
          return arr.filter(item => {
            return item.class === "group";
          });
        } else if (this.filter.privacy === 1) {
          return arr.filter(item => {
            return item.privacy === 1 && item.class === "group";
          });
        } else if (this.filter.privacy === 2) {
          return arr.filter(item => {
            return item.privacy === 2 && item.class === "group";
          });
        }
      }
      if (this.filter.options === "user") {
        return arr.filter(item => {
          return item.class === "user";
        });
      }
      return null;
    }
  },
  methods: {
    ...mapActions(["searchAPI"]),
    makeSearch(value) {
      this.filter = value;
    },
    openChat(index) {
      if (this.filteredResults[index].class === "user") {
        this.selectedItemChat = this.filteredResults[index];  
      } else if (this.filteredResults[index].class === "item") {
        this.selectedItemChat = this.filteredResults[index].user;
      }
      if (
        this.userMessages.some(item => this.selectedItemChat.id === item.id)
      ) {
        this.selectedItemChat = this.userMessages.find(item => {
          return item.id === this.selectedItemChat.id;
        });
      }
      this.setPopupChat({
        isOpen: true,
        chatMsgs: this.selectedItemChat
      });
      this.$parent.$refs.rightStickyBar.openClosePopup();
    },
    joinGroupWarning(warning) {
      this.warning = warning;
      this.warningTitle = "Join group"
      $("#result-warning").modal("show");
    },
    closeModal() {
      this.$refs.modal.closeModal();
    },
    openTradeModal(itemId) {
      $(`#trade-item-${itemId}`).modal('show');
    },
    confirmRedirect() {
      this.canRedirect = true;
      this.$router.push(this.redirectTo);
    }
  },
  watch: {
    userMessages(newValue) {
      if (newValue) {
        this.selectedItemChat = newValue[newValue.length - 1];
      }
    }
  },
  async created() {
    if (this.$route.params.query) {
      this.isSearching = true;
      await this.searchAPI({ query: this.$route.params.query });
      this.isSearching = false;
    }

    const itemId = this.$route.query.sendTradeMessage;
    if (itemId) {
      $(() => {
        this.openTradeModal(itemId);
      });
    }

    const groupId = this.$route.query.askToJoinGroup;
    if (groupId) {
      $(() => {
        const ref = `group-${groupId}`;
        const groupCard = $(`.${ref}`)[0];
        groupCard.scrollIntoView(false);
        this.$refs[ref][0].tryToJoinGroup(groupId);
      });
    }

    const userId = this.$route.query.chatWithUser;
    if (userId) {
      $(() => {
        const ref = `user-${userId}`;
        const usarCard = $(`.${ref}`)[0];
        usarCard.scrollIntoView(false);
        this.$refs[ref][0].tryToOpenChat(userId);
      });
    }
  },
  updated() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  },
  beforeRouteLeave (to, from, next) {
    if (this.isUserAuthenticated || this.canRedirect || to.path === "/") {
      next();
    } else {
      this.redirectTo = to.fullPath;
      $("#confirm-login-redirect").modal("show");
      next(false);
    }
  }
};
</script>

<style>
</style>
