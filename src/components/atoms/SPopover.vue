<template>
  <div data-container="body" data-toggle="popover" :data-placement="position" :data-content="content" data-original-title="" :title="title">
    <slot></slot>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SPopover',
  props: [
    'title',
    'position',
    'content'
  ],
  computed: {
  }
}
</script>
