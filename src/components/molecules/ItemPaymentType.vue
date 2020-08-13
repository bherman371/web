<template>
  <div>
    <SelectUnselectButtons :options="options" @value="storePaymentType" :savedOption="saved" />
    <div class="row px-2 mt-4">
      <div
        v-if="acceptPoints"
        class="col"
      >
        <SInput
          label="Points"
          v-model="payload.points"
          type="number"
          min="0"
        />
      </div>
      <div
        v-if="acceptCash"
        class="col"
      >
        <SInput
          label="Cash"
          v-model="payload.cash"
          type="number"
          min="0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectUnselectButtons from "@/components/atoms/SelectUnselectButtons";
import SInput from "@/components/atoms/SInput";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ItemPaymentType",
  components: {
    SelectUnselectButtons,
    SInput
  },
  data() {
    return {
      options: [
        {
          option: "Free",
          value: "free",
          isSelected: false,
          type: "single",
          tooltip: false
        },
        {
          option: "Points",
          value: "points",
          isSelected: false,
          type: "multiple",
          tooltip: {
            toggle: "tooltip",
            placement: "right",
            html: "true",
            text: "<span class='payment-tooltip'>You can also select the cash option</span>"
          }
        },
        {
          option: "Cash",
          value: "money",
          isSelected: false,
          type: "multiple",
          tooltip: {
            toggle: "tooltip",
            placement: "right",
            html: "true",
            text: "<span class='payment-tooltip'>You can also select the points option</span>"
          }
        }
      ],
      option: null,
      payload: {
        points: 0,
        cash: 0
      }
    };
  },
  computed: {
    ...mapGetters({
      itemPaymentType: "getNewItemPaymentType",
      itemPaymentPoints: "getNewItemPaymentPoints",
      itemPaymentCash: "getNewItemPaymentCash"
    }),
    acceptPoints() {
      if (this.option && this.option.includes('points')) {
        return true;
      }
      return false;
    },
    acceptCash() {
      if (this.option && this.option.includes('money')) {
        return true;
      }
      return false;
    },
    saved() {
      if(this.option) {
        return this.option;
      }
      return null;
    }
  },
  methods: {
    ...mapActions(["setNewItemPaymentType", "setNewItemPaymentValues"]),
    storePaymentType(e) {
      if (e) this.option = e;
      if (this.itemPaymentType !== this.option) {
        this.setNewItemPaymentType(this.option);
      }
    },
    storePaymentValues() {
      if (!this.acceptPoints) this.payload.points = 0;
      if (!this.acceptCash) this.payload.cash = 0;
      if ((this.acceptPoints && !this.payload.points) ||
        (this.acceptCash && !this.payload.cash)) {
          return "Empty field";
      }
      if ((this.acceptPoints && this.payload.points < 0) ||
        (this.acceptCash && this.payload.cash < 0)) {
          return "Negative values";
      }
      if (
        this.itemPaymentPoints !== this.payload.points ||
        this.itemPaymentCash !== this.payload.cash
      ) {
        this.setNewItemPaymentValues({ input: this.payload });
      }
    }
  },
  mounted() {
    if (this.itemPaymentType) {
      this.option = this.itemPaymentType;
      this.options.forEach(element => {
        if (this.option.includes(element.value)) {
          element.isSelected = true;
        }
      });
      if (this.itemPaymentPoints) {
        this.payload.points = this.itemPaymentPoints;
      }
      if (this.itemPaymentCash) {
        this.payload.cash = this.itemPaymentCash;
      }
    }
  }
};
</script>

<style>
.payment-tooltip {
  font-size: 12px;
  text-transform: initial;
}
</style>