<template>
  <div class="container">
    <div class="row">
      <div class="order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
        <div class="ui-block">
          <div class="ui-block-title">
            <h6 class="title">Published items</h6>
          </div>

          <!-- Notification List Frien Requests -->

          <ul class="notification-list friend-requests">
            <PostAreaItem :items="userInventory" :requests="itemRequestsReceived" />
          </ul>

          <!-- ... end Notification List Frien Requests -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostAreaItem from "@/components/molecules/PostAreaItem";
import ItemHelperVue from "../../mixins/ItemHelper.vue";
export default {
  name: "PublishedItems",
  components: {
    PostAreaItem
  },
  mixins: [ItemHelperVue],

  created() {
    this.fetchUserInventory(localStorage.getItem("user_id"));
    this.fetchItemRequestReceived();
  }
};
</script>

<style>
</style>