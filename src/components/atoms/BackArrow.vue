<template>
  <svg id="arrow" @click="$emit('back')">
    <use xlink:href="/svg-icons/sprites/icons.svg#olymp-stats-arrow" />
  </svg>
</template>

<script>
export default {
  name: "BackArrow",
};
</script>
<style scoped>
#arrow {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
    width: 25px;
    height: 25px;
    cursor: pointer;
}
</style>