<template>
  <span class="invalid-feedback">
    <span class="error-box">
      {{ message }}
    </span>
  </span>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SInputError',
  props: {
    message: String
  },
  computed: {
  }
}
</script>
