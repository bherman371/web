<template>
  <SelectUnselectButtons :options="options" @value="storeType" :withColors="true"/>
</template>

<script>
import SelectUnselectButtons from "@/components/atoms/SelectUnselectButtons";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ItemType",
  components: {
    SelectUnselectButtons
  },
  props: {
    cssClass: Boolean
  },
  data() {
    return {
      options: [
        { 
          value: 1,
          option: "Give",
          isSelected: false,
          tooltip: false
        },
        { 
          value: 2,
          option: "Receive",
          isSelected: false,
          tooltip: false
        },
        { 
          value: 3,
          option: "Lend",
          isSelected: false,
          tooltip: false
        },
        { 
          value: 4,
          option: "Borrow",
          isSelected: false,
          tooltip: false
        }
      ],
      option: null,
      isActive: false
    };
  },
  methods: {
    ...mapActions(["setNewItemType"]),
    storeType(e) {
      if (e) this.option = e;
      if (this.itemType !== this.option)
        this.setNewItemType(parseInt(this.option));
    }
  },
  computed: {
    ...mapGetters({
      itemType: "getNewItemType"
    })
  },
  mounted() {
    if (this.itemType) {
      this.option = this.itemType;
      this.options.forEach(element => {
        if (this.option === element.value) {
          element.isSelected = true;
        }
      });
    }
  }
};
</script>

<style scoped>
.radioContent {
  width: fit-content;
}
</style>