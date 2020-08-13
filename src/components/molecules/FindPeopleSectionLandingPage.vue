<template>
  <section class="medium-padding120">
    <div class="container">
      <div class="row">
        <div class="col col-xl-3 col-lg-3 m-auto col-md-12 col-sm-12 col-12">
          <div class="crumina-module crumina-heading">
            <h2 class="heading-title">
              Share <br class="mobile-break">
              something <br class="mobile-break">
              <span class="c-primary">real</span>
            </h2>
            <p class="heading-text">
              We use a simple point system to allow users to exchange items of value.
              You can either trade stuff and get points or just use cash.
            </p>
          </div>
        </div>

        <div class="row col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
          <LandingPageInformationItem
            title="Save money"
            text="Find lots of free and inexpensive&nbsp;things"
            img="img/landing-page/circle-house.png"
            class="col-xs-12 col-sm-6 col-lg-6 mb-4"
          />
          <LandingPageInformationItem
            title="Share things"
            text="Lend and borrow with your friends and&nbsp;neighbors"
            img="img/landing-page/circle-crowd.png"
            class="col-xs-12 col-sm-6 col-lg-6 mb-4"
          />
          <LandingPageInformationItem
            title="Help the environment"
            text="Reuse instead of buying&nbsp;new"
            img="img/landing-page/circle-tree.png"
            class="col-xs-12 col-sm-6 col-lg-6"
          />
          <LandingPageInformationItem
            title="Simplify your life"
            text="Declutter and get rid of all the things you no longer&nbsp;need"
            img="img/landing-page/circle-clothes.png"
            class="col-xs-12 col-sm-6 col-lg-6"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LandingPageInformationItem from "@/components/molecules/LandingPageInformationItem.vue";

export default {
  name: "FindPeopleSectionLandingPage",
  components: {
    LandingPageInformationItem
  }
};
</script>

<style scoped>
@media screen and (max-width: 1023px)  {
  .mobile-break { display: none; }
}
</style>