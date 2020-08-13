<template>
  <div class="container">
    <div class="row">
      <div class="col col-lg-12 col-md-12 col-sm-12 col-12">
        <h2 class="presentation-margin">Form Elements</h2>

        <div class="ui-block">
          <div class="ui-block-content">
            <div class="row">
              <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="form-group label-floating is-empty text-center">
                  <div v-if="isFacebook">
                    <SInput
                      id="username"
                      v-model="credentials.username"
                      type="text"
                      :success="checkUsrName === false"
                      :error="checkUsrName"
                      @atBlur="checkUsernameAvailability"
                      @keydown="filterUsername"
                      label="Username"
                    />
                    <p v-if="checkUsrName" class="mb-2 text-danger">{{checkUsrName}}</p>
                    <VuePasswordAuto
                      name="password"
                      v-model="credentials.password"
                      classes="input"
                      placeholder="Your Password"
                    />
                    <SPasswordInput
                      label="Confirm Your Password"
                      v-model="passwordConfirm"
                      class="mt-3"
                      data-cy="lpRegistrationConfirmPassword"
                      :error="passwordConfirm !== credentials.password"
                      :success="passwordConfirm === credentials.password"
                    />
                    <SInput
                      type="text"
                      id="email"
                      name="email"
                      class="input input-text text-centered"
                      @atBlur="checkEmailAvailability"
                      v-model="credentials.email"
                      label="Email"
                      :success="checkEmail === false"
                      :error="checkEmail"
                    />
                  </div>
                  <SInput
                    id="zip"
                    name="zip_code"
                    v-model="credentials.zip_code"
                    type="text"
                    class="text-centered"
                    @keyup.enter="(isFacebook) ? next('email') : next('name')"
                    label="Zipcode"
                    size="5"
                  />
                  <p v-if="checkEmail" class="mb-2 text-danger">{{checkEmail}}</p>
                  <SInput
                    id="activation_firstName"
                    name="firstName"
                    v-model="credentials.firstName"
                    type="text"
                    class="input input-text text-centered"
                    @keyup.enter="submit()"
                    label="First Name"
                  />
                  <SInput
                    id="activation_lastName"
                    name="lastName"
                    v-model="credentials.lastName"
                    type="text"
                    class="input input-text text-centered"
                    @keyup.enter="submit()"
                    label="Last Name"
                  />
                  <SButton
                    text="Submit"
                    size="lg"
                    color="breez"
                    class="full-width"
                    @button="submit()"
                    data-target="#myModal"
                    data-toggle="modal"
                  />
                </div>
                <Modal
                  id="myModal"
                  buttonName="OK"
                  title="Activation"
                  ref="modal"
                  @button="closeModal"
                >
                  {{responseMsg}}
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Global from "@/constants/Global.js";
import { VuePasswordAuto } from "vue-password";
import SInput from "@/components/atoms/SInput";
import SPasswordInput from "@/components/atoms/SPasswordInput";
import SButton from "@/components/atoms/SButton";
import UserHelperVue from "../../mixins/UserHelper.vue";
import Modal from "@/components/atoms/Modal";

export default {
  components: {
    VuePasswordAuto,
    SInput,
    SPasswordInput,
    SButton,
    Modal
  },
  mixins: [UserHelperVue],
  data() {
    return {
      credentials: {
        username: "",
        firstName: "",
        lastName: "",
        zip_code: "",
        email: "",
        password: ""
      },
      slickOptions: {
        arrows: false,
        dots: false
      },
      isFacebook: this.$route.query.facebook,
      zip_init: false,
      username_init: false,
      activate_success: false,
      activate_authenticated: false,
      errors: null,
      passwordConfirm: null,
      checkUsrName: null,
      checkEmail: null,
      responseMsg: null
    };
  },
  mounted() {
    if (this.$route.query.facebook) {
      fetch(Global.getServerDomain() + `/profile/${this.$route.query.id}`, {
        method: "GET",
        headers: this.getHeaders()
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.credentials = response;
        });
    } else {
      this.changeFocus("zip");
    }
  },
  created() {
    this.fetchUserProfile(this.$route.query.id);
  },
  methods: {
    filterUsername(event) {
      console.log(event);
      const re = /[^a-zA-Z\d\s:]/g;
      if (re.test(event.key)) {
        event.preventDefault();
      }
    },
    closeModal() {
      this.$refs.modal.closeModal();
    },
    next(id) {
      if (!this.errors.any() && id !== "") {
        this.$refs.slick.next();
        this.changeFocus(id);
      }
    },
    prev(id) {
      this.$refs.slick.prev();
      this.changeFocus(id);
    },
    backToStart() {
      this.$refs.slick.slickGoTo(0);
    },
    changeFocus(id) {
      const el = document.getElementById(id);
      el.select();
    },
    async submit() {
      if (this.$route.query.facebook) {
        this.submitFacebook();
      } else {
        await this.submitCommon();
        $("#myModal").modal('show');
      }
    },
    checkUsernameAvailability() {
      if (this.credentials.username) {
        console.log("username validation");
        fetch(Global.getServerDomain() + `/usernameAvailability`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.credentials.username
          })
        })
          .then(res => res.json())
          .then(response => {
            if (response.available) {
              this.checkUsrName = false;
              this.next("zip");
            } else {
              if (this.user.id == this.$route.query.id) {
                console.log("here");
                this.checkUsrName = false;
              } else {
                this.checkUsrName = response.result;
              }
            }
          });
      } else {
        this.checkUsrName = "Please provide a valid username";
      }
    },
    checkEmailAvailability() {
      if (this.credentials.email) {
        console.log("email validation");
        fetch(Global.getServerDomain() + `/emailAvailability`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.credentials.email
          })
        })
          .then(res => res.json())
          .then(response => {
            if (response.available) {
              this.checkEmail = false;
              this.next("firstName");
            } else {
              this.checkEmail = response.result;
            }
          });
      } else {
        this.$notify({
          group: "foo",
          text: "pleaseProvideAnEmail"
        });
      }
    },
    submitFacebook() {
      console.log(this.credentials);
      fetch(
        Global.getServerDomain() +
          "/facebookActivation/" +
          this.$route.query.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.credentials.username,
            firstName: this.credentials.firstName,
            lastName: this.credentials.lastName,
            zip_code: this.credentials.zip_code,
            email: this.credentials.email,
            password: this.credentials.password
          })
        }
      )
        .then(res => res.json())
        .then(response => {
          console.log(response);
          if (!response.error) {
            console.log("what");
            this.activate_success = true;
            this.next();
          } else if (response.error === "User already authenticated.") {
            console.log("hey");
            this.activate_authenticated = true;
            this.next();
          }
        });
    },
    async submitCommon() {
      const result = await fetch(Global.getServerDomain() + "/activation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.user.username,
          firstName: this.credentials.firstName,
          lastName: this.credentials.lastName,
          zip_code: this.credentials.zip_code,
          email: this.user.email,
          id: this.$route.query.id
        })
      })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          if (!response.error) {
            this.responseMsg = response.result;
            this.activate_success = true;
            this.next();
          } else if (response.error === "User already authenticated.") {
            this.activate_authenticated = true;
            this.responseMsg = response.error;
            this.next();
          } else if (response.error) {
            this.responseMsg = response.error;
            this.next();
          }
        });
      return result;
    },
    getHeaders() {
      return {
        "Content-Type": "application/json",
        auth_key: window.localStorage.getItem("token")
      };
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
</style>
