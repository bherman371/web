<template>
  <div class="input-group number-spinner" :class="getColor">
    <span class="input-group-btn data-dwn input-group-prepend">
      <button class="btn btn-default btn-info" data-dir="dwn"><span class="glyphicon glyphicon-minus"></span></button>
    </span>
    <input type="text" class="form-control text-center" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :min="min" :max="max">
    <span class="input-group-btn data-up input-group-append">
      <button class="btn btn-default btn-info" data-dir="up"><span class="glyphicon glyphicon-plus"></span></button>
    </span>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SQuantityInput',
  props: [
    'min',
    'max',
    'color',
    'value'
  ],
  computed: {
    getColor () {
      switch(this.color){
        case 'primary':
          return 'number-spinner--primary'
        case 'secondary':
          return 'number-spinner--secondary'
        case 'purple':
          return 'number-spinner--purple'
        case 'blue':
          return 'number-spinner--blue'
        case 'breez':
          return 'number-spinner--breez'
        case 'green':
          return 'number-spinner--green'
        case 'gray':
          return 'number-spinner--gray'
        case 'gray-light':
          return 'number-spinner--gray-light'
        case 'gray-lighter':
          return 'number-spinner--lighter'
        case 'breez-light':
          return 'number-spinner--breez-light'
        case 'yellow':
          return 'number-spinner--yellow'
        case 'smoke':
          return 'number-spinner--smoke'
        default:
          return ''
      }
    }
  }
}
</script>
