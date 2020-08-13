<template>
  <div
    class="modal fade"
    id="restore-username"
    tabindex="-1"
    role="dialog"
    aria-labelledby="restore-username"
    aria-hidden="true"
  >
    <div class="modal-dialog window-popup restore-password-popup" role="document">
      <div class="modal-content">
        <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close" ref="dismiss">
          <svg class="olymp-close-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon" />
          </svg>
        </a>

        <div class="modal-header">
          <h6 class="title">Restore your Username</h6>
        </div>

        <div class="modal-body text-center">
          <form action="/" v-on:submit.prevent="submit()" v-if="!response">
            <SInput label="Your Email" v-model="credentials.email"></SInput>
            <SButton
              @button="submit"
              color="primary"
              size="lg"
              class="full-width"
              text="Send"
            />
          </form>
          <div v-else>
            <span data-cy class="h5">{{response.error || response.result}}</span>
            <SButton
              @button="closeModal"
              color="primary"
              size="lg"
              class="full-width mt-4"
              text="Close"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SButton from "@/components/atoms/SButton.vue";
import SInput from "@/components/atoms/SInput.vue";
import UserHelperVue from "../../mixins/UserHelper.vue";

export default {
  name: "SRestoreUsername",
  components: {
    SButton,
    SInput
  },
  mixins: [UserHelperVue],
  data() {
    return {
      credentials: {
        email: "",
        success: false
      },
      init: {
        email: false
      }
    };
  },
  methods: {
    onFocus(e) {
      this.init[e.target.name] = true;
    },
    async submit() {
      await this.forgotUsername(this.credentials.email);
    },
    closeModal() {
      this.$refs.dismiss.click();
      this.resetResponse();
      this.credentials.email = "";
    }
  }
};
</script>
