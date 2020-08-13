<template>
  <div class="page-has-left-panels page-has-right-panels">

    <section class="medium-padding120 bg-body contact-form-animation scrollme allow-overflow">
      <div class="container">
        <div class="row">
          <div class="col col-xl-10 col-lg-10 col-md-12 col-sm-12 m-auto allow-overflow">
            <!-- Contacts Form -->
            <router-link to="/" class="back-btn">&lt; Go back</router-link>

            <div class="contact-form-wrap allow-overflow">
              <div class="contact-form-thumb">
                <h2 class="title">
                  CONTACT US
                </h2>
                <p>If you have questions about Swampum, please contact us using this form.</p>
                <img src="/img/crew.png" alt="crew" class="crew" />
              </div>
              <form class="contact-form">
                <div class="row">
                  <div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group label-floating">
                      <label class="control-label">First name</label>
                      <input class="form-control" placeholder type="text" v-model="firstName" />
                    </div>
                  </div>
                  <div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group label-floating">
                      <label class="control-label">Last name</label>
                      <input class="form-control" placeholder type="text" v-model="lastName" />
                    </div>
                  </div>
                  <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div class="form-group label-floating">
                      <label class="control-label">Your email <span class="required-field">*</span></label>
                      <input
                        class="form-control"
                        placeholder
                        type="email"
                        v-model="email"
                      />
                    </div>

                    <div class="form-group label-floating is-select">
                      <label class="control-label">Subject <span class="required-field">*</span></label>
                      <select class="selectpicker form-control" v-model="subject">
                        <option :value="null" disabled>-- Select a subject --</option>
                        <option value="Account">Account</option>
                        <option value="Items">Items</option>
                        <option value="Trade">Trade type</option>
                        <option value="Groups">Groups</option>
                        <option value="Points">Points</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div class="form-group label-floating is-empty">
                      <label class="control-label">Your message <span class="required-field">*</span></label>
                      <textarea class="form-control" v-model="message"></textarea>
                    </div>

                    <p v-if="getRequestResponse === 'SENT'" class="text-success">Message successfuly sent!</p>
                    <p v-if="getRequestResponse === 'ERROR'" class="text-danger">An error ocurred when sending message!</p>

                    <button
                      class="btn btn-purple btn-lg full-width"
                      :disabled="shouldSendBeDisabled"
                      @click.prevent="sendSupportMessage"
                    >
                      Send message
                      <div
                        v-if="getRequestResponse === 'SENDING'"
                        class="spinner-border spinner-border-sm text-primary ml-3"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <!-- ... end Contacts Form -->
          </div>
        </div>
      </div>

      <div class="half-height-bg bg-white"></div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: "ContactUs",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      subject: null,
      message: "",
    };
  },
  methods: {
    ...mapActions(["startSession", "sendSupportRequest", "fetchUserMessages"]),
    ...mapMutations({
      changeFeedbackMessage: "set_request_response"
    }),
    async start() {
      this.startSession();
      this.fetchUserMessages();
    },
    async sendSupportMessage() {
      if (this.shouldSendBeDisabled) return;

      const message = `${this.subject}: ${this.message}`;
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      };

      this.sendSupportRequest({ message, user });
    }
  },
  computed: {
    ...mapGetters({
      isUserAuthenticated: "isUserAuthenticated",
      userMsgs: "getUserMessages",
      getRequestResponse: "getRequestResponse",
      user: "getUser"
    }),
    shouldSendBeDisabled() {
      return !this.message || !this.email || !this.subject;
    }
  },
  watch: {
    user(newValue) {
      if (newValue.firstName) this.firstName = newValue.firstName;
      if (newValue.lastName) this.lastName = newValue.lastName;
      if (newValue.email) this.email = newValue.email;
    }
  },
  created() {
    if(this.isUserAuthenticated) {
      this.start();
    }
  },
  mounted() {
    // Load select tag when entering route
    $(function() {
      $('.selectpicker').selectpicker();
    });
  },
  beforeDestroy() {
    this.changeFeedbackMessage("");
  }
}
</script>

<style>
.back-btn {
  display: block;
  margin-bottom: 1rem;
  font-size: 1.6em;
}

.required-field {
  color: crimson;
}

.allow-overflow {
  overflow: visible;
}
</style>