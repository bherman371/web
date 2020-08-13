<template>
  <div>
    <SelectUnselectButtons :options="options" @value="storeCategory"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SelectUnselectButtons from "@/components/atoms/SelectUnselectButtons.vue";
export default {
  name: "ItemCategory",
  components: { SelectUnselectButtons },
  data() {
    return {
      options: [
        {
          value: 3,
          option: "Clothing",
          path: "/svg-icons/sprites/icons.svg#olymp-happy-face-icon",
          isSelected: false,
          tooltip: false
        },
        {
          value: 2,
          option: "Electronic",
          path: "/svg-icons/sprites/icons.svg#olymp-headphones-icon",
          isSelected: false,
          tooltip: false
        },
        {
          value: 5,
          option: "Garden",
          path: "/svg-icons/sprites/icons-weather.svg#olymp-weather-sunny-icon",
          isSelected: false,
          tooltip: false
        },
        {
          value: 4,
          option: "Hobby",
          path: "/svg-icons/sprites/icons.svg#olymp-camera-icon",
          isSelected: false,
          tooltip: false
        },
        {
          value: 1,
          option: "Household",
          path: "/svg-icons/sprites/icons.svg#olymp-home-icon",
          isSelected: false,
          tooltip: false
        },
        {
          value: 6,
          option: "Media",
          path: "/svg-icons/sprites/icons.svg#olymp-multimedia-icon",
          isSelected: false,
          tooltip: false
        },
        {
          value: 7,
          option: "Other",
          path: "/svg-icons/sprites/icons.svg#olymp-three-dots-icon",
          isSelected: false,
          tooltip: false
        }
      ],
      option: null
    };
  },
  methods: {
    ...mapActions(["setNewItemCategory"]),
    storeCategory(e) {
      if (e) this.option = e;
      if (this.itemCategory !== this.option) {
        this.setNewItemCategory(parseInt(this.option));
      }
    }
  },
  computed: {
    ...mapGetters({
      itemCategory: "getNewItemCategory"
    })
  },
  mounted() {
    if (this.itemCategory) {
      this.option = this.itemCategory;
      this.options.forEach(element => {
        if (this.option === element.value) {
          element.isSelected = true;
        }
      });
    }
  }
};
</script>