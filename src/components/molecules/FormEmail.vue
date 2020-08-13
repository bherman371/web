<template>
  <div class="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
    <div class="ui-block">
      <div class="ui-block-title">
        <h6 class="title">Change email</h6>
      </div>
      <div class="ui-block-content">
        <!-- Change Email Form -->

        <form>
          <div class="row">
            <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <SInput
                v-model="currentEmail"
                label="Confirm current email"
                type="email"
                required
              />
              <div class="text-center text-danger">{{textCurrent}}</div>
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
              <SInput
                v-model="newEmail"
                label="New email"
                type="email"
                required
              />
              <div class="text-center text-danger">{{textNewEmail}}</div>
            </div>

            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
              <SInput
                v-model="confirmNewEmail"
                label="Confirm new email"
                type="email"
                required
              />
              <div class="text-center text-danger">{{textConfirmEmail}}</div>
            </div>
            <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="text-danger mb-1 text-center">{{text}}</div>
              <SButton
                size="lg"
                text="Change email now"
                color="primary"
                class="full-width"
                @button="sendChange"
              />
            </div>
          </div>
        </form>

        <!-- ... end Change Email Form -->
      </div>
    </div>
    <Modal
      id="form-warning"
      buttonName="OK"
      title="Change Email"
      ref="modal"
      @button="closeModal()"
    >{{response.result || response.error}}</Modal>
  </div>
</template>

<script>
import SInput from "@/components/atoms/SInput";
import SButton from "@/components/atoms/SButton";
import Modal from "@/components/atoms/Modal";
import UserHelperVue from "../../mixins/UserHelper.vue";
export default {
  name: "FormEmail",
  mixins: [UserHelperVue],
  components: {
    SInput,
    SButton,
    Modal
  },
  data() {
    return {
      currentEmail: "",
      newEmail: "",
      confirmNewEmail: "",
      text: "",
      textCurrent: "",
      textNewEmail: "",
      textConfirmEmail: "",
      currentTest: false,
      both: false
    };
  },
  methods: {
    async sendChange() {
      this.checkCurrentEmail();
      this.checkConfirmationEmail();
      if (this.both && this.currentTest) {
        await this.emailUpdate(this.newEmail);
        $("#form-warning").modal("show");
      }
    },
    closeModal() {
      this.$refs.modal.closeModal();
    },
    validateEmail(email) {
      const re = new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
      );
      return re.test(String(email).toLowerCase());
    },
    checkCurrentEmail() {
      if (!this.validateEmail(this.currentEmail)) {
        this.textCurrent = "The current e-mail is not a valid";
        this.currentTest = false;
        return false;
      }
      if (this.currentEmail !== this.loggedUser.email) {
        this.textCurrent = "This is not the current user email";
        this.currentTest = false;
        return false;
      }
      this.textCurrent = "";
      this.currentTest = true;
      return true;
    },
    checkConfirmationEmail() {
      if (!this.validateEmail(this.newEmail)) {
        this.textNewEmail = "'New email' is not a valid email";
        this.both = false;
        return false;
      }else{
        this.textNewEmail = "";
      }
      if (!this.validateEmail(this.confirmNewEmail)) {
        this.textConfirmEmail = "'Confirm new' email not a valid email";
        this.both = false;
        return false;
      }else{
        this.textConfirmEmail = "";
      }
      if (this.newEmail !== this.confirmNewEmail) {
        this.text = "Both, New Email and Confirm New Email, must be equal";
        this.both = false;
        return false;
      }
      this.text = "";
      this.both = true;
      return true;
    }
  }
};
</script>

<style>
</style>