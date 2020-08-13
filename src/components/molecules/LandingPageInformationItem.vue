<template>
  <div>
    <div class="row">
      <div class="col col-4 pr-0">
        <img :src="img" alt="screen" />
      </div>
      <div class="col col-8 pt-2 pr-4">
        <h4>{{ title }}</h4>
        <p v-html="text"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPageInformationItem",
  props: {
    img: String,
    title: String,
    text: String,
  }
}
</script>

<style>

</style>