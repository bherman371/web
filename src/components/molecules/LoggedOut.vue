<template>
  <div class="form--login-logout">
    <form class="form-inline">
      <div class="form-group">
        <SInput size="sm" placeholder="Username" v-model="credentials.username" required />
      </div>
      <div class="form-group with-button is-empty">
        <SInput
          type="password"
          size="sm"
          placeholder="Password"
          required
          v-model="credentials.password"
        />

      </div>
      <SButton class="btn btn-primary btn-md-2 mr-2" text="Login" @button="loginSubmit" />
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Auth from "@/modules/Auth.js";
import SInput from "@/components/atoms/SInput";
import Global from "@/constants/Global.js";
import SButton from "@/components/atoms/SButton.vue";
export default {
  name: "LoggedOut",
  components: {
    SInput,
    SButton
  },
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["endSession", "startSession", "getAllGroups"]),
    logout() {
      this.endSession();
      Auth.deauthenticateUser();
      localStorage.removeItem("user_id");
      this.$router.push("/");
    },
    loginSubmit() {
      if (this.checkLoginEntryEmpty()) {
        this.fetchLoginAPI()
          .then(result => {
            this.checkFetchTokenValid(result);
          })
          .catch(error => console.log(error));
      }
    },
    checkLoginEntryEmpty() {
      if (
        this.credentials.username !== "" &&
        this.credentials.password !== ""
      ) {
        return true;
      } else {
        return false;
      }
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
    async checkFetchTokenValid(status) {
      const result = status;
      if (!result.error) {
        this.saveUserInfoToLocalStorage(result);
        await this.saveUserInfoToState();
        this.$router.push({
          name: "NewsFeed",
          params: { id: result.sUserId },
          query: { feature: status.loginType }
        });
      } else if (result.error === "User have not been confirmed.") {
        this.triggerResentActivationPopup();
      }
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
    async saveUserInfoToState() {
      await this.startSession();
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
    }
  }
};
</script>

<style>
</style>