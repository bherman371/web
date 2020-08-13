<template>
  <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
    <!-- Friend Item -->

    <div
      class="friend-item friend-groups create-group"
      data-mh="friend-groups-item"
      style="height: 321px;"
    >
      <div class="content">
        <a href="#" class="btn btn-control bg-blue" data-toggle="modal" data-target="#create-group">
          <svg class="olymp-plus-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-plus-icon" />
          </svg>
        </a>

        <div class="author-content">
          <a href="#" class="h5 author-name">Create a new group</a>
        </div>
      </div>
    </div>
    <ModalCreateGroup/>
  </div>
</template>

<script>
import ModalCreateGroup from "@/components/atoms/ModalCreateGroup";
export default {
  name: "CardCreateGroup",
  components: {
    ModalCreateGroup
  }
};
</script>

<style>
</style>