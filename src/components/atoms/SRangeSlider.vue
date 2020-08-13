<template>
  <div class="range-slider" :class="getColor">
    <input type="text" class="range-slider-js" name="example_name" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SRangeSlider',
  props: [
    'color',
    'value'
  ],
  computed: {
    getColor () {
      switch(this.color){
        case 'primary':
          return 'range-slider--primary'
        case 'secondary':
          return 'range-slider--secondary'
        case 'purple':
          return 'range-slider--purple'
        case 'blue':
          return 'range-slider--blue'
        case 'breez':
          return 'range-slider--breez'
        case 'green':
          return 'range-slider--green'
        case 'gray':
          return 'range-slider--gray'
        case 'gray-light':
          return 'range-slider--gray-light'
        case 'gray-lighter':
          return 'range-slider--lighter'
        case 'breez-light':
          return 'range-slider--breez-light'
        case 'yellow':
          return 'range-slider--yellow'
        case 'smoke':
          return 'range-slider--smoke'
        default:
          return ''
      }
    }
  }
}
</script>
