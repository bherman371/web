<template>
  <div>
    <label v-if="label" class="control-label">{{ label }}</label>
    <fieldset class="form-group">
      <select
        class="selectpicker form-control"
        @change="selectOption(v)"
        v-model="v"
        :data-cy="dataCy"
        ref="select"
      >
        <option :key="index" v-for="(i, index) in content" :value="i.value">{{ i.label }}</option>
      </select>
    </fieldset>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "SSelect",
  props: {
    label: String,
    input: null,
    content: Array,
    dataCy: String
  },
  model: {
    prop: "input",
    event: "alter"
  },
  data() {
    return {
      v: this.input || null
    };
  },
  methods: {
    selectOption(o) {
      this.v = o;
      this.$emit("alter", this.v);
    }
  },
  computed: {
    isRequired() {
      return this.required !== undefined;
    }
  },
  watch: {
    input(newValue) {
      if (this.v !== newValue) this.v = newValue;
    }
  },
  mounted() {
    $(this.$refs.select).selectpicker("refresh");
  }
};
</script>
