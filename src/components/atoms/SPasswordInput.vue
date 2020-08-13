<template>
  <fieldset>
    <div
      class="form-group label-floating"
      :class="{'label-floating': label, 'is-empty': !success && !error, 'has-success': success && !error, 'has-error': !success && error, 'has-disabled': disabled, 'with-icon': icon}"
    >
      <label v-if="label" class="control-label">{{ label }}</label>
      <input
        class="form-control"
        type="password"
        :placeholder="placeholder"
        :class="{'form-control-success': success && !error, 'form-control-danger': !success && error}"
        v-on:input="$emit('change', $event.target.value)"
        v-model="content"
        :data-cy="dataCy"
      />
      <i v-if="icon" :class="icon"></i>
      <slot></slot>
    </div>
  </fieldset>
</template>

<script>
// @ is an alias to /src

export default {
  name: "SPasswordInput",
  props: {
    label: String,
    placeholder: String,
    success: Boolean,
    error: Boolean,
    disabled: Boolean,
    icon: String,
    value: String,
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
  }
};
</script>
