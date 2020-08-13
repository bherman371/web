<template>
  <div>
    <Modal
      :buttonName="nameButton"
      id="new-item"
      :title="titleHeader[step]"
      @button="next"
      :disabled="isDisabled"
      v-if="isShow"
      ref="modal"
      :isBackButton="true"
      backButtonName="Back"
      @back="returnStep"
      :backButtonVisible="isBackVisible"
      :canSkip="isSkippable"
      @skip="skipStep"
    >
      <ItemPostImage v-if="stepper[step] === 'image'" />
      <ItemDescription v-if="stepper[step] === 'description'" ref="description" />
      <ItemType v-if="stepper[step] === 'type'" ref="type" :cssClass="true" />
      <ItemPaymentType v-if="stepper[step] === 'payment'" ref="payment" :cssClass="true" />
      <ItemCategory v-if="stepper[step] === 'category'" ref="category" :cssClass="true" />
      <ItemCondition v-if="stepper[step] === 'condition'" ref="condition" :cssClass="true" />
      <span v-if="alertMsg" v-html="`<p style='color:red'>${alertMsg}</p>`"></span>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/atoms/Modal";
import ItemDescription from "@/components/molecules/ItemDescription";
import ItemPostImage from "@/components/molecules/ItemPostImage";
import ItemType from "@/components/molecules/ItemType";
import ItemPaymentType from "@/components/molecules/ItemPaymentType";
import ItemCategory from "@/components/molecules/ItemCategory";
import ItemCondition from "@/components/molecules/ItemCondition";
import { mapGetters } from "vuex";

export default {
  name: "NewItem",
  components: {
    Modal,
    ItemPostImage,
    ItemDescription,
    ItemType,
    ItemPaymentType,
    ItemCategory,
    ItemCondition
  },
  data() {
    return {
      nameButton: "Next",
      titleHeader: [
        "Add an image for your new post",
        "Give your post a title and describe it in more detail",
        "Choose your trade type",
        "Payment Type",
        "Item Category",
        "Item Condition"
      ],
      stepper: [
        "image",
        "description",
        "type",
        "payment",
        "category",
        "condition"
      ],
      step: 0,
      isShow: true,
      alertMsg: null
    };
  },
  methods: {
    next() {
      this.alertMsg = null;
      if (this.step === 1) {
        this.$refs.description.storeDescription();
        if (!this.itemTitle || !this.itemDescription) {
          this.alertMsg = "Please, complete the form to proceed to the next step.";
        }
      }
      if (this.step === 2) this.$refs.type.storeType();
      if (this.step === 3) {
        this.$refs.payment.storePaymentType();
        const result = this.$refs.payment.storePaymentValues();
        if (result === "Empty field") {
          this.alertMsg = "Please, complete the form to proceed to the next step.";
        } else if (result === "Negative values") {
          this.alertMsg = "Please, check the form to proceed to the next step.";
        }
      }
      if (this.step === 4) this.$refs.category.storeCategory();
      if (this.step === 5) this.$refs.condition.storeCondition();
      if (this.canGoNext && this.step <= 6) this.step++;
      if (this.step === 6) this.$router.push("item-review");
    },
    returnStep() {
      if (this.step > 0) {
        this.step--;
      }
    },
    skipStep() {
      this.step++;
    }
  },
  computed: {
    ...mapGetters({
      itemPostFeaturedImage: "getNewItemImage",
      itemTitle: "getNewItemTitle",
      itemDescription: "getNewItemDescription",
      itemType: "getNewItemType",
      itemPaymentType: "getNewItemPaymentType",
      itemPaymentCash: "getNewItemPaymentCash",
      itemPaymentPoints: "getNewItemPaymentPoints",
      itemCategory: "getNewItemCategory",
      itemCondition: "getNewItemCondition"
    }),
    canGoNext() {
      switch (this.stepper[this.step]) {
        case "image":
          if (this.itemPostFeaturedImage) {
            return true;
          }
          return false;
        case "description":
          if (this.itemTitle && this.itemDescription) {
            return true;
          }
          return false;
        case "type":
          if (this.itemType) {
            return true;
          }
          return false;
        case "payment":
          if (this.itemPaymentType.length > 0 && !this.alertMsg) {
            return true;
          }
          return false;
        case "category":
          if (this.itemCategory) {
            return true;
          }
          return false;
        case "condition":
          if (this.itemCondition && this.itemCondition != 0) {
            this.$refs.modal.closeModal();
            return true;
          }
          return false;
        default:
          return false;
      }
    },
    isBackVisible() {
      if (this.step === 0) return false;
      return true;
    },
    isSkippable() {
      if (
        this.step === 0 &&
        (!this.itemPostFeaturedImage || 
          this.itemPostFeaturedImage.image === null)
      ) {
        return true;
      }
      return false;
    },
    isDisabled() {
      if (this.step === 0 && (!this.itemPostFeaturedImage || this.itemPostFeaturedImage.image === null)) {
        return true;
      } else if (this.step === 2 && !this.itemType) {
        return true;
      } else if (this.step === 3 && this.itemPaymentType.length === 0) {
        return true;
      } else if (this.step === 4 && !this.itemCategory) {
        return true;
      } else if (this.step === 5 && !this.itemCondition) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    itemPaymentType(value) {
      if (value.includes("free")) {
        this.alertMsg = null;
      }
    }
  }
};
</script>
