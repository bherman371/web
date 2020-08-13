<template>
  <div class="shop-product-item">
    <div class="product-thumb">
      <img :src="getItemImagePath(itemProfile)" alt="product" />
    </div>
    <div class="product-content">
      <div class="block-title">
        <a href="#" class="product-category">{{itemProfile.Title}}</a>
        <a href="#" class="h5 title">{{itemProfile.Description}}</a>
      </div>
      <div class="block-price">
        <div class="product-price" v-html="getItemValue(itemObj)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemHelper from "@/mixins/ItemHelper";
import Global from '@/constants/Global.js'

export default {
  name: "ItemBlock",
  props: ["item"],
  mixins: [ItemHelper],
  data() {
    return {
      itemObj: {
        id: this.item.Item_id || null,
        condition: this.item.Condition || null,
        cash: this.item.Cash || 0,
        category: this.item.Category || null,
        description: this.item.Description || null,
        points: this.item.Points || 0,
        title: this.item.Title || null,
        type: this.item.Type || null,
        showDetails: this.item._showDetails || false
      }
    };
  },
  computed: {
    img() {
      if (this.itemObj.id) {
        return this.getItemImagePath(this.itemObj);
      } else {
        return `${Global.getServerDomain()}/images/item/12.jpg`;
      }
    }
  }
};
</script>

<style>
</style>
