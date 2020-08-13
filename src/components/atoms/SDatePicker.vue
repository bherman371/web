<template>
  <div>
    <label class="control-label" v-if="label">{{ label }}</label>
    <div class="form-group date-time-picker">
      <input
        type="date"
        name="datetimepicker"
        v-on:input="$emit('change', $event.target.value)"
        v-model="content"
        :data-cy="dataCy"
      />
      <span class="input-group-addon">
        <svg class="olymp-month-calendar-icon icon"><use xlink:href="/svg-icons/sprites/icons.svg#olymp-month-calendar-icon"></use></svg>
      </span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "SDatePicker",
  props: {
    label: String,
    value: Date,
    input: null,
    dataCy: String
  },
  data() {
    return {
      content: this.input || null
    };
  },
  model: {
    prop: "input",
    event: "change"
  },

  watch: {
    input: function(newValue) {
      if (newValue !== this.content) {
        this.content = newValue;
      }
    }
  },
  computed: {}
};
</script>
