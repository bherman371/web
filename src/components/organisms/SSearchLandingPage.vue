<template>
  <div>
    <div class="lp-search-input input-group pr-lg-5" :key="`${key}`">
      <input
        v-model="query" type="text" class="form-control h-100"
        placeholder="What are you looking for?"
        @keyup.enter="sendSearch"
        data-cy="new_lpSearch"
        @focus="isInputFocused = true"
        @blur="isInputFocused = false"
      >
      <div class="input-group-append">
        <button
          class="btn btn-light pl-3 pr-4"
          type="button"
          @click="sendSearch"
          data-cy="new_lpSearchSubmit"
        >
          <svg class="olymp-magnifying-glass-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon" />
          </svg>
        </button>
      </div>
    </div>
    <div class="autocomplete-positioning">
      <SearchAutocompleteResults
        :query="query"
        :isInputFocused="isInputFocused"
      />
    </div>
  </div>
</template>

<script>
import SearchAutocompleteResults from "@/components/molecules/SearchAutocompleteResults.vue";

export default {
  name: "SSearchLandingPage",
  components: {
    SearchAutocompleteResults,
  },
  data() {
    return {
      key: 1,
      isInputFocused: false,
      query: ""
    };
  },
  methods: {
    sendSearch(event) {
      event.preventDefault();

      // TODO: Change to the line bellow after the E2E test is updated
      // const query = this.query.trim();
      const query = this.query;
      if(!query) return;

      this.$router.push(`/search-result-landing/${query}`);
      this.$refs.close.click();
    },
    rerender() {
      this.key++;
    },
  },
  mounted() {
    // I think jQuery is breaking the component layout when loaded,
    // but I don't want to fix it the proper way right now
    $(() => {
      this.rerender();
    });
  },
  beforeRouteUpdate() {
    if (this.inputTimeout) clearTimeout(this.inputTimeout);
  }
};
</script>

<style lang="scss" scoped>
.lp-search-input {
  input {
    color: #515365;
    border-width: 3px;
    border-radius: 100px 0 0 100px;
    border-color: #e6ecf5;
    background-color: rgba(255, 255, 255, 0.4);
    height: 100%;
    font-size: 1.6em;
    z-index: 1;

    &::placeholder {
      color: rgba($color: #515365, $alpha: 0.6);
      font-weight: bold;
    }

    &:hover, &:focus {
      box-shadow: 16px 0 15px 0 rgba(18, 25, 33, 0.3);
      z-index: 1;
    }
  }

  button {
    color: #515365;
    background-color: #e6ecf5;
    border-radius: 0 100px 100px 0;
    height: 100%;

    &:hover {
      box-shadow: 6px 0 6px 0 rgba(18, 25, 33, 0.1);
    }
  }

  button > svg {
    color: #515365;
    width: 1.6em;
    height: 1.6em;

    margin-top: auto;
    margin-bottom: auto;

    fill: #515365;
  }
}

.input-group-append {
  z-index: 2;
}

.autocomplete-positioning {
  position: absolute;
  z-index: 10010;
  left: 0;
  width: 80%;
  margin-left: 2em;
}
</style>
