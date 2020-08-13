<template>
  <div class="checkbox">
    <label>
      <input
        type="checkbox"
        name="optionsCheckboxes"
        v-on:input="$emit('change', $event.target.checked)"
        :disabled="disabled"
        v-model="content"
        :data-cy="dataCy"
      />
      <span  :key="reRender" class="checkbox-material">
        <span class="check"></span>
      </span>
      <span v-html="label"></span>
    </label>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "SCheckbox",
  props: ["label", "disabled", "input", "dataCy"],
  model: {
    prop: "input",
    event: "change"
  },
  data() {
    return {
      content: this.input,
      reRender: 0
    };
  },
  methods: {
    reRenderer() {
      this.reRender += 1;
    }
  },
  watch: {
    input: function(newValue) {
      if (newValue !== this.content) {
        this.content = newValue;
      }
    }
  },
  mounted() {
    this.reRenderer();
  }
};
</script>
