<template>
  <div data-toggle="tooltip" :data-placement="position" :title="title">
    <slot></slot>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'STooltip',
  props: [
    'title',
    'position'
  ],
  computed: {
  }
}
</script>
