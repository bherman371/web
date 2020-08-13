<template>
  <div>
    <div class="main-header">
      <div class="content-bg-wrap background-img"></div>
      <div class="container">
        <div class="row">
          <div class="col col-lg-8 m-auto col-md-8 col-sm-12 col-12">
            <div class="main-header-content">
              <h1>Your account dashboard</h1>
              <p>
                Welcome to your account dashboard! Here you’ll find everything you need to change your profile
                information, settings, read notifications and requests, view your latest messages, change your pasword and much
                more! Also you can create or manage your own favourite page, have fun!
              </p>
            </div>
          </div>
        </div>
      </div>
      <img class="img-bottom" src="" alt="friends" />
    </div>
    <div class="container">
      <div class="row">
        <ProfileMenu @change="changeDashboard"/>
        <PersonalInfo v-if="dashboard === 'info'"/>
        <FormPassword v-if="dashboard === 'password'"/>
        <FormEmail v-if="dashboard === 'email'"/>

      </div>
    </div>
    <a class="back-to-top" href="#">
      <img src="/svg-icons/back-to-top.svg" alt="arrow" class="back-icon" />
    </a>
  </div>
</template>

<script>
import ProfileMenu from "@/components/organisms/ProfileMenu";
import PersonalInfo from "@/components/molecules/PersonalInfo";
import FormPassword from "@/components/molecules/FormPassword";
import FormEmail from "@/components/molecules/FormEmail";

export default {
  name: "AccountDashboard",
  components: {
    ProfileMenu,
    PersonalInfo,
    FormPassword,
    FormEmail
  },
  data() {
    return {
      dashboard: "info"
    }
  },
  methods: {
    changeDashboard(value) {
       this.dashboard = value;
    }
  }
};
</script>

<style>
.background-img {
  background-image: url('~@/assets/profilephoto.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>