<template>
  <fieldset class="form-group mb-0 pb-0">
    <span v-if="title">
      <h5>
        <strong>{{title}}</strong>
      </h5>
    </span>
    <div
      class="form-group"
      :class="[
        {
          'label-floating': label,
          'is-empty': !success && !error && !content,
          'has-success': success && !error,
          'has-error': !success && error,
          'has-disabled': disabled,
          'with-icon': icon
        },
        otherClasses
      ]"
    >
      <label v-if="label" class="control-label">{{ label }}</label>
      <input
        class="form-control"
        :type="inputType"
        :min="min"
        :placeholder="placeholder"
        :class="[{'form-control-success': success && !error, 'form-control-danger': !success && error}, getSize]"
        :required="required"
        v-on:input="$emit('change', $event.target.value)"
        v-model="content"
        :data-cy="dataCy"
        @focus="$emit('atFocus')"
        @blur="$emit('atBlur')"
        :disabled="disabled"
      />
      <button class="VuePassword__Toggle" v-if="isSpinner">
        <div class="spinner-border spinner-border-sm float-right mt-2" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </button>
      <ImgTogglePasswordInput v-if="eyeToggle" @visibility="changeVisibility" />
      <HappyFaceIcon v-if="happyFace" />
      <i v-if="icon" :class="icon"></i>
      <slot></slot>
    </div>
  </fieldset>
</template>

<script>
// @ is an alias to /src
import ImgTogglePasswordInput from "@/components/atoms/ImgTogglePasswordInput";
import HappyFaceIcon from "@/components/atoms/HappyFaceIcon";
export default {
  name: "SInput",
  props: {
    label: String,
    placeholder: String,
    success: null,
    error: null,
    disabled: Boolean,
    icon: String,
    title: String,
    required: Boolean,
    type: String,
    input: null,
    dataCy: String,
    size: String,
    min: String,
    otherClasses: String,
    eyeToggle: { type: Boolean, default: false },
    isSpinner: { type: Boolean, default: false },
    happyFace: Boolean
  },
  components: {
    ImgTogglePasswordInput,
    HappyFaceIcon
  },
  data() {
    return {
      content: this.input || null,
      inputType: this.type
    };
  },
  model: {
    prop: "input",
    event: "change"
  },
  computed: {
    getSize() {
      switch (this.size) {
        case "sm":
          return "form-control-sm";
        case "md-2":
          return "form-control-md-2";
        case "md":
          return "form-control-md";
        case "lg":
          return "form-control-lg";
        default:
          return "";
      }
    }
  },
  watch: {
    input: function(newValue) {
      if (newValue !== this.content) {
        this.content = newValue;
      }
    }
  },
  methods: {
    changeVisibility(e) {
      if (e) {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
