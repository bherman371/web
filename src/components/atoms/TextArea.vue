<template>
  <div class="mb-3">
    <span>
      <h5>
        <strong>{{title}}</strong>
      </h5>
    </span>
    <div>
      <span>{{subtitle}}</span>
      <textarea
        :placeholder="placeholder"
        class="form-control"
        :class="{'form-control-success': success && !error, 'form-control-danger': !success && error}"
        :required="required"
        :disabled="disabled"
        v-on:input="$emit('setter', $event.target.value)"
        v-model="content"
        ref="textArea"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextArea",
  props: {
    title: String,
    subtitle: String,
    placeholder: String,
    success: Boolean,
    error: Boolean,
    required: Boolean,
    disabled: Boolean,
    input: String,
  },
  data() {
    return {
      content: this.input || null,
    };
  },
  model: {
    prop: "input",
    event: "setter",
  },
  watch: {
    input: function (newValue) {
      if (newValue !== this.content) {
        this.content = newValue;
      }
    },
  },
};
</script>

<style scoped>
</style>
