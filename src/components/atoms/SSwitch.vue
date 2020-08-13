<template>
  <div class="togglebutton">
    <label>
      <input type="checkbox" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" >
    </label>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SSwitch',
  props: [
    'value'
  ],
  computed: {
  }
}
</script>
