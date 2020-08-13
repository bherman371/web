<template>
  <div>
    <ul class="comments-list" v-for="(item, index) in items" :key="`item-${index}`">
      <li class="comment-item has-children">
        <div class="inline-items">
          <img :src="getItemImagePath(item)" alt="author" class="anonymous-dude mr-2" />

          <div class="author-date">
            <a class="h6 post__author-name fn">{{item.Title}}</a>
            <div class="post__date">{{item.CreatedAt | relativeDate}}</div>
          </div>
        </div>
        <div class="full-width"></div>
        <div>
          <ul class="children mt-0" v-for="request in requests" :key="request.id">
            <li class="comment-item" v-if="request.itemId === item.id && request.situation === 1">
              <div class="inline-items">
                <img
                  :src="getUserImagePath(request.sUser)"
                  class="anonymous-dude mr-2"
                  alt="author"
                />

                <div class="author-date">
                  <a class="h6 post__author-name fn">{{getUserName(request.sUser)}}</a>
                  <div class="post__date">{{request.createdAt || request.updatedAt | relativeDate}}</div>
                </div>

                <a class="post-add-icon ml-4 pointer" @click="setChat(request)">
                  <svg class="olymp-chat---messages-icon" fill="black" id="my-icon" height="20px" width="20px">
                    <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
                  </svg>
                </a>
              </div>
              <a class="inline-items pointer mr-3" @click="accept(request)">
                <svg height="30px" width="30px" id="my-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#new-accept-icon" />
                </svg>
              </a>
              <a class="inline-items pointer" @click="decline(request)">
                <svg height="30px" width="30px" id="my-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#new-close-icon" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <Modal
      id="accept"
      buttonName="OK"
      title="Request accepted"
      ref="acccept"
      @button="closeModal()"
      class="font-weight-bold"
    >{{response}}</Modal>
    <Modal
      id="decline"
      buttonName="OK"
      title="Request declined"
      ref="decline"
      @button="closeModal()"
      class="font-weight-bold"
    >{{response}}</Modal>
  </div>
</template>

<script>
import ItemHelperVue from "../../mixins/ItemHelper.vue";
import UserHelperVue from "../../mixins/UserHelper.vue";
import ChatHelperVue from "../../mixins/ChatHelper.vue";
import Modal from "@/components/atoms/Modal";

export default {
  components:{
    Modal
  },
  name: "PostAreaItem",
  props: ["items", "requests"],
  mixins: [ItemHelperVue, UserHelperVue, ChatHelperVue],
  methods: {
    setChat(request) {
      let result = this.filteredResults.find(
        (element) => element.id === request.sUserId
      );
      this.setPopupChat({ isOpen: true, chatMsgs: result });
      this.$parent.$parent.$parent.$refs.rightStickyBar.openClosePopup();
    },
    accept(request) {
      this.acceptItemRequest({ request: request });
      $("#accept").modal("show");
    },
    closeModal() {
      this.$refs.modal.closeModal();
    },
    decline(request) {
      this.declineItemRequest({ request: request });
      $("#decline").modal("show");

    },
    
  }
};
</script>

<style lang="scss" scoped>
.anonymous-dude {
  width: 50px;
  height: 50px;
}
.pointer {
  cursor: pointer;
}
#my-icon {
  &:hover {
    fill: #08ddc1;
  }
}
</style>