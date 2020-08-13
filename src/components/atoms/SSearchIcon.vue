<template>
  <a
    href="#"
    class="nav-link"
    data-toggle="modal"
    data-target="#main-popup-search"
    @click="$emit('button')"
    data-cy="searchIcon"
  >
    <svg class="olymp-magnifying-glass-icon">
      <use xlink:href="/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon" />
    </svg>
  </a>
</template>
<script>
export default {
  name: "SSearchIcon"
};
</script>

