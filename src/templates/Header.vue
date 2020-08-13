<template>
  <div>
    <header
      class="header"
      :class="{'header--logout': !isLogged}"
      id="site-header"
      data-cy="nfHeader"
    >
      <router-link to="/" class="logo" v-if="!isLogged">
        <div class="img-wrap m-auto">
          <img src="/img/favicon.png" alt="Swampum" />
        </div>
      </router-link>
      <div class="page-title">
        <h6>{{titleHeader}}</h6>
      </div>

      <div class="header-content-wrapper">
        <form class="search-bar w-search notification-list friend-requests">
          <div class="form-group with-button is-empty">
            <div class="selectize-control form-control">
              <div class>
                <SInput
                  type="text"
                  v-model="query"
                  placeholder="Search here people, pages or items..."
                  style="opacity: 1; position: relative; left: 0px; top: 0px"
                  @atFocus="isInputFocused = true"
                  @atBlur="isInputFocused = false"
                />
                <button @click="makeSearch" data-cy="headerSearchSubmit" style="cursor: pointer">
                  <svg class="olymp-magnifying-glass-icon">
                    <use xlink:href="/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon" />
                  </svg>
                </button>
                <div class="autocomplete-positioning">
                  <SearchAutocompleteResults
                    :query="query"
                    :isInputFocused="isInputFocused"
                    attachToInput
                  />
                </div>
              </div>
            </div>

            <span class="material-input"></span>
          </div>
        </form>

        <div class="control-block" v-if="isLogged">
          <HeaderRequestsDropdown />
          <HeaderMessagesDropdown :messages="messages" />
          <HeaderUserProfileDropdown :usrImg="userHeaderImg" :userName="userName" :userId="userId" />
        </div>
        <LoggedOut v-if="isLogged === false" />
      </div>
    </header>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import HeaderMessagesDropdown from "@/components/organisms/HeaderMessagesDropdown";
import HeaderRequestsDropdown from "@/components/organisms/HeaderRequestsDropdown";
import UserHelperVue from "../mixins/UserHelper.vue";
import SInput from "@/components/atoms/SInput";
import HeaderUserProfileDropdown from "@/components/molecules/HeaderUserProfileDropdown";
import LoggedOut from "@/components/molecules/LoggedOut";
import SearchAutocompleteResults from "@/components/molecules/SearchAutocompleteResults.vue";

export default {
  name: "Header",
  components: {
    SearchAutocompleteResults,
    HeaderMessagesDropdown,
    HeaderRequestsDropdown,
    HeaderUserProfileDropdown,
    LoggedOut,
    SInput
  },
  props: ["titleHeader", "usrImg", "userName", "userId", "messages"],
  mixins: [UserHelperVue],
  model: {
    prop: "input",
    event: "change"
  },
  data() {
    return {
      isInputFocused: false,
      query: ""
    };
  },
  computed: {
    userHeaderImg() {
      if (this.usrImg) return this.usrImg;
      return null;
    },
    isLogged() {
      if (this.userId) return true;
      return false;
    }
  },
  methods: {
    ...mapActions(["searchAPI"]),
    async makeSearch() {
      event.preventDefault();
      this.isInputFocused = false;
      if (
        this.$route.name !== "SSearchResult" &&
        this.$route.name !== "SSearchResultFromLandingPage"
      ) {
        this.$router.push("/s-app/search-result");
        await this.searchAPI({ query: this.query });
      } else {
        await this.searchAPI({ query: this.query });
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.profile-img {
  height: 34px;
  width: 34px;
}
.my-home {
  color: white;
  cursor: pointer;
}
.autocomplete-positioning {
  position: absolute;
  z-index: 10010;
  left: 0;
  width: 100%;
}
</style>
