<template>
  <section class="align-right pt160 pb80 section-move-bg call-to-action-animation scrollme">
    <div class="container">
      <div class="row">
        <div class="col col-xl-10 m-auto col-lg-10 col-md-12 col-sm-12 col-12">
          <a
            href="#"
            class="btn btn-primary btn-lg"
            @click="scrollToTop"
          >Start sharing!</a>
        </div>
      </div>
    </div>
    <img class="first-img" alt="guy" src="img/guy.png" />
    <img class="second-img" alt="rocket" src="img/rocket1.png" />
    <div class="content-bg-wrap bg-section1"></div>
  </section>
</template>

<script>
export default {
  name: "MakeFriendsSectionLandingPage",
  methods: {
    scrollToTop(ev) {
      ev.preventDefault();
      window.scrollTo(0,0);
    }
  }
};
</script>

<style>
</style>