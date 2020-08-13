<template>
  <section class="medium-padding120 bg-section3 background-cover planer-animation">
    <div class="container">
      <div class="row mb60">
        <div class="col col-xl-5 col-lg-5 m-auto col-md-12 col-sm-12 col-12">
          <div class="crumina-module crumina-heading align-center">
            <h2 class="h1 heading-title">
              Here are some things you'll find inside
            </h2>
          </div>
        </div>
      </div>

      <carousel
        :navigationEnabled="true"
        :perPageCustom="[[480, 2], [768, 3], [1200, 4]]"
        paginationActiveColor="#63bab9"
        paginationColor="#b2ebd1"
        :paginationSize="16"
        :speed="420"
        class="mb-5"
      >
        <slide>
          <LandingPageProductItem
            name="Books"
            img="img/landing-page/product-books.jpg"
          />
        </slide>
        <slide>
          <LandingPageProductItem
            name="Clothing"
            img="img/landing-page/product-clothing.jpg"
          />
        </slide>
        <slide>
          <LandingPageProductItem
            name="Electronics"
            img="img/landing-page/product-electronics.jpg"
          />
        </slide>
        <slide>
          <LandingPageProductItem
            name="Household"
            img="img/landing-page/product-kitchen.jpg"
          />
        </slide>
        <slide>
          <LandingPageProductItem
            name="Music"
            img="img/landing-page/product-cd.jpg"
          />
        </slide>
        <slide>
          <LandingPageProductItem
            name="Others"
            img="img/landing-page/product-others.png"
          />
        </slide>
      </carousel>

    </div>

    <img src="img/planer.png" alt="planer" class="planer" />
  </section>
</template>

<script>
import LandingPageProductItem from "@/components/molecules/LandingPageProductItem.vue"
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: "ComunityReviewsSectionLandingPage",
  components: {
    LandingPageProductItem,
    Carousel,
    Slide
  }
};
</script>

<style>
</style>