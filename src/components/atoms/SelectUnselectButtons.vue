<template>
  <div>
    <div
      v-for="(item, index) in options"
      :key="item.value"
      class="text-center m-2 select-unselect-tooltip"
      :class="[{
        'is-selected': item.isSelected,
        'img-button': !item.isSelected,
        'is-selected-gradient': withColors && item.isSelected,
        'img-button-gradient': withColors && !item.isSelected,
        'btn-lighter': item.type && item.type !== 'multiple' && multipleSelected
        }]"
      @click="selectButton(index)"
      :data-toggle="item.tooltip.toggle"
      :data-placement="item.tooltip.placement"
      :data-html="item.tooltip.html"
      :title="item.tooltip.text"
    >
      <span
        class="d-flex align-items-center justify-content-center"
        :class="[{'without-icon': !item.path}]"
        >
        <svg class="olymp-close-icon m-2" v-if="item.path">
          <use :xlink:href="item.path" />
        </svg>
        <div class="m-2">{{item.option}}</div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectUnselectButtons",
  props: ["options", "savedOption", "withColors"],
  data(){
    return{
      option: null,
      multipleSelected: false
    };
  },
  methods: {
    selectButton(index) {
      if (this.options[index].type && this.options[index].type === "multiple") {
        this.validateMultipleChoice(index);
      } else {
        this.multipleSelected = false;
        this.option = this.options[index].value;
        this.$emit("value", this.option);
        if (this.options.some(item => item.isSelected === true)) {
          this.options.forEach(element => {
            if (element.isSelected === true) {
              element.isSelected = false;
            }
          });
        }
        this.options[index].isSelected = true;
      }
    },
    validateMultipleChoice(index) {
      if (this.options[index].isSelected === true) {
        const i = this.option.indexOf(this.options[index].value);
        this.option.splice(i, 1);
        this.options[index].isSelected = false;
        if (this.option.length === 0) {
          this.multipleSelected = false;
        }
      } else {
        this.multipleSelected = true;
        if (this.options.some(item => item.isSelected === true && (item.type && item.type !== "multiple"))) {
          this.options.forEach(element => {
            if (element.isSelected === true && (element.type && element.type !== "multiple")) {
              element.isSelected = false;
            }
          });
          this.option = [];
        }
        if (!Array.isArray(this.option)) {
          this.option = [];
        }
        this.option.push(this.options[index].value);
        this.options[index].isSelected = true;
      }
      this.$emit("value", this.option);
    }
  },
  watch: {
    savedOption(newValue) {
      if(newValue) {
        this.option = this.savedOption;
      }
    }
  },
  mounted() {
    $('.select-unselect-tooltip').tooltip();
  }
};
</script>

<style lang="scss" scoped>
$colors: #6fcf97, #f1698f,  #D394EB, #70aaf8;
@for $i from 1 through length($colors) {
  .img-button-gradient:nth-child(#{length($colors)}n + #{$i}) {
    border: 2px solid lighten(nth($colors, $i), 0);
    color: lighten(nth($colors, $i), 0);
    cursor: pointer;
    font-weight: bold;
    border-radius: 25px;
    &:hover {
      background-color: #d8d2d275;
    }
  }
}
@for $i from 1 through length($colors) {
  .is-selected-gradient:nth-child(#{length($colors)}n + #{$i}) {
    border: 2px solid lighten(nth($colors, $i), 0);
    color: white;
    cursor: pointer;
    font-weight: bold;
    border-radius: 25px;
    background-color: lighten(nth($colors, $i), 0);
    svg {
      fill: white;
    }
  }
}

.img-button {
  border: 2px solid black;
  cursor: pointer;
  font-weight: bold;
  border-radius: 25px;
  color: black;
  &:hover {
    background-color: #d8d2d275;
  }
}
.is-selected {
  background-color: #221f1f;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 25px;
  border: 2px solid black;
  svg {
    fill: white;
  }
}
.without-icon {
  height: 42px;
}
.btn-lighter {
  border-color: darkgray;
  color: darkgray;
}
</style>