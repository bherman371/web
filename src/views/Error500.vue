<template>
  <div>
    <section class="page-500-content medium-padding120">
      <div class="container">
        <div class="row">
          <div class="col col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
            <img src="/img/500.png" alt="error_500" />
          </div>
          <div class="col col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
            <div class="crumina-module crumina-heading">
              <h1 class="page-500-sup-title">500</h1>
              <h2 class="h1 heading-title">Internal Server Error</h2>
              <p class="heading-text">
                If you like, you can return to our homepage, or if the problem persists, send us an email to:
                <a
                  href="#"
                >support@olympus.com</a>
              </p>
            </div>
           <router-link to="/landing-page">
            <a href="#" class="btn btn-primary btn-lg">Go to Homepage</a>
           </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Error500"
};
</script>

<style>
</style>