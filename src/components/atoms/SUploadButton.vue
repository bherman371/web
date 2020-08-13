<template>
  <div class="file-upload">
    <label for="upload" class="file-upload__label" :class="getColor">{{ label }}</label>
    <input id="upload" class="file-upload__input" type="file" name="file-upload">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SUploadButton',
  props: [
    'label',
    'color'
  ],
  computed: {
    getColor () {
      switch(this.color){
        case 'primary':
          return 'bg-primary'
        case 'secondary':
          return 'bg-secondary'
        case 'purple':
          return 'bg-purple'
        case 'blue':
          return 'bg-blue'
        case 'breez':
          return 'bg-breez'
        case 'green':
          return 'bg-green'
        case 'gray':
          return 'bg-gray'
        case 'gray-light':
          return 'bg-gray-light'
        case 'gray-lighter':
          return 'bg-lighter'
        case 'breez-light':
          return 'bg-breez-light'
        case 'yellow':
          return 'bg-yellow'
        case 'smoke':
          return 'bg-smoke'
        default:
          return ''
      }
    }
  }
}
</script>
