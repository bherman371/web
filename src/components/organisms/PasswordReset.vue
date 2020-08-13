<template>
  <div class="content">
    <div class="box col-md-6 offset-md-3">
      <div class="box-header">
        <h3 class="box-title">Reset Password</h3>
      </div>
      <form name="profile_form" @submit.prevent="sendChange" class="is-clearfix">
        <div class="field is-horizontal">
          <div class="field" style="width:100%">
            <div class="field-label is-normal">
              <label class="label">New Password</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
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
                      classes="input"
                      name="password"
                      v-model="new_password"
                      @input="updateScore"
                    />
                  </div>
                  {{password_strength}}
                  <p class="control margin">
                    <SInput v-model="confirmPassword" placeholder="Confirm your password" type="password"/>
                    <SButton
                      size="lg"
                      text="Send"
                      color="blue"
                      class="full-width"
                      @button="sendChange"
                    />
                    <span v-if="text">{{text}}</span>
                    <span v-if="notify_password_change">Password Updated</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { VuePasswordAuto } from "vue-password";
import zxcvbn from "zxcvbn";
import Auth from "@/modules/Auth";
import Global from "@/constants/Global";
import SInput from "@/components/atoms/SInput";
import SButton from "@/components/atoms/SButton";

export default {
  name: "PasswordReset",
  data() {
    return {
      new_password: "",
      score: 0,
      notify_password_change: false,
      token: "",
      text: "",
      confirmPassword: "",
      strengthMsgs: [
        "Very Weak Password",
        "Weak Password",
        "Medium Password",
        "Strong Password",
        "Very Strong Password"
      ]
    };
  },
  components: { VuePasswordAuto, SInput, SButton },
  computed: {
    password_strength() {
      return this.strengthMsgs[zxcvbn(this.new_password).score];
    }
  },
  beforeCreate() {
    Auth.deauthenticateUser();
    localStorage.removeItem("user_id");
  },
  mounted() {
    this.endSession();
    this.token = this.$route.query.token;
    $("[data-toggle='tooltip']").tooltip();
  },
  methods: {
    ...mapActions(["changePassword", "endSession"]),
    updateScore(password) {
      this.score = zxcvbn(password).score;
    },
    sendChange() {
      if (this.score < 1) {
        this.text = "Your password is weak";
      }else if(this.confirmPassword !== this.new_password){
        this.text = "Both fields must have the same password"
      }else {
        let update = {
          password: this.new_password
        };
        fetch(Global.getServerDomain() + "/changePassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth_key: this.token
          },
          body: JSON.stringify(update)
        })
          .then(response => response.json())
          .then(response => {
            console.log(response);
            if (response.error) {
              this.text = response.error;
            } else {
              this.text = response.result;
            }
            this.$router.push("/");
          });
      }
    }
  }
};
</script>
<style>
.slick-dots {
  margin: 0 !important;
}

.success-icon {
  color: #62bbb9;
  font-size: 5rem;
}

.fail-icon {
  color: red;
  font-size: 5rem;
}

.box-title {
  font-size: 5em;
}
</style>
