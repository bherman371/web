<template>
  <div class="container">
    <div class="row mt-4 mb-3">

      <div class="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12 pt-5 pb-5">
        <SLogo class="mb-4" />
        <h1 class="mb-3">Register or login to complete this action</h1>
        <p class="lead">
          You will be redirected to the page you were trying to access
          after you register/login.
        </p>
      </div>

      <SLoginRegistrationForm :redirectTo="redirectTo" />

    </div>
    <SRestorePasswordModal />
    <SRestoreUsername />
  </div>
</template>

<script>
import SLogo from "@/components/atoms/SLogo.vue";
import SLoginRegistrationForm from "@/components/organisms/SLoginRegistrationForm.vue";
import SRestorePasswordModal from "@/components/organisms/SRestorePasswordModal.vue";
import SRestoreUsername from "@/components/molecules/SRestoreUsername";

export default {
  name: "LoginRedirect",
  components: {
    SLogo,
    SLoginRegistrationForm,
    SRestorePasswordModal,
    SRestoreUsername,
  },
  data() {
    return {
      redirectTo: null,
    };
  },
  created() {
    if (this.$route.query.redirect)
      this.redirectTo = this.$route.query.redirect;
  }
}
</script>

<style>

</style>