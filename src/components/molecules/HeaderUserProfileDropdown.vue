<template>
  <router-link :to="`/s-app/profile-page/${userId}`" class="author-page author vcard inline-items more">
    <div class="author-thumb profile-img">
      <img alt="author" :src="userHeaderImg" class="avatar profile-img" />
    </div>
    <div class="author-title">
      {{userName}}
      <svg class="olymp-dropdown-arrow-icon ml-1">
        <use xlink:href="/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon" />
      </svg>
    </div>
    <div class="more-dropdown more-with-triangle">
      <div class="mCustomScrollbar" data-mcs-theme="dark">
        <div class="ui-block-title ui-block-title-small">
          <h6 class="title">Your account</h6>
        </div>
        <ul class="account-settings">
          <li>
            <router-link to="/s-app/account-dashboard">
              <svg class="olymp-menu-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-menu-icon" />
              </svg>
              <span>Profile settings</span>
            </router-link>
          </li>
          <li>
            <router-link to="/s-app/my-groups">
              <svg class="olymp-star-icon left-menu-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-star-icon" />
              </svg>
              <span>Create new group</span>
            </router-link>
          </li>
          <li>
            <a href="#" @click="logout">
              <svg class="olymp-logout-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-logout-icon" />
              </svg>
              <span>Log out</span>
            </a>
          </li>
        </ul>
        <div class="ui-block-title ui-block-title-small">
          <h6 class="title">About Swampum</h6>
        </div>
        <ul>
          <li>
            <a href="#">
              <router-link to="landing-terms">
                <span>Terms and conditions</span>
              </router-link>
            </a>
          </li>
          <li>
            <a href="#">
              <router-link to="/contact-us">
                <span>Contact</span>
              </router-link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </router-link>
</template>

<script>
import UserHelperVue from "../../mixins/UserHelper.vue";
import Auth from "@/modules/Auth.js";
import { mapActions } from "vuex";
export default {
  name: "HeaderUserProfileDropdown",
  props: ["usrImg", "userName", "userId"],
  mixins: [UserHelperVue],
  computed: {
    userHeaderImg() {
      if (this.usrImg) return this.usrImg;
      return null;
    }
  },
  methods: {
    ...mapActions(["endSession"]),
    logout(event) {
      event.preventDefault();
      this.endSession();
      Auth.deauthenticateUser();
      localStorage.removeItem("user_id");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.profile-img {
  height: 34px;
  width: 34px;
}
</style>