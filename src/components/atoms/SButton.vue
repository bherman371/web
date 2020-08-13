<template>
  <button
    class="btn"
    type="button"
    :class="[getSize, getColor, getOutline]"
    v-html="text"
    :disabled="disabled"
    @click="$emit('button')"
    :data-cy="dataCy"
  >
    <svg style="height: 25px; width: 25px">
      <use xlink:href="/svg-icons/sprites/icons.svg#olymp-home-icon" />
    </svg>
  </button>
</template>

<script>
// @ is an alias to /src

export default {
  name: "SButton",
  props: ["text", "size", "color", "disabled", "dataCy", "outline"],
  computed: {
    getSize() {
      switch (this.size) {
        case "sm":
          return "btn-sm";
        case "md-2":
          return "btn-md-2";
        case "md":
          return "btn-md";
        case "lg":
          return "btn-lg";
        default:
          return "";
      }
    },
    getColor() {
      switch (this.color) {
        case "primary":
          return "btn-primary";
        case "secondary":
          return "btn-secondary";
        case "purple":
          return "btn-purple";
        case "blue":
          return "btn-blue";
        case "breez":
          return "btn-breez";
        case "green":
          return "btn-green";
        case "gray":
          return "btn-gray";
        case "gray-light":
          return "btn-gray-light";
        case "gray-lighter":
          return "btn-lighter";
        case "breez-light":
          return "btn-breez-light";
        case "yellow":
          return "btn-yellow";
        case "smoke":
          return "btn-smoke";
        default:
          return "";
      }
    },
    getOutline() {
      switch (this.outline) {
        case "primary":
          return "btn-outline-primary";
        case "secondary":
          return "btn-outline-secondary";
        case "success":
          return "btn-outline-success";
        case "danger":
          return "btn-outline-danger";
        case "warning":
          return "btn-outline-warning";
        case "info":
          return "btn-outline-info";
        case "light":
          return "btn-outline-light";
        case "dark":
          return "btn-outline-dark";
        default:
          return "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
