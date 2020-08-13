<template>
  <div class="tab-pane" id="home" role="tabpanel" data-mh="log-tab">
    <div class="title h6">Register for a free Swampum membership</div>
    <form class="content" @submit.prevent data-cy="lpFormRegistrationForm">
      <div class="row">
        <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <SInput
            label="User name"
            v-model="credentials.username"
            :required="true"
            data-cy="lpRegistrationUsername"
          />
          <SInput
            label="Your email"
            v-model="credentials.email"
            :required="true"
            data-cy="lpRegistrationEmail"
            class="mb-4"
          />
          <div v-if="emailTst !== true" id="error-container" class="mb-2" style="margin-top: -10px">
            <p class="text-danger text-center text-wrap">{{emailTst}}</p>
          </div>
          <div
            data-toggle="tooltip"
            data-placement="right"
            data-html="true"
            title="<div class='text-left'><b>Password must have</b><br>
              - at least 1 number<br>
              - at least 1 lowercase letter<br>
              - at least 1 uppercase letter<br>
              - at least 8 characters
              </div>"
          >
            <VuePasswordAuto
              v-model="credentials.password"
              class="form-control"
              type="password"
              @input="updateStrength(credentials.password)"
              placeholder="Your password"
            />
          </div>
          <div v-if="spelling !== true" id="error-container">
            <p class="text-danger text-center text-wrap">{{ spelling }}</p>
          </div>
          <SPasswordInput
            label="Confirm your password"
            v-model="passwordConfirm"
            class="mt-3"
            data-cy="lpRegistrationConfirmPassword"
          />
          <div v-if="pwdTst !== true" id="error-container">
            <p class="text-danger text-center text-wrap">{{pwdTst}}</p>
          </div>
          <div class="remember">
            <SCheckbox
              label="I accept the Swampum community’s <a href='#'>Terms and Conditions</a>"
              v-model="checkTerms"
              data-cy="lpRegistrationAcceptTerms"
            />
            <div
              class="text-danger mt-3"
              v-if="credentials.username && spelling && pwdTst && emailTst && checkTerms === false"
            >You must accept Terms and Conditions to proceed</div>
          </div>
          <SButton
            text="Complete registration!"
            size="lg"
            color="purple"
            class="full-width"
            :title="title"
            @button="register"
            data-cy="lpRegistrationSubmit"
          />
        </div>
      </div>
      <Modal
        id="register"
        buttonName="OK"
        v-if="confirmRegistration || response"
        ref="modal"
        title="Swampum Registration"
        @button="closeModal"
        @hidden="showLoginForm"
      >
        <footer data-cy="lpRegistrationResponse" v-if="theResponse" class="h5 font-weight-normal">
          <span v-html="theResponse" />
        </footer>
        <div class="spinner-border text-primary" role="status" v-else>
          <span class="sr-only">Loading...</span>
        </div>
      </Modal>
    </form>
  </div>
</template>
<script>
import SInput from "@/components/atoms/SInput.vue";
import SCheckbox from "@/components/atoms/SCheckbox.vue";
import SButton from "@/components/atoms/SButton.vue";
import SPasswordInput from "@/components/atoms/SPasswordInput.vue";
import { mapActions, mapGetters } from "vuex";
import Modal from "@/components/atoms/Modal";
import { VuePasswordAuto } from "vue-password";
import zxcvbn from "zxcvbn";

export default {
  name: "SRegistrationForm",
  components: {
    SInput,
    SCheckbox,
    SButton,
    SPasswordInput,
    Modal,
    VuePasswordAuto
  },
  props: ["redirectTo"],
  data() {
    return {
      credentials: {
        username: "",
        email: "",
        password: ""
      },
      passwordConfirm: "",
      spelling: null,
      pwdTst: null,
      emailTst: null,
      checkTerms: false,
      title: ""
    };
  },
  computed: {
    ...mapGetters({
      confirmRegistration: "getSuccessNotification",
      response: "getRegistrationErrorResponse"
    }),
    theResponse() {
      if (this.response.error) {
        return this.response.error;
      } else if (this.response && this.response.result === "Registration successful") {
        return `${this.response.result}.<br><br>Before signing in, validate your account using the validation email sent to you.`//;You will receive an email to validate your account. Please, check your inbox.`
      }
      return this.response.result;
    }
  },
  methods: {
    ...mapActions(["signup"]),
    async register() {
      event.preventDefault();
      this.checkEmail();
      this.checkSpelling();
      this.checkPassword();

      if (
        this.credentials.username &&
        this.spelling === true &&
        this.pwdTst === true &&
        this.emailTst === true &&
        this.checkTerms === true
      ) {
        this.signup(this.credentials);
        $("#register").modal("show");
      }
    },
    updateStrength(password) {
      this.strength = zxcvbn(password).score;
      const trTest = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
      return Boolean(trTest.test(password));
    },
    checkSpelling() {
      if (!RegExp("(?=.*[A-Z])").test(this.credentials.password)) {
        this.spelling = "Password must have at least 1 uppercase letter";
      } else if (!RegExp("(?=.*[0-9])").test(this.credentials.password)) {
        this.spelling = "Password must have at least 1 number";
      } else if (!RegExp("(?=.{8,})").test(this.credentials.password)) {
        this.spelling = "Password must have at least 8 charcters";
      } else if (!RegExp("(?=.*[a-z])").test(this.credentials.password)) {
        this.spelling = "Password must have at least 1 lowercase letter";
      } else {
        this.spelling = true;
      }
    },
    checkPassword() {
      if (this.credentials.password !== this.passwordConfirm) {
        this.pwdTst = "Both password fields must be the same";
      } else {
        this.pwdTst = true;
      }
    },
    checkEmail() {
      if (
        !RegExp(
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
        ).test(this.credentials.email)
      ) {
        this.emailTst = "This field must be a valid email";
      } else {
        this.emailTst = true;
      }
    },
    closeModal() {
      this.$refs.modal.closeModal();
    },
    showLoginForm() {
      if (this.response && this.response.result === "Registration successful") {
        this.$parent.$refs.login.click();
      }
    }
  },
  mounted() {
    $("[data-toggle='tooltip']").tooltip();
  }
};
</script>
