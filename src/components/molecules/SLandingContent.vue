<template>
  <div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 py-5 py-md-0 pb-md-5">
    <div class="landing-content pb-md-5 mb-md-5">
      <h1 class="mb-3">Give&nbsp;stuff, get&nbsp;stuff, feel&nbsp;good!</h1>
      <p class="lead-banner">
        Swampum<sup>®</sup> is a unique online community where you can take control of the stuff in your life
        and share with those you care about.  Whether you want to borrow a book from someone in
        your neighborhood, lend a tool to a friend, or give something away instead of discarding it,
        Swampum<sup>®</sup> makes&nbsp;it&nbsp;easy.
      </p>
      <SSearchLandingPage />
    </div>
  </div>
</template>
<script>
import SSearchLandingPage from '@/components/organisms/SSearchLandingPage.vue'

export default {
  name: 'SLandingContent',
  components: {
    SSearchLandingPage
  }
}
</script>

<style lang="scss" scoped>
.lead-banner {
  font-size: 1.3em;
}
</style>
