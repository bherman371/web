<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "SignUpForm",
  props: {
    modalShow: Boolean
  },
  data() {
    return {
      credentials: {
        username: "",
        firstName: "",
        lastName: "",
        zip_code: "12345",
        email: "",
        password: ""
      },
      init: {
        username: false,
        password: false,
        email: false
      },
      showPasswordPopup: false,
      unactivated: {
        username: "",
        email: "",
        unactivated: false
      }
    };
  },
  computed: {
    checkUpper() {
      if (this.credentials.password.match(/[A-Z]/g)) {
        return 1;
      } else {
        return 0;
      }
    },
    checkLower() {
      if (this.credentials.password.match(/[a-z]/g)) {
        return 1;
      } else {
        return 0;
      }
    },
    checkNumber() {
      if (this.credentials.password.match(/[0-9]/g)) {
        return 1;
      } else {
        return 0;
      }
    },
    checkSpecial() {
      if (this.credentials.password.match(/\W+/g)) {
        return 1;
      } else {
        return 0;
      }
    },
    check8Chars() {
      if (this.credentials.password.length >= 8) {
        return 1;
      } else {
        return 0;
      }
    },
    checkPasswordBorder() {
      var swampumPassword = 0;
      swampumPassword =
        this.checkUpper +
        this.checkLower +
        this.checkNumber +
        this.checkSpecial;
      if (swampumPassword >= 3 && this.check8Chars === 1) {
        return 1;
      } else {
        return 0;
      }
    }
  },
  watch: {
    modalShow: function(val) {
      if (val === false) {
        // this.resetRegistrationForm()
        // this.$validator.reset(this.errors)
      } else {
        console.log("OI");
        this.$refs.signup_username.focus();
        this.$nextTick(() => this.$refs.signup_username.focus());
      }
    }
  },
  mounted() {
    const self = this;
    this.$validator.extend("passwordCriteria", {
      getMessage() {
        return self.$t("auth.signUpForm.passwordMustContain");
      },
      validate(value) {
        if (value) {
          let checkPassword = 0;
          const registerPassword = value;
          if (registerPassword.match(/[A-Z]/g)) {
            checkPassword++;
          }
          if (registerPassword.match(/[a-z]/g)) {
            checkPassword++;
          }
          if (registerPassword.match(/[0-9]/g)) {
            checkPassword++;
          }
          if (registerPassword.match(/\W+/g)) {
            checkPassword++;
          }
          if (checkPassword >= 3) {
            return true;
          }
          return false;
        }
        return false;
      }
    });

    this.$validator.extend("checkUsernameAvailability", {
      getMessage() {
        return "Username already taken";
      },
      validate(value) {
        return self.$store
          .dispatch("checkUsernameAvailability", value)
          .then(res => {
            if (!res.activated) {
              self.unactivated.email = res.email;
              if (self.unactivated.username === value) {
                self.unactivated.unactivated = true;
              } else {
                self.unactivated.unactivated = false;
              }
              if (
                self.unactivated.username === value ||
                !self.unactivated.username
              ) {
                return true;
              } else {
                // self.$validator.validate('email')
                return false;
              }
            }
            return res.available || !res.activated;
          });
      }
    });

    this.$validator.extend("checkEmailAvailability", {
      getMessage() {
        return "Email already taken";
      },
      validate(value) {
        return self.$store.dispatch("checkEmail", value).then(res => {
          if (!res.activated) {
            self.unactivated.username = res.username;
            if (self.unactivated.email === value) {
              self.unactivated.unactivated = true;
            } else {
              self.unactivated.unactivated = false;
            }
            if (self.unactivated.email === value || !self.unactivated.email) {
              return true;
            } else {
              // self.$validator.validate('signup_username')
              return false;
            }
          }
          return res.available || !res.activated;
        });
      }
    });

    const dict = {
      custom: {
        signup_username: {
          required: "The username field is required.",
          alpha_num:
            "The username field may only contain alpha-numeric characters."
        },
        signup_password: {
          required: "The password field is required.",
          min: (field, num) =>
            "The password field must be at least " + num + " characters."
        }
      }
    };
    this.$validator.localize("en", dict);
  },
  // updated () {
  //   this.$refs.signup_username.focus()
  // },
  methods: {
    emailInput() {
      this.errors.remove("email");
    },
    onResentCheck() {
      const self = this;
      if (self.credentials.username && self.credentials.email) {
        self.$store
          .dispatch("checkUsernameActivated", self.credentials.username)
          .then(res => {
            if (res.activated === 0) {
              self.$store
                .dispatch("checkEmailActivated", self.credentials.email)
                .then(res => {
                  if (res.activated === 0) {
                    self.openConfirmationResendPopup();
                    self.resetSignupForm();
                  }
                });
            }
          });
      }
    },
    onBlurUsername() {
      this.$validator.validate("signup_username");
      // this.onResentCheck()
      if (
        this.credentials.email !== "" &&
        this.credentials.email !== undefined
      ) {
        this.$validator.validate("email");
      }
    },
    onBlurEmail() {
      // this.onResentCheck()
      this.$validator.validate("email");
      if (
        this.credentials.username !== "" &&
        this.credentials.username !== undefined
      ) {
        this.$validator.validate("signup_username");
      }
    },
    onBlurPassword() {
      this.$validator.validate("signup_password");
      this.showPasswordPopup = false;
    },
    resetSignupForm() {
      this.resetRegistrationForm();
      this.cleanErrorMessages();
      this.showPasswordPopup = false;
    },
    resetRegistrationForm() {
      this.credentials = {
        username: "",
        firstName: "",
        lastName: "",
        zip_code: "12345",
        email: "",
        password: "",
        success: false
      };
      this.init = {
        username: false,
        password: false,
        email: false
      };
      this.cleanPasswordStrengthBar();
    },
    cleanPasswordStrengthBar() {
      const bars = document.getElementsByClassName("VuePassword__Meter")[0]
        .children;
      for (let i = 0; i < bars.length; i++) {
        bars[i].setAttribute("class", "");
      }
      if (document.getElementsByClassName("VuePassword__Message")[0]) {
        document
          .getElementsByClassName("VuePassword__Message")[0]
          .setAttribute("class", "sr-only sr-only-focusable");
      }
    },
    cleanErrorMessages() {
      this.$validator.reset(this.errors);
    },
    testSubmit() {
      this.$store.dispatch("checkEmail", this.credentials.email).then(res => {
        console.log(res);
      });
    },
    handleSubmit() {
      if (this.unactivated.unactivated) {
        this.openConfirmationResendPopup();
        this.resetSignupForm();
        return;
      }
      this.$refs.signup_username.blur();
      this.$refs.signup_email.blur();
      this.showPasswordPopup = true;
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.$store.dispatch("signup", this.credentials).then(res => {
            console.log(res);
            if (!res.error) {
              if (this.checkInactivated(res)) {
                this.openConfirmationResendPopup();
                this.resetRegistrationForm();
                this.cleanErrorMessages();
              } else if (res.result === "Username already taken") {
                this.errors.add({
                  field: "signup_username",
                  msg: res.result,
                  rule: "conflict"
                });
              } else if (res.result === "Email already taken") {
                this.errors.add({
                  field: "email",
                  msg: res.result,
                  rule: "conflict"
                });
              } else if (
                res.result ===
                "Your password must contain at least 3 of the following 4 rules"
              ) {
                this.errors.add({
                  field: "password",
                  msg: res.result,
                  rule: "conflict"
                });
              } else {
                this.openSignupFormSuccessPopup();
                this.resetSignupForm();
              }
            }
          });
        }
      });
    },
    checkInactivated(res) {
      return typeof res.activated !== "undefined" && res.activated === 0;
    },
    openConfirmationResendPopup() {
      this.$root.$emit("bv::show::modal", "modal--resent");
    },
    openSignupFormSuccessPopup() {
      this.$root.$emit("bv::show::modal", "modal--registerSuccess");
    },
    focus() {
      this.$refs.signup_username.focus();
      this.showPasswordPopup = false;
      if (
        this.credentials.username === "" &&
        this.credentials.email === "" &&
        this.credentials.password === ""
      ) {
        this.errors.clear();
      }
    }
  }
};
</script>
<style scoped>
@media only screen and (max-width: 575px) {
  #passwordCriteria_popup {
    border: 2px solid red;
    margin-bottom: 10px;
    font-size: 12px;
    padding: 0 30px;
  }
}
@media only screen and (min-width: 575px) {
  #passwordCriteria_popup {
    border: 2px solid red;
    position: fixed;
    z-index: 2000;
    left: 520px;
    bottom: 50px;
    width: 300px;
    font-size: 12px;
    padding: 0 30px;
  }
}
#passwordCriteria_popup li {
  color: red;
}
</style>
