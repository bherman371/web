<template>
  <div>
    <SelectUnselectButtons :options="options" @value="storeCondition" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SelectUnselectButtons from "@/components/atoms/SelectUnselectButtons";

export default {
  name: "ItemCondition",
  components: {
    SelectUnselectButtons
  },
  data() {
    return {
      options: [
        {
          value: 1,
          option: "New",
          isSelected: false,
          tooltip: false
        },
        {
          value: 2,
          option: "Like New",
          isSelected: false,
          tooltip: false
        },
        {
          value: 3,
          option: "Used",
          isSelected: false,
          tooltip: false
        },
        {
          value: 4,
          option: "Worn",
          isSelected: false,
          tooltip: false
        }
      ],
      option: null
    };
  },
  methods: {
    ...mapActions(["setNewItemCondition"]),
    storeCondition(e) {
      if (e) this.option = e;
      if (this.itemCondition !== this.option)
        this.setNewItemCondition(parseInt(this.option));
    }
  },
  computed: {
    ...mapGetters({
      itemCondition: "getNewItemCondition"
    })
  },
  mounted() {
    if (this.itemCondition) {
      this.option = this.itemCondition;
      this.options.forEach(element => {
        if (this.option === element.value) {
          element.isSelected = true;
        }
      });
    }
  }
};
</script>
