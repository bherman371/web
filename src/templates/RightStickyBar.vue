<template>
  <div>
    <div class="fixed-sidebar right" :class="[{'open': isOpen}]">
      <div class="fixed-sidebar-right sidebar--small" id="sidebar-right">
        <div class="mCustomScrollbar" data-mcs-theme="dark">
          <ul class="chat-users">
            <UserChatAvatar
              v-for="usr in userMessages"
              :key="usr.id"
              :id="usr.id"
              :name="usr.firstName"
              :newMsg="getNewestMsgFromSender(usr.messages)"
              @button="openClosePopup(usr.id)"
            />
          </ul>
        </div>

        <div class="search-friend inline-items" @click="isOpen = !isOpen">
          <a href="#" class>
            <svg class="olymp-menu-icon">
              <use xlink:href="/svg-icons/sprites/icons.svg#olymp-menu-icon" />
            </svg>
          </a>
        </div>

        <a href="#" class="olympus-chat inline-items">
          <svg class="olymp-chat---messages-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
          </svg>
        </a>
      </div>

      <div class="fixed-sidebar-right sidebar--large" id="sidebar-right-1">
        <div class="mCustomScrollbar" data-mcs-theme="dark">
          <UserChatComponent
            v-for="usr in filteredResults"
            :key="usr.id"
            @button="openClosePopup(usr.id)"
            :name="usr.firstName || usr.username"
            :id="usr.id"
          />
        </div>

        <div class="search-friend inline-items">
          <!-- <form class="form-group"> -->
          <SInput v-model="filter" />
          <!-- <input class="form-control" placeholder="Search Friends..." value="" type="text"> -->
          <!-- </form> -->

          <a href="#" class="mt-3" @click="isOpen = !isOpen">
            <svg class="olymp-close-icon">
              <use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon" />
            </svg>
          </a>
        </div>

        <a href="#" class="olympus-chat inline-items">
          <h6 class="olympus-chat-title">CHAT</h6>
          <svg class="olymp-chat---messages-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
          </svg>
        </a>
      </div>
    </div>
    <div class="fixed-sidebar right fixed-sidebar-responsive" id="sidebar-right-responsive">
      <div class="fixed-sidebar-right sidebar--small">
        <a href="#" class @click="isOpen = !isOpen">
          <svg class="olymp-menu-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-menu-icon" />
          </svg>
          <svg class="olymp-close-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon" />
          </svg>
        </a>
      </div>
    </div>
    <ChatModalPopup
      ref="popupWindow"
      :chatMsgs="popupWindow[0].usr"
      @popupClose="closeFirst"
      :class="{'right-open': isOpen}"
    />
    <ChatModalPopup
      ref="popupWindow1"
      :chatMsgs="popupWindow[1].usr"
      class="second-popup"
      :class="[{'second-popup': !isOpen}, {'right-open-second': isOpen}]"
      @popupClose="closeSecond"
    />
    <ChatModalPopup
      ref="popupWindow2"
      :chatMsgs="popupWindow[2].usr"
      class="third-popup"
      :class="[{'third-popup': !isOpen}, {'right-open-third': isOpen}]"
      @popupClose="closeThird"
    />
  </div>
</template>

<script>
import UserChatComponent from "@/components/molecules/UserChatComponent";
import UserChatAvatar from "@/components/atoms/UserChatAvatar";
import ChatModalPopup from "@/components/molecules/ChatModalPopup";
import SInput from "@/components/atoms/SInput";
import ChatHelperVue from "../mixins/ChatHelper.vue";

export default {
  name: "RightStickyBar",
  components: {
    UserChatComponent,
    UserChatAvatar,
    ChatModalPopup,
    SInput
  },
  mixins: [ChatHelperVue],
  data() {
    return {
      popupWindow: [
        { on: 0, usr: {} },
        { on: 0, usr: {} },
        { on: 0, usr: {} }
      ],
      filter: "",
      usrCounter: 0,
      isOpen: false
    };
  },
  methods: {
    openClosePopup(id) {
      let checkUser = null;
      if (id) {
        let getUserFrom = this.userMessages.find(item => item.id === id);
        checkUser = getUserFrom;
      } else {
        checkUser = this.chatMessages;
      }
      this.popupWindow.every((element, i) => {
        if (window.innerWidth <= 840) delete this.popupWindow[2];
        if (window.innerWidth <= 700) delete this.popupWindow[1];
        let check = this.popupWindow.some(item => {
          return item.usr.id === checkUser.id;
        });
        if (
          check === false &&
          element.on == false &&
          Object.keys(checkUser).length > 0
        ) {
          this.popupWindow[i].on = 1;
          this.popupWindow[i].usr = checkUser;
          this.openTheGates(i);
          return false;
        } else {
          return true;
        }
      });
    },
    closeFirst() {
      this.popupWindow[0].on = 0;
      this.popupWindow[0].usr = {};
    },
    closeSecond() {
      this.popupWindow[1].on = 0;
      this.popupWindow[1].usr = {};
    },
    closeThird() {
      this.popupWindow[2].on = 0;
      this.popupWindow[2].usr = {};
    },
    openTheGates(index) {
      if (index === 0) {
        this.$refs.popupWindow.open();
      } else if (index === 1) {
        this.$refs.popupWindow1.open();
      } else if (index === 2) {
        this.$refs.popupWindow2.open();
      }
    },
    perfectScrollbarInit() {
      var $chatContainer = $(".popup-chat-responsive .mCustomScrollbar");
      var $containers = $(".mCustomScrollbar");

      $containers.perfectScrollbar({ wheelPropagation: false });

      if (!$chatContainer.length) {
        return;
      }

      $chatContainer.scrollTop($chatContainer.prop("scrollHeight"));
      $chatContainer.perfectScrollbar("update");
    }
  },
  updated() {
    this.perfectScrollbarInit();
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }
};
</script>

<style scoped>
.second-popup {
  margin-right: 310px;
}
.third-popup {
  margin-right: 620px;
}
@media (min-width: 840px) {
  .right-open {
    margin-right: 220px;
  }
  .right-open-second {
    margin-right: 530px;
  }
  .right-open-third {
    margin-right: 840px;
  }
}
</style>