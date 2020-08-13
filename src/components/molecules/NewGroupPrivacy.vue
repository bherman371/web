<template>
    <SelectUnselectButtons :options="options" @value="storePrivacy" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SelectUnselectButtons from "@/components/atoms/SelectUnselectButtons";

export default {
  name: "NewGroupPrivacy",
  components: {
    SelectUnselectButtons
  },
  data() {
    return {
      options: [
        {
          value: 1,
          option: "Public",
          isSelected: false,
          tooltip: {
            toggle: 'tooltip',
            placement: "right",
            html: true,
            text: "<span class='privacy-tooltip'>Public groups are visible in search results and membership is open to any Swampum user</span>"
          }
        },
        {
          value: 2,
          option: "Private",
          isSelected: false,
          tooltip: {
            toggle: 'tooltip',
            placement: "right",
            html: true,
            text: "<span class='privacy-tooltip'>Private groups are visible in search results, but membership is limited to users who meet criteria set by the group's moderator(s)"
          }
        },
        {
          value: 3,
          option: "Hidden",
          isSelected: false,
          tooltip: {
            toggle: 'tooltip',
            placement: "right",
            html: true,
            text: "<span class='privacy-tooltip'>Hidden groups are not visible in search results, and membership is limited to users who are invited to join by the group's moderator(s)"
          }
        }
      ],
      option: null
    };
  },
  methods: {
    ...mapActions(["setNewGroupPrivacy"]),
    storePrivacy(e) {
      if (e) this.option = e;
      if (this.GroupPrivacy !== this.option) {
        this.setNewGroupPrivacy(parseInt(this.option));
      }
    }
  },
  computed: {
    ...mapGetters({
      groupPrivacy: "getNewGroupPrivacy"
    })
  },
  mounted() {
    if (this.groupPrivacy) {
      this.option = this.groupPrivacy;
      this.options.forEach(element => {
        if (this.option === element.value) {
          element.isSelected = true;
        }
      });
    }
  }
};
</script>

<style>
.privacy-tooltip {
  font-size: 12px;
  text-transform: initial;
}
</style>
