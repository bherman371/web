<template>
  <div class="w-100 px-1">

    <div class="card product-card">
      <div class="product-thumb text-center h-100">
        <img :src="img" />
      </div>
      <h3 class="text-center">{{ name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPageProductItem",
  props: {
    name: String,
    img: String,
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  width: fit-content;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  padding: 1.4em;
  border: rgba($color: #515365, $alpha: 0.2) solid 1px;
}

.product-thumb {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;

  border-radius: 4px;
  background-color: #ffffff;

  padding: 6px;

  img {
    border-radius: 4px;
  }
}
</style>