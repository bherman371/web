<template>
  <div class="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
    <div class="ui-block">
      <div class="ui-block-title">
        <h6 class="title">Change password</h6>
      </div>
      <div class="ui-block-content">
        <!-- Change Password Form -->

        <form>
          <div class="row">
            <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <SInput
                v-model="currentPassword"
                type="password"
                label="Confirm current password"
                :eyeToggle="true"
              />
            </div>

            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div
                class="form-group label-floating"
                :class="{'is-empty':isEmpty}"
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
                <label class="control-label">New password</label>
                <VuePasswordAuto
                  classes="input"
                  name="password"
                  v-model="new_password"
                  @input="updateScore"
                />
              {{password_strength}}
              </div>
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
              <SInput
                v-model="confirmPassword"
                label="Confirm new password"
                type="password"
                :eyeToggle="true"
              />
            </div>
            <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-1">
              <div class="text-danger mb-1 text-center">{{text}}</div>
              <SButton
                size="lg"
                text="Change password now"
                color="primary"
                class="full-width"
                @button="sendChange"
              />
            </div>
          </div>
        </form>

        <!-- ... end Change Password Form -->
      </div>
    </div>
    <Modal
      id="form-warning"
      buttonName="OK"
      title="Change Password"
      ref="modal"
      @button="closeModal()"
      class="font-weight-bold"
    >{{text}}</Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { VuePasswordAuto } from "vue-password";
import zxcvbn from "zxcvbn";
import Global from "@/constants/Global";
import SInput from "@/components/atoms/SInput";
import SButton from "@/components/atoms/SButton";
import Modal from "@/components/atoms/Modal";
export default {
  name: "FormPassword",
  data() {
    return {
      new_password: "",
      score: 0,
      notify_password_change: false,
      token: localStorage.getItem("token"),
      text: "",
      confirmPassword: "",
      currentPassword: "",
      strengthMsgs: [
        "Very Weak Password",
        "Weak Password",
        "Medium Password",
        "Strong Password",
        "Very Strong Password"
      ]
    };
  },
  components: { VuePasswordAuto, SInput, SButton, Modal },
  computed: {
    password_strength() {
      return this.strengthMsgs[zxcvbn(this.new_password).score];
    },
    isEmpty() {
      if (this.new_password.length > 0) {
        return false;
      }
      return true;
    }
  },
  mounted() {
    $("[data-toggle='tooltip']").tooltip();
  },
  methods: {
    ...mapActions(["endSession"]),
    updateScore(password) {
      this.score = zxcvbn(password).score;
    },
    closeModal() {
      this.$refs.modal.closeModal();
    },
    checkPsswrdSpelling(password) {
      if (!RegExp("(?=.*[A-Z])").test(password)) {
        this.text = "Password must have at least 1 uppercase letter";
        return false;
      } else if (!RegExp("(?=.*[0-9])").test(password)) {
        this.text = "Password must have at least 1 number";
        return false;
      } else if (!RegExp("(?=.{8,})").test(password)) {
        this.text = "Password must have at least 8 charcters";
        return false;
      } else if (!RegExp("(?=.*[a-z])").test(password)) {
        this.text = "Password must have at least 1 lowercase letter";
        return false;
      } else {
        return true;
      }
    },
    sendChange() {
      if (this.score < 1) {
        this.text = "Your password is weak";
      } else if (this.confirmPassword !== this.new_password) {
        this.text = "Both fields must have the same password";
      } else if (!this.checkPsswrdSpelling(this.new_password)) {
        return;
      } else {
        let update = {
          password: this.new_password,
          currentPassword: this.currentPassword
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
            $("#form-warning").modal("show");
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