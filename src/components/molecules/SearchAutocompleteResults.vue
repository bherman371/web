<template>
  <div>
    <ul
      v-if="showAutocomplete && isSearchResultPopulated"
      :class="['search-autocomplete', {'attach-to-upper-input': attachToInput !== undefined}]"
    >
      <li
        v-for="(result, index) in filteredSearchResult"
        :key="`${result.id}-${index}`"
        @click="run($event, result)"
      >
        <img :src="result.picture" />
        <span>{{getPreviewText(result)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserHelperVue from "../../mixins/UserHelper.vue";
const SEARCH_DELAY = 200;
const LIMIT_ITEMS = 6;

export default {
  name: "SearchAutocompleteResults.vue",
  mixins: [ UserHelperVue ],
  props: ["query", "isInputFocused", "attachToInput", "returnsTheItem", "filterType", "excludeUsersId"],
  data() {
    return {
      inputTimeout: null,
      showAutocomplete: false,
      searchTerm: null,
    };
  },
  methods: {
    ...mapActions({
      searchAPI: "searchAutocompleteAPI",
      runFullSearch: "searchAPI",
    }),
    run(event, result) {
      if (this.returnsTheItem) {
        this.$emit('user', result)
      } else {
        this.sendSearchAutocomplete(event, result);
      }
    },
    getPreviewText(item) {
      if (item.class === 'group') return item.title;
      if (item.class === 'user') return item.username;
      if (item.class === 'item') return item.title;
    },
    async sendSearchAutocomplete(event, item) {
      event.preventDefault();

      this.$emit('fetching', true);
      if (this.isUserAuthenticated) {
        if (item.class === 'group')
          this.$router.push(`/s-app/group-page/${item.id}`);
        if (item.class === 'user')
          this.$router.push(`/s-app/profile-page/${item.id}`);
        if (item.class === 'item')
          this.$router.push(`/s-app/item-details/${item.id}`);
      } else {
        let query;
        if (item.class === 'group') query = item.title;
        if (item.class === 'user') query = item.username;
        if (item.class === 'item') query = item.title;

        this.$router.push(`/search-result-landing/${query}`);
        if (this.$route.name === "SSearchResultFromLandingPage") {
          await this.runFullSearch({ query: query });
        }
      }
      this.$emit('fetching', false);
    },
    searchPreview(searchTerm) {
      this.$emit('fetching', true);
      this.searchTerm = searchTerm;
      if (this.inputTimeout) clearTimeout(this.inputTimeout);

      if (!searchTerm) {
        this.closeSearchPreview();
        this.$emit('fetching', false);
        return;
      }

      this.inputTimeout = setTimeout(async () => {
        this.showAutocomplete = true;
        await this.searchAPI({ query: searchTerm })
        this.$emit('fetching', false);
      }, SEARCH_DELAY);
    },
    showSearchPreview() {
      if (this.searchTerm && this.searchResult && this.searchResult.length > 0) {
        this.showAutocomplete = true;
      }
    },
    closeSearchPreview() {
      if (this.inputTimeout) clearTimeout(this.inputTimeout);

      this.inputTimeout = setTimeout(() => {
        this.showAutocomplete = false;
      }, 150);
    }
  },
  computed: {
    ...mapGetters({
      searchResult: "getSearchAutocompleteResult",
      isUserAuthenticated: "isUserAuthenticated",
    }),
    filteredSearchResult() {
      if (!this.searchResult) return [];
      let filteredResults = this.searchResult;
      if (this.filterType) {
        filteredResults = filteredResults.filter(item => item.class === this.filterType);
      }
      if (this.isUserAuthenticated) {
        filteredResults = filteredResults.filter(item => {
          if (
            item.class === "item" ||
            item.class === "group" ||
            (item.class === "user" && item.id !== this.loggedUser.id)
          ) {
            return item;
          }
        });
      }
      if (this.excludeUsersId) {
        filteredResults = filteredResults.filter(item => {
          if (
            item.class === "item" ||
            item.class === "group" ||
            (item.class === "user" && !this.excludeUsersId.includes(item.id))
          ) {
            return item;
          }
        });
      }
      return filteredResults.slice(0, LIMIT_ITEMS);
    },
    isSearchResultPopulated() {
      if (!this.searchResult || this.searchResult.length === 0) return false;
      return true;
    },
  },
  watch: {
    query(newTerm) {
      this.searchPreview(newTerm);
    },
    isInputFocused(newValue) {
      if (newValue) this.showSearchPreview();
      else this.closeSearchPreview()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-autocomplete {
  z-index: 10010;
  width: 100%;
  background-color: #e6ecf5;
  margin-top: 0.8em;
  border-radius: 1em;
  box-shadow: 0px 0 15px 0 rgba(18, 25, 33, 0.3);
  color: #333333;
  padding: 0.1em 0;

  li {
    display: block;
    border-radius: 1em;
    margin: 0.4em;
    padding: 0.2em;
    transition: background-color ease 250ms, color ease 250ms;

    &:hover {
      cursor: pointer;
      background-color: #63bab9;
      color: #ffffff;
    }

    img {
      width: 4em;
      height: 4em;
      vertical-align: middle;
      border-radius: 1em;
      padding: 0.3em;
    }

    span {
      font-size: 1.3em;
      margin-left: 0.8em;
    }
  }
}

.attach-to-upper-input {
  margin-top: 0em !important;
  border-radius: 0 0 1em 1em !important;
}
</style>