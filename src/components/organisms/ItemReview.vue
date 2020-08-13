<template>
  <div>
    <HeaderItemReview />
    <ItemReviewForm @button="saveItem">
      <div class="container">
        <div class="row">
          <div class="container">
            <div class="row">
              <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h2 class="presentation-margin">Photo</h2>
                <div class="ui-block d-flex justify-content-center">
                  <div class="top-header">
                    <ItemPostImage ref="image" />
                  </div>
                </div>
                <div>
                  <h2 class>Description</h2>
                  <ItemDescription ref="description" />
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <div>
                    <h2>Item Type</h2>
                    <div class>
                      <ItemType ref="type" />
                    </div>
                  </div>
                  <div>
                    <h2>Payment Type</h2>
                    <ItemPaymentType ref="payment" />
                  </div>
                  <div>
                    <h2>Item Category</h2>
                    <ItemCategory ref="category" />
                  </div>
                  <div>
                    <h2>Item Condition</h2>
                    <ItemCondition ref="condition" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ItemReviewForm>
    <Modal id="upload" buttonName="OK" @button="closeModal" ref="modal" title="Item Post">
      <footer v-if="uploaded" class="h5">{{postItemResponse.result}}</footer>
      <div v-else class="spinner-border text-primary" role="status"></div>
    </Modal>
  </div>
</template>

<script>
import HeaderItemReview from "@/components/molecules/HeaderItemReview";
import ItemReviewForm from "@/components/organisms/ItemReviewForm";
import ItemPostImage from "@/components/molecules/ItemPostImage";
import ItemType from "@/components/molecules/ItemType";
import ItemDescription from "@/components/molecules/ItemDescription";
import ItemCategory from "@/components/molecules/ItemCategory";
import ItemPaymentType from "@/components/molecules/ItemPaymentType";
import ItemCondition from "@/components/molecules/ItemCondition";
import Modal from "@/components/atoms/Modal";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ItemReview",
  components: {
    HeaderItemReview,
    ItemReviewForm,
    ItemPostImage,
    ItemType,
    ItemDescription,
    ItemCategory,
    ItemPaymentType,
    ItemCondition,
    Modal
  },
  data() {
    return {
      item_profile: null,
      uploaded: false
    };
  },
  computed: {
    ...mapGetters({
      itemPostFeaturedImage: "getNewItemImage",
      itemTitle: "getNewItemTitle",
      itemDescription: "getNewItemDescription",
      itemType: "getNewItemType",
      itemPaymentCash: "getNewItemPaymentCash",
      itemPaymentPoints: "getNewItemPaymentPoints",
      itemCategory: "getNewItemCategory",
      itemCondition: "getNewItemCondition",
      newItem: "getNewItem",
      postItemResponse: "getPostItemResponse"
    })
  },
  methods: {
    ...mapActions(["postItem", "resetNewItem"]),
    async saveItem() {
      this.storeUpdates();
      await this.postItem(this.newItem);
      if (Object.keys(this.postItemResponse).length > 0) {
        this.uploaded = true;
      }
      $("#upload").modal("show");
      if (this.postItemResponse && this.postItemResponse.result === "Item created!") {
        this.resetNewItem();
      }
    },
    async storeUpdates() {
      this.$refs.description.storeDescription();
      this.$refs.type.storeType();
      this.$refs.payment.storePaymentType();
      this.$refs.payment.storePaymentValues();
      this.$refs.category.storeCategory();
      this.$refs.condition.storeCondition();
    },
    closeModal() {
      this.$router.push("news-feed/");
      this.$refs.modal.closeModal();
    },
    checkUpdate() {}
  },
  created() {
    this.item_profile = this.newItem;
  }
};
</script>

<style>
</style>