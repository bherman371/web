<template>
  <div class="mb-4 text-left mx-auto">
    <span>
      <h5>
        <strong>{{title}}</strong>
      </h5>
    </span>
    <div v-for="(item, itemIndex) in items" v-bind:key="itemIndex" class="rowOptions">
      <svg v-if="item.path" style="width: 25px; height: 25px">
        <use :xlink:href="item.path"/>
      </svg>
      <input
        type="radio"
        v-model="content"
        v-on:input="$emit('change', $event.target.value)"
        :value="item.value"
      />
      <span>{{ item.option }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "SRadio",
  props: ["title", "items", "input"],
  model: {
    prop: "input",
    event: "change"
  },
  data() {
    return {
      content: this.input
    };
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
<style lang="scss" scoped>
.rowOptions {
  margin-right: 5px;
  margin-top: 2px;
  vertical-align: middle;
}
.rowOptions input {
  width: 5%;
  margin: 0 3px 0 0;
  display: inline;
  vertical-align: middle;
}
.rowOptions input[type=radio]{
  min-width: 15px;
}
.rowOptions span {
  font-size: 1.1em;
  color: black;
  vertical-align: middle;
}
.rowOptions svg {
  margin-right: 5px;
  margin-top: 5px;
  vertical-align: middle;
}
</style>