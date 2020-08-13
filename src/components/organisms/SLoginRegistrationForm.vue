<template>
  <div class="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12 pl-lg-5" id="login-register-form">
    <!-- Login-Registration Form  -->
    <div class="registration-login-form">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#home" role="tab" data-cy="lpRegistrationForm" ref="register">
            Register
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#profile" role="tab" data-cy="lpLoginForm" ref="login">
            Login
          </a>
        </li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <SRegistrationForm :redirectTo="redirectTo" />
        <SLoginForm :redirectTo="redirectTo" />
      </div>
    </div>
    <!-- ... end Login-Registration Form  -->
  </div>
</template>
<script>
import SRegistrationForm from "@/components/molecules/SRegistrationForm.vue";
import SLoginForm from "@/components/molecules/SLoginForm.vue";

export default {
  name: "SLoginRegistrationForm",
  components: {
    SRegistrationForm,
    SLoginForm
  },
  props: ["redirectTo"],
};
</script>
