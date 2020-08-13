<template>
  <div class="container">
    <div class="row">
      <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div class="ui-block">
          <div class="top-header">
            <div class="top-header-thumb">
              <img :src="headerPhoto" alt="nature" class="header-img" />
            </div>
            <div class="profile-section">
              <div class="row">
                <div class="col col-lg-5 col-md-5 col-sm-12 col-12">
                  <ul class="profile-menu">
                    <li>
                      <router-link :to="`/s-app/profile-page/${userProfile.id}`">
                        <a>Timeline</a>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/s-app/inventory">
                        <a>Inventory</a>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/s-app/my-groups">
                        <a>Groups</a>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="control-block-button">
                <a
                  href="#"
                  class="btn btn-control bg-purple"
                  v-if="userProfile.id !== loggedUser.id"
                  @click="setChat()"
                >
                  <svg class="olymp-chat---messages-icon">
                    <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
                  </svg>
                </a>

                <div
                  class="btn btn-control bg-primary more"
                  v-if="userProfile.id === loggedUser.id"
                >
                  <svg class="olymp-settings-icon">
                    <use xlink:href="/svg-icons/sprites/icons.svg#olymp-settings-icon" />
                  </svg>

                  <ul class="more-dropdown more-with-triangle triangle-bottom-right">
                    <li>
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#update-header-photo"
                        @click="idModal='update-profile-photo'"
                      >Update profile photo</a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#update-header-photo"
                        @click="idModal='update-header-photo'"
                      >Update header photo</a>
                    </li>
                    <li>
                      <router-link to="/s-app/account-dashboard">
                        <a>Account settings</a>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="top-header-author">
              <img :src="getUserImagePath(userProfile)" alt="author" class="author-thumb" />
              <div class="author-content">
                <a class="h4 author-name">{{userProfile.firstName}}</a>
                <div class="country">{{userProfile.zip}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalUpdatePhoto :modalId="idModal" ref="test" />
  </div>
</template>

<script>
import UserHelperVue from "../../mixins/UserHelper.vue";
import ChatHelperVue from "../../mixins/ChatHelper.vue";
import ModalUpdatePhoto from "@/components/molecules/ModalUpdatePhoto";
export default {
  name: "HeaderProfile",
  props: ["userProfile"],
  mixins: [UserHelperVue, ChatHelperVue],
  data() {
    return {
      isOpen: false,
      idModal: ""
    };
  },
  components: {
    ModalUpdatePhoto
  },
  computed: {
    headerPhoto() {
      let photo = this.getUserHeaderProfileImg(this.$route.params.id);
      if (photo) return photo;
      return "/img/profile-header.svg";
    },
    messages() {
      return this.userMessages.find(item => {
        return item.id == this.$route.params.id;
      });
    }
  },
  methods: {
    setChat() {
      this.isOpen = !this.isOpen;
      this.setPopupChat({ isOpen: this.isOpen, chatMsgs: this.messages });
      this.$parent.$parent.$refs.rightStickyBar.openClosePopup();
    }
  }
};
</script>

<style  scoped>
.header-img {
  height: 360px;
  max-width: 1268px;
}
</style>
