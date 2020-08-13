<template>
  <div
    class="modal fade"
    id="main-popup-search"
    tabindex="-1"
    role="dialog"
    aria-labelledby="main-popup-search"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered window-popup main-popup-search" role="document">
      <div class="modal-content">
        <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close" ref="close">
          <svg class="olymp-close-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon" />
          </svg>
        </a>
        <div class="modal-body">
          <form class="form-inline search-form">
            <SInput label="What are you looking for?" v-model="query" dataCy="lpSearch"/>
            <SButton color="purple" size="lg" text="Search" @button="sendSearch" dataCy="lpSearchSubmit" class="mt-2"/>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SInput from "@/components/atoms/SInput.vue";
import SButton from "@/components/atoms/SButton.vue";

export default {
  name: "SSearchModal",
  components: {
    SInput,
    SButton
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    sendSearch() {
      event.preventDefault();
      this.$router.push(`/search-result-landing/${this.query}`);
      this.$refs.close.click();
    } 
  }
};
</script>
