<template>
  <div class="tab-pane active" id="profile" role="tabpanel" data-mh="log-tab">
    <div class="title h6">Login to your account</div>
    <form class="content">
      <div class="row">
        <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <SInput
            label="Your email"
            v-model="credentials.username"
            data-cy="lpLoginUsername"
            class="mb-4"
          />
          <SPasswordInput
            label="Your password"
            v-model="credentials.password"
            data-cy="lpLoginPassword"
          />
          <div
              class="text-danger text-center mt-3"
              v-if="isEmptyForm && triedToLogin"
            >Please, complete the form to login
          </div>
          <div class="remember">
            <a
              href="#"
              class="forgot float-left"
              data-toggle="modal"
              data-target="#restore-username"
            >Forgot my username</a>
            <a
              href="#"
              class="forgot"
              data-toggle="modal"
              data-target="#restore-password"
            >Forgot my password</a>
          </div>
          <SButton
            :text="submitBtnText"
            size="lg"
            color="primary"
            class="full-width"
            @button="loginSubmit"
            data-cy="lpLoginSubmit"
            :disabled="tryingToLogin"
          />
          <div class="or"></div>
          <SButton
            text="<i class='fab fa-facebook-f' aria-hidden='true'></i>Login with Facebook"
            size="lg"
            class="bg-facebook full-width btn-icon-left"
            @button="fbLogin"
          />
          <p class="mt-1">
            Don’t you have an account? <span class="like-link" @click="changeTab()">Register now!</span><br>
            It’s really simple and you can start enjoying all the benefits!
          </p>
        </div>
      </div>
      <Modal
        id="login"
        buttonName="OK"
        @button="closeModal"
        ref="modal"
        title="Unsuccessful login"
      >
        <footer data-cy="lpLoginResponse" v-if="errorResponse" class="h5 font-weight-normal">
          <span v-html="errorResponse" />
        </footer>
      </Modal>
    </form>
  </div>
</template>

<script>
import SButton from "@/components/atoms/SButton.vue";
import SInput from "@/components/atoms/SInput.vue";
import SPasswordInput from "@/components/atoms/SPasswordInput.vue";
import Modal from "@/components/atoms/Modal";
import Auth from "@/modules/Auth";
import { mapActions } from "vuex";
import Global from "@/constants/Global.js";
import * as moment from "moment";

export default {
  name: "SLoginForm",
  components: {
    SButton,
    SInput,
    SPasswordInput,
    Modal
  },
  props: ["redirectTo"],
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      init: true,
      errorResponse: null,
      triedToLogin: false,
      tryingToLogin: false
    };
  },
  computed: {
    currentYear: function() {
      return moment().format("YYYY");
    },
    isEmptyForm() {
      if (
        this.credentials.username === "" ||
        this.credentials.password === ""
      ) {
        return true;
      }
      return false;
    },
    submitBtnText() {
      if (this.tryingToLogin) {
        return `Login<div class="spinner-border spinner-border-sm text-primary ml-3" role="status" >
                  <span class="sr-only">Loading...</span>
                </div>`;
      }
      return "Login";
    }
  },
  methods: {
    ...mapActions(["startSession", "getAllGroups"]),
    fbLogin() {
      event.preventDefault();
      location.replace(`${Global.getServerDomain()}/facebookLogin`);
    },
    clearErrors() {
      if (this.errors.has("login_form")) {
        this.errors.clear();
      }
    },
    forgetAnimationStart(e) {
      const parent = e.currentTarget.parentNode;
      parent.classList.add("show-forget");
    },
    forgetAnimationStop(e) {
      const parent = e.currentTarget.parentNode;
      parent.classList.remove("show-forget");
    },
    initFields() {
      this.init = true;
    },
    loginSubmit() {
      this.tryingToLogin = true;
      this.triedToLogin = true;
      this.errorResponse = null;

      this.fetchLoginAPI()
        .then(result => {
          this.checkFetchTokenValid(result);
        })
        .catch(error => {
          console.log(error);
          this.tryingToLogin = false;
        });
    },
    fetchLoginAPI() {
      event.preventDefault();
      return new Promise(async (resolve, reject) => {
        fetch(Global.getServerDomain() + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.credentials.username,
            password: this.credentials.password
          })
        })
          .then(function(res) {
            resolve(res.json());
          })
          .catch(error => {
            reject(error);
            console.error("Error: ", error);
          });
      });
    },
    checkFetchTokenValid(status) {
      const result = status;
      if (!result.error) {
        this.saveUserInfoToLocalStorage(result);
        this.saveUserInfoToState();

        if (this.redirectTo) {
          this.$router.push({
            path: this.redirectTo
          });
        } else {
          this.$router.push({
            name: "NewsFeed",
            params: { id: result.sUserId },
            query: { feature: status.loginType }
          });
        }
      } else {
        if (result.error === "Incorrect username or password") {
          this.errorResponse = `${result.error}.`;
        } else if (result.error === "Please enter a valid username and password.") {
          this.errorResponse = result.error;
        } else if (result.error === "User has not been confirmed.") {
          this.errorResponse = `${result.error}<br><br>Before signing in, validate your account using the validation email sent to you.`;
        } else {
          console.log(result.error);
          this.errorResponse = "Something went wrong. Please wait a moment and try again."
        }
        $("#login").modal("show");
        this.tryingToLogin = false;
      }
      // } else if (result.error === "User have not been confirmed.") {
      //   this.triggerResentActivationPopup();
      // } else {
      //   this.errorPopupOfEmptyLoginEntry(
      //     this.$t("auth.loginForm.validUsernamePassword")
      //   );
      // }
    },
    saveUserInfoToLocalStorage(status) {
      Auth.authenticateUser(status.token, status.createdAt, status.sUserId);
      localStorage.setItem("user_id", status.sUserId);
    },
    saveUserInfoToState() {
      this.startSession();
      this.getAllGroups();
    },
    triggerResentActivationPopup(errorMsg) {
      this.errors.add({ field: "login_form", msg: errorMsg });
      this.$root.$emit("bv::show::modal", "modal--resent");
      localStorage.setItem("cred-word", this.credentials.password);
      localStorage.setItem("cred-name", this.credentials.username);
      this.credentials.password = "";
      this.credentials.username = "";
      return;
    },
    errorPopupOfEmptyLoginEntry(msg) {
      this.errors.clear();
      this.errors.add({ field: "login_form", msg, rules: "no_cred" });
      setTimeout(() => {
        this.errors.clear();
      }, 5000);
      return;
    },
    closeModal() {
      this.$refs.modal.closeModal();
    },
    changeTab() {
      this.$parent.$refs.register.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.like-link {
  transition: all .15s ease;
  color: #ff5e3a;
  background-color: transparent;
  text-decoration: none;
  cursor: pointer;
}

.like-link:hover {
  color: #63bab9
}
</style>